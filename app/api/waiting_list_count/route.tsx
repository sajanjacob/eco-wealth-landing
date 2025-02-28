import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
	const SUPABASE_URL = process.env.supabase_public_url;
    const SUPABASE_ANON_KEY = process.env.supabase_public_key;
	if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return NextResponse.json({ message: "Missing Supabase credentials" }, { status: 500 });
	const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

	// Function to check if an email contains 'test' or 'Test' in the alias
	const isTestEmail = (email: string) => {
		const localPart = email.split("@")[0];
		return localPart.includes("+test") || localPart.includes("+Test");
	};

	// Function to extract the last name and check if it contains 'Test-'
	const hasTestLastName = (fullName: string) => {
		const parts = fullName.split(" ");
		const lastName = parts[parts.length - 1];
		return lastName.startsWith("Test-");
	};

	try {
		
		// Fetch users from the "waiting_list" table
		const { data: waitingListData } = await supabase
			.from("waiting_list_subscribers")
			.select("email, name")
			.eq("email_verified", true);

		// Combine and filter emails
		const filteredEmails = [...(waitingListData || [])]
			.filter((user) => !isTestEmail(user.email) && !hasTestLastName(user.name))
			.map((user) => user.email);
		// Count unique emails
		const uniqueEmailsCount = new Set(filteredEmails).size;

		return NextResponse.json({ count: uniqueEmailsCount }, { status: 200 });
	} catch (error) {
		console.error("Error fetching data:", error);
		return NextResponse.json(
			{ message: (error as Error).message },
			{ status: 501 }
		);
	}
}
