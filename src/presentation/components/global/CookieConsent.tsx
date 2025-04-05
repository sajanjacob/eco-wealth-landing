"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);
  const [showMobileMargin, setShowMobileMargin] = useState(true);

  useEffect(() => {
    // Check if consent has been given before
    const userConsent =
      document.cookie.match(/cookieConsent=([^;]+)/)?.[1] ||
      localStorage.getItem("cookieConsent");
    if (userConsent) {
      document.cookie = `cookieConsent=${userConsent};path=/;max-age=31536000`; // 1 year expiry
    }
    if (userConsent === null) {
      setShowConsent(true);
      // Set a timeout to remove the bottom margin after all registrations are shown
      const timeout = setTimeout(() => {
        setShowMobileMargin(false);
      }, 21000); // 21 seconds

      return () => clearTimeout(timeout);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "true");
    setShowConsent(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookieConsent", "false");
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div
      className={`fixed bottom-4 mx-4 max-w-sm lg:right-4 lg:mx-0 ${showMobileMargin ? "mb-16" : "mb-0"} z-[2000] rounded-lg border border-green-800 bg-gray-900 p-4 shadow-lg transition-all duration-1000 lg:mb-0`}
    >
      <p className="mb-4 text-sm text-gray-300">
        We use cookies to analyze site traffic and optimize your experience. By
        accepting, you agree to our use of cookies for marketing and analytics
        purposes. View our{" "}
        <Link
          href="/privacy-policy"
          className="text-[var(--cta-one)] underline transition-colors duration-300 hover:text-[var(--cta-two-hover)]"
        >
          privacy policy
        </Link>{" "}
        for the details.
      </p>
      <div className="flex gap-3">
        <button
          onClick={handleAccept}
          className="flex-1 rounded-md bg-[var(--cta-one)] px-4 py-2 text-sm text-white transition-colors hover:bg-[var(--cta-one-hover)]"
        >
          Accept
        </button>
        <button
          onClick={handleDecline}
          className="flex-1 rounded-md bg-gray-700 px-4 py-2 text-sm text-white transition-colors hover:bg-gray-600"
        >
          Decline
        </button>
      </div>
    </div>
  );
}
