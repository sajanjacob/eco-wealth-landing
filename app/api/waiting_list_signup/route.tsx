import { NextRequest, NextResponse } from "next/server";
import { gen } from "n-digit-token";

import { createClient } from "@supabase/supabase-js";
import { BASE_URL } from "@/src/presentation/utils/constants";

import {
  validateName,
  validateEmail,
  validateReferralText,
  formatName,
} from "@/src/presentation/utils/inputValidation";
import { validateApiKey } from "@/src/middleware/authMiddleware";

import sgMail from "@sendgrid/mail";
import { sendRegistrationEvent } from "@/src/presentation/utils/metaPixel";
import { createContact } from "@/src/presentation/utils/adminClient";

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
if (!SENDGRID_API_KEY) {
  throw new Error("SENDGRID_API_KEY is not configured");
}
sgMail.setApiKey(SENDGRID_API_KEY);

export async function POST(req: NextRequest) {
  // Validate API key
  const authError = validateApiKey(req);
  if (authError) return authError;

  const SUPABASE_URL = process.env.supabase_public_url;
  const SUPABASE_SERVICE_ROLE_KEY = process.env.supabase_service_role_key;
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json(
      { message: "Supabase server configuration error" },
      { status: 500 },
    );
  }

  try {
    const {
      name,
      email,
      phone,
      referralSource,
      personalReferrer,
      businessReferral,
    } = await req.json();

    // Server-side validation
    if (!validateName(name)) {
      return NextResponse.json(
        { message: "Invalid name format" },
        { status: 400 },
      );
    }

    if (!validateEmail(email)) {
      return NextResponse.json(
        { message: "Invalid email format" },
        { status: 400 },
      );
    }

    if (personalReferrer && !validateReferralText(personalReferrer)) {
      return NextResponse.json(
        { message: "Invalid referrer information" },
        { status: 400 },
      );
    }

    if (businessReferral && !validateReferralText(businessReferral)) {
      return NextResponse.json(
        { message: "Invalid business referral information" },
        { status: 400 },
      );
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const token: string = gen(333);

    // Check if email already exists
    const { data: existingUser } = await supabase
      .from("waiting_list_subscribers")
      .select("email")
      .eq("email", email)
      .single();

    if (existingUser) {
      return NextResponse.json(
        { message: "This email is already registered" },
        { status: 409 },
      );
    }

    const waitingListData = {
      name: formatName(name),
      email,
      phone,
      referrer_details: {
        referral_source: referralSource,
        referrer: personalReferrer || businessReferral || "",
      },
    };

    const { data, error } = await supabase
      .from("waiting_list_subscribers")
      .insert([waitingListData])
      .select();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { message: "Failed to register user" },
        { status: 500 },
      );
    }

    // Send Meta Pixel conversion event
    const nameParts = formatName(name).split(" ");
    const firstName = nameParts[0];
    const lastName =
      nameParts.length > 1 ? nameParts[nameParts.length - 1] : "";

    const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0] || "";
    const userAgent = req.headers.get("user-agent") || "";

    await sendRegistrationEvent({
      email,
      phone,
      firstName,
      lastName,
      clientIp,
      userAgent,
    });

    console.log("data >>> ", data);
    const { error: verificationTokenError } = await supabase
      .from("wl_signup_validation_tokens")
      .insert([
        {
          token,
          wl_user_id: data[0].id,
        },
      ])
      .select();

    if (verificationTokenError) {
      console.error("Token creation error:", verificationTokenError);
      return NextResponse.json(
        { message: "Failed to create verification token" },
        { status: 500 },
      );
    }

    // Send verification email
    const msg = {
      to: email,
      from: { email: "info@ecowealth.app", name: "Eco Wealth Notifications" },
      subject: "Verify your email to join Eco Wealth's waiting list!",
      html: `<p>Please verify your email now by clicking the button below:</p>
                  <a href="${BASE_URL}/verify?token=${token}" style="display: inline-block; background-color: #40821A; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 16px 0;">Verify Email</a>
                  <p>Or copy this link to your browser: ${BASE_URL}/verify?token=${token}</p>`,
    };

    await sgMail.send(msg);

    // Create contact in admin app
    try {
      await createContact({
        name: formatName(name),
        email,
        phone,
        platform_source: "Main landing page",
        campaign_source: "Waiting list signup",
      });
    } catch (error) {
      console.error("Failed to create admin contact:", error);
      // Don't fail the registration if admin contact creation fails
    }

    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
