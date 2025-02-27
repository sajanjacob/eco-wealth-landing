import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {
	width?: number;
	height?: number;
	mWidth?: number;
	mHeight?: number;
};

export default function Logo({ width, height, mWidth, mHeight }: Props) {
	const router = useRouter();
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth <= 768); // Standard mobile breakpoint
		};

		// Initial check
		checkMobile();

		// Add event listener for window resize
		window.addEventListener('resize', checkMobile);

		// Cleanup
		return () => window.removeEventListener('resize', checkMobile);
	}, []);

	const handleReturnHome = () => {
		router.push("/");
	};

	return (
		<div>
			<Image
				src='/white_logo_transparent_background.png'
				alt='EcoWealth logo'
				width={isMobile ? (mWidth || 150) : (width || 300)}
				height={isMobile ? (mHeight || 75) : (height || 150)}
				onClick={handleReturnHome}
				className='cursor-pointer'
			/>
		</div>
	);
}
