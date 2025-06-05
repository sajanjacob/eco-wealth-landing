import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error("Missing Supabase environment variables");
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const {
      partnershipType,
      contactName,
      contactEmail,
      contactPhone,
      contactTitle,
      companyName,
      companyWebsite,
      companyAddress,
      companySize,
      yearsInBusiness,
      // Solar Installer specific
      serviceAreas,
      installationTypes,
      monthlyInstallations,
      certifications,
      // Business Partner specific
      businessType,
      targetMarket,
      valueProposition,
      // Referral Partner specific
      isCompanyReferral,
      referralSource,
      expectedReferralsMonthly,
      // Common fields
      partnershipGoals,
      additionalInfo,
    } = data;

    // Basic validation
    if (!partnershipType || !contactName || !contactEmail || !contactPhone) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Validate partnership type
    if (!["solar", "business", "referral"].includes(partnershipType)) {
      return NextResponse.json(
        { error: "Invalid partnership type" },
        { status: 400 },
      );
    }

    // Insert into Supabase
    const { data: insertedData, error } = await supabase
      .from("partnership_interest")
      .insert([
        {
          partnership_type: partnershipType,
          contact_name: contactName,
          contact_email: contactEmail,
          contact_phone: contactPhone,
          contact_title: contactTitle,
          company_name: companyName,
          company_website: companyWebsite,
          company_address: companyAddress,
          company_size: companySize,
          years_in_business: yearsInBusiness,
          service_areas: serviceAreas,
          installation_types: installationTypes,
          monthly_installations: monthlyInstallations,
          certifications,
          business_type: businessType,
          target_market: targetMarket,
          value_proposition: valueProposition,
          is_company_referral: isCompanyReferral,
          referral_source: referralSource,
          expected_referrals_monthly: expectedReferralsMonthly,
          partnership_goals: partnershipGoals,
          additional_info: additionalInfo,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Error inserting data:", error);
      if (error.code === "23505") {
        // unique violation
        return NextResponse.json(
          { error: "Email already registered" },
          { status: 409 },
        );
      }
      return NextResponse.json(
        { error: "Failed to submit application" },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { message: "Application submitted successfully", data: insertedData },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
