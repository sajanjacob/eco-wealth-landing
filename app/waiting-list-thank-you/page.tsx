"use client";
import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { extractFirstName } from "@/src/presentation/utils/nameUtils";

type Props = {};

export default function WaitingListThankYou({}: Props) {
	const params = useSearchParams();
	const router = useRouter();
	function handleReturnHome() {
		router.push("/");
	}

	return (
		<div className='flex flex-col items-center justify-center min-h-screen px-12'>
			<Image
				src='/white_logo_transparent_background.png'
				width={300}
				height={300}
				alt='Eco Wealth Logo'
				onClick={handleReturnHome}
				className='cursor-pointer'
			/>
			<h1 className='text-3xl font-bold mb-4'>
				Thank you for registering for the waiting list
				{params
					? `, ${params.get("name")
							 && extractFirstName(params.get("name") || "")}! 🎉`
					: "! 🎉"}
			</h1>
			<p>
				Please check your email to confirm your registration.
			</p>
		</div>
	);
}
