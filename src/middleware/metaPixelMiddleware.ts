import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  sendViewContentEvent,
  sendInitiateCheckoutEvent,
} from "../presentation/utils/metaPixel";

export async function middleware(request: NextRequest) {
  console.log(
    "Meta Pixel Middleware - Request path:",
    request.nextUrl.pathname,
  );

  const clientIp = request.headers.get("x-forwarded-for")?.split(",")[0];
  const userAgent = request.headers.get("user-agent");
  const cookieHeader = request.cookies.get("cookieConsent");
  console.log("Meta Pixel Middleware - Cookie header:", cookieHeader);
  const userConsent = cookieHeader?.value;
  console.log("Meta Pixel Middleware - Request headers:", {
    hasClientIp: !!clientIp,
    hasUserAgent: !!userAgent,
    rawClientIp: clientIp,
    rawUserAgent: userAgent,
    cookieConsent: userConsent,
  });

  if (!clientIp || !userAgent) {
    console.log(
      "Meta Pixel Middleware - Missing required headers, skipping events",
    );
    return NextResponse.next();
  }

  const formattedIp = clientIp.includes(":")
    ? clientIp.replace(/\s+/g, "").toLowerCase()
    : clientIp.trim();

  console.log("Meta Pixel Middleware - Formatted IP:", formattedIp);

  const viewData = {
    userAgent,
    clientIp: formattedIp,
  };

  try {
    if (userConsent !== "true") {
      console.log("Meta Pixel Middleware - processing skipped, no consent");
      return NextResponse.next();
    }
    // Handle different events based on the path
    if (request.nextUrl.pathname === "/register") {
      console.log("Meta Pixel Middleware - Triggering InitiateCheckout event");
      await sendInitiateCheckoutEvent(viewData, true);
    } else if (["/"].includes(request.nextUrl.pathname)) {
      console.log("Meta Pixel Middleware - Triggering ViewContent event");
      await sendViewContentEvent(viewData, true);
    } else {
      console.log(
        "Meta Pixel Middleware - No matching event for path:",
        request.nextUrl.pathname,
      );
    }
  } catch (error) {
    console.error("Meta Pixel Middleware - Error triggering events:", error);
  }

  console.log("Meta Pixel Middleware - Processing complete");
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/register"],
};
