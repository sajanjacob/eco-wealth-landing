"use client";
import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import WaitingListMobileMenu from "../home/WaitingListMobileMenu";
import Logo from "./Logo";

import { useMediaQuery } from "@mui/material";

const Header = () => {
	const router = useRouter();
	
	const [render, setRender] = useState(false);
	const path = usePathname();
	useEffect(() => {
		path !== "/thankyou" &&
		path !== "/waiting-list-thank-you" &&
		path !== "/register" &&
		path !== "/login" &&
		path !== "/signup" &&
		path !== "/forgot-password" &&
		path !== "/onboarding" &&
		path !== "/i/onboarding" &&
		path !== "/p/onboarding" &&
		path !== "/setup-mfa"
			? setRender(true)
			: setRender(false);
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
	
	if(!render) return null;
	
	return (
		<div className='header-slide-in md:h-[9vh] z-[1000] flex justify-between items-center p-4 bg-gradient-to-r from-[var(--bg-one)] to-[var(--bg-two)] border-b-[var(--header-border)] border-b border-b-green-400 sticky top-0'>
			<Logo
				width={148}
				height={60}
			/>
			<div className='flex space-x-4 items-center'>
					<>
						<a
							className='hidden md:block scroll-smooth cursor-pointer hover:text-[var(--cta-two-hover)] transition-all text-gray-300 font-medium'
							onClick={handleAboutClick}
						>
							About
						</a>
						<a
							className='hidden md:block scroll-smooth cursor-pointer hover:text-[var(--cta-two-hover)] transition-all text-gray-300 font-medium'
							onClick={handleStrategyClick}
						>
							Strategy
						</a>
						<a
							className='hidden md:block scroll-smooth cursor-pointer hover:text-[var(--cta-two-hover)] transition-all text-gray-300 font-medium'
							onClick={handleHowItWorksClick}
						>
							How it works
						</a>
						<a
							className='hidden md:block scroll-smooth cursor-pointer hover:text-[var(--cta-two-hover)] transition-all text-gray-300 font-medium'
							onClick={handlePricingClick}
						>
							Pricing
						</a>
						<button
							className='cursor-pointer transition-all hover:scale-105 bg-[var(--cta-one)] hover:bg-[var(--cta-one-hover)] text-white font-medium rounded-md text-xs md:text-lg lg:px-8 px-4 py-2 glow'
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
