"use client";
import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import WaitingListMobileMenu from "../home/WaitingListMobileMenu";
import Logo from "./Logo";
import AboutDropdown from "./AboutDropdown";

const Header = () => {
  const router = useRouter();

  const [render, setRender] = useState(false);
  const path = usePathname();
  useEffect(() => {
    setRender(
      ![
        "/thankyou",
        "/waiting-list-thank-you",
        "/register",
        "/login",
        "/signup",
        "/forgot-password",
        "/onboarding",
        "/i/onboarding",
        "/p/onboarding",
        "/setup-mfa",
      ].includes(path),
    );
  }, [path]);

  const handleAboutClick = () => {
    router.push("/#about");
  };

  const handlePricingClick = () => {
    router.push("/#pricing");
  };

  const handleStrategyClick = () => {
    router.push("/#strategy");
  };
  const handleHowItWorksClick = () => {
    router.push("/#how-it-works");
  };
  const handleWaitingListClick = () => router.push("/register");

  if (!render) return null;

  return (
    <div className="header-slide-in sticky top-0 z-[1000] flex items-center justify-between border-b border-b-[var(--header-border)] border-b-green-400 bg-gradient-to-r from-[var(--bg-one)] to-[var(--bg-two)] p-4 md:h-[9vh]">
      <Logo width={148} height={60} />
      <div className="flex items-center space-x-4">
        <>
          <div className="hidden md:block">
            <AboutDropdown onAboutClick={handleAboutClick} />
          </div>
          <a
            className="hidden cursor-pointer scroll-smooth font-medium text-gray-300 transition-all hover:text-[var(--cta-two-hover)] md:block"
            onClick={handleStrategyClick}
          >
            Strategy
          </a>
          <a
            className="hidden cursor-pointer scroll-smooth font-medium text-gray-300 transition-all hover:text-[var(--cta-two-hover)] md:block"
            onClick={handleHowItWorksClick}
          >
            How it works
          </a>
          <a
            className="hidden cursor-pointer scroll-smooth font-medium text-gray-300 transition-all hover:text-[var(--cta-two-hover)] md:block"
            onClick={handlePricingClick}
          >
            Pricing
          </a>
          <button
            className="glow cursor-pointer rounded-md bg-[var(--cta-one)] px-4 py-2 text-xs font-medium text-white transition-all hover:scale-105 hover:bg-[var(--cta-one-hover)] md:text-lg lg:px-8"
            onClick={handleWaitingListClick}
          >
            Join the waiting list today
          </button>
          <WaitingListMobileMenu />
        </>
      </div>
    </div>
  );
};

export default Header;
