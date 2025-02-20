import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineClose } from "react-icons/ai"; // Assuming you're using react-icons for the close icon as well
import Link from "next/link";

export default function WaitingListMobileMenu() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<div className='md:hidden'>
			<RxHamburgerMenu
				className='text-2xl'
				onClick={() => setIsMenuOpen(true)}
			/>

			{isMenuOpen && (
				<div
					className={`absolute top-0 left-0 h-screen w-full bg-green-950 flex flex-col transform transition-opacity duration-500 ${
						isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
					}`}
					style={{ transition: "visibility 0s, opacity 0.5s linear" }}
				>
					<button
						onClick={() => setIsMenuOpen(false)}
						className='self-end p-4'
					>
						<AiOutlineClose className='text-2xl' />
					</button>
					<Link
						href='/#about'
						className='p-4 border-b border-gray-200'
						onClick={() => setIsMenuOpen(false)}
					>
						About
					</Link>
					<Link
						href='/#strategy'
						className='p-4 border-b border-gray-200'
						onClick={() => setIsMenuOpen(false)}
					>
						Strategy
					</Link>
					<Link
						href='/#how-it-works'
						className='p-4 border-b border-gray-200'
						onClick={() => setIsMenuOpen(false)}
					>
						How it works
					</Link>
					<Link
						href='/#pricing'
						className='p-4 border-b border-gray-200'
						onClick={() => setIsMenuOpen(false)}
					>
						Pricing
					</Link>
					<Link
						href='/register'
						className='p-4'
						onClick={() => setIsMenuOpen(false)}
					>
						Join the waiting list today
					</Link>
				</div>
			)}
		</div>
	);
}
