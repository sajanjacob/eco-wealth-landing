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
      stakeholderType,
      name,
      email,
      phone,
      profileUrl,
      primaryCompetency,
      skillsDescription,
      experienceDetails,
      toolsTechnologies,
      availabilityHours,
      startDate,
      rateAmount,
      interestArea,
      motivation,
    } = data;

    // Basic validation
    if (
      !stakeholderType ||
      !name ||
      !email ||
      !phone ||
      !profileUrl ||
      !motivation
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Insert into Supabase
    const { data: insertedData, error } = await supabase
      .from("stakeholder_interest")
      .insert([
        {
          stakeholder_type: stakeholderType,
          name,
          email,
          phone,
          profile_url: profileUrl,
          primary_competency: primaryCompetency,
          skills_description: skillsDescription,
          experience_details: experienceDetails,
          tools_technologies: toolsTechnologies,
          availability_hours: availabilityHours,
          start_date: startDate,
          rate_amount: rateAmount,
          interest_area: interestArea,
          motivation,
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
