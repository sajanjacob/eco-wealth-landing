'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);
  const [showMobileMargin, setShowMobileMargin] = useState(true);

  useEffect(() => {
    // Check if consent has been given before
    const userConsent = localStorage.getItem('cookieConsent');
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
    localStorage.setItem('cookieConsent', 'true');
    setShowConsent(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'false');
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div className={`fixed bottom-4 lg:right-4 mx-4 lg:mx-0 max-w-sm ${showMobileMargin ? 'mb-16' : 'mb-0'} lg:mb-0 bg-gray-900 p-4 rounded-lg shadow-lg border border-green-800 z-[2000] transition-all duration-1000`}>
      <p className="text-sm text-gray-300 mb-4">
        We use cookies to analyze site traffic and optimize your experience. By accepting, you agree to our use of cookies for marketing and analytics purposes. View our{" "}
        <Link 
          href="/privacy-policy" 
          className="text-[var(--cta-one)] hover:text-[var(--cta-two-hover)] underline transition-colors duration-300"
        >
          privacy policy
        </Link>{" "}
        for the details.
      </p>
      <div className="flex gap-3">
        <button
          onClick={handleAccept}
          className="flex-1 px-4 py-2 bg-[var(--cta-one)] hover:bg-[var(--cta-one-hover)] text-white rounded-md transition-colors text-sm"
        >
          Accept
        </button>
        <button
          onClick={handleDecline}
          className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors text-sm"
        >
          Decline
        </button>
      </div>
    </div>
  );
} 