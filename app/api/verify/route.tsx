import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@supabase/supabase-js";
import axios from "axios";
import { extractFirstName } from "@/src/presentation/utils/nameUtils";
import { validateApiKey } from "@/src/middleware/authMiddleware";

export async function PUT(req: NextRequest) {
	// Validate API key
    const authError = validateApiKey(req);
    if (authError) return authError;

	const SUPABASE_URL = process.env.supabase_public_url;
	const SUPABASE_SERVICE_ROLE_KEY = process.env.supabase_service_role_key;
	if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) return;
	const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
	const { token } = await req.json();
	const { data, error } = await supabase
		.from("wl_signup_validation_tokens")
		.select("wl_user_id")
		.eq("token", token);
	if (error) {
		console.error("Error fetching user:", error);
		return NextResponse.json({ message: error.message }, { status: 501 });
	}
	if (!data) {
		return NextResponse.json({ message: "Invalid token" }, { status: 401 });
	}
	const { data: updateUserData, error: updateError } = await supabase
		.from("waiting_list_subscribers")
		.update({ email_verified: true })
		.eq("id", data[0].wl_user_id)
        .select()
        .single();
	if (updateError) {
		console.error("Error updating user:", updateError);
		return NextResponse.json({ message: updateError.message }, { status: 501 });
	}
	const { error: deleteError } = await supabase
		.from("wl_signup_validation_tokens")
		.delete()
		.eq("token", token);
	if (deleteError) {
		console.error("Cleanup error while deleting wl token");
		return NextResponse.json({ message: deleteError.message }, { status: 502 });
	}
   	// Add to waiting list subscriber mailing list
    try {
        console.log('updateUserData >>> ', updateUserData);
        const firstName = extractFirstName(updateUserData.name);
        
        const kitResponse = await axios.post(
            'https://api.kit.com/v4/subscribers',
            {
                email_address: updateUserData.email,
                first_name: firstName,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-Kit-Api-Key': process.env.NEXT_PUBLIC_KIT_API_KEY
                }
            }
        );
        
        console.log('kit response >>> ', kitResponse);
        const sequence_id = process.env.KIT_SEQUENCE_ID;
        if (sequence_id && kitResponse.data.subscriber.id) {
            await axios.post(
                `https://api.kit.com/v4/sequences/${sequence_id}/subscribers/${kitResponse.data.subscriber.id}`,
                {},
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'X-Kit-Api-Key': process.env.NEXT_PUBLIC_KIT_API_KEY
                    }
                }
            );
        }
    } catch (error) {
        console.error("Kit integration error:", error);
        // Don't fail the registration if Kit integration fails
    }
	return NextResponse.json({ message: "success" }, { status: 200 });
}
