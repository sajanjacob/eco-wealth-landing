import { NextRequest, NextResponse } from "next/server";

export function validateApiKey(request: NextRequest) {
  const apiKey = request.headers.get("x-api-key");
  
  if (!apiKey || apiKey !== process.env.API_ACCESS_KEY) {
    return NextResponse.json(
      { message: "Unauthorized - Invalid API Key" },
      { status: 401 }
    );
  }
  
  return null;
} 