import { NextRequest, NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { validateApiKey } from "@/src/middleware/authMiddleware";
import { createClient } from "@supabase/supabase-js";

export async function GET(req: NextRequest, res: NextResponse) {
	// Validate API key
    const authError = validateApiKey(req);
    if (authError) return authError;

	const SUPABASE_URL = process.env.supabase_public_url;
    const SUPABASE_ANON_KEY = process.env.supabase_public_key;
	if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return NextResponse.json({ message: "Missing Supabase credentials" }, { status: 500 });
	const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

	// Function to check if an email contains 'test' or 'Test' in the alias
	const isTestEmail = (email: string) => {
		const localPart = email.split("@")[0];
		return localPart.includes("+test") || localPart.includes("+Test");
	};

	// Function to check if the last name contains 'Test-'
	const hasTestLastName = (name: string) => {
		return name && name.split(" ").some((part) => part.startsWith("Test-"));
	};

	try {
		// Fetch users from the "waiting_list" table
		const { data: waitingListData, error: waitingListError } = await supabase
			.from("waiting_list_subscribers")
			.select("name, email, created_at")
			.eq("email_verified", true)
			.order("created_at", { ascending: false })
			.limit(5);

		
		// Combine, filter, and sort the data
		const filteredData = (waitingListData || [])
			.filter((user) => !isTestEmail(user.email) && !hasTestLastName(user.name))
			.sort(
				(a, b) =>
					new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
			)
			.slice(0, 5);

		console.log("Most recent registrations: ", filteredData);
		return NextResponse.json(filteredData, { status: 200 });
	} catch (error) {
		console.error("Error fetching data:", error);
		return NextResponse.json(
			{ message: (error as Error).message },
			{ status: 501 }
		);
	}
}
