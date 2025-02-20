"use client";
import React, { useEffect, useState } from "react";
import { isEmailValid } from "@/src/presentation/utils/isEmailValid";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { BiLock } from "react-icons/bi";
import Logo from "@/src/presentation/components/global/Logo";
import Turnstile, { useTurnstile } from "react-turnstile";
import { validateName, validateEmail, validateReferralText, sanitizeInput, formatFinalName } from "@/src/presentation/utils/inputValidation";
import apiClient from "../../utils/apiClient";

function WaitingListForm() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [emailError, setEmailError] = useState("");
	const [referralSource, setReferralSource] = useState("");
	const [personalReferrer, setPersonalReferrer] = useState("");
	const [isFormValid, setIsFormValid] = useState(false);
	const searchParams = useSearchParams();
	const ref = searchParams?.get("r");
	const [businessReferrer, setBusinessReferrer] = useState("");
	const [showTurnstile, setShowTurnstile] = useState(false);
	const turnstile = useTurnstile();
	const [nameError, setNameError] = useState("");
	const [referralError, setReferralError] = useState("");

	useEffect(() => {
		if (ref) {
			setPersonalReferrer(ref);
			setReferralSource("Friend/Someone referred");
		}
	}, [ref]);

	const handleReferralSourceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setReferralSource(e.target.value);
		setBusinessReferrer(""); // Reset specific referral if the referral source is changed
		if (e.target.value !== "Friend/Someone referred") {
			setPersonalReferrer("");
		}
	};

	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const sanitizedName = sanitizeInput(e.target.value);
		setName(sanitizedName);
		
		if (!validateName(sanitizedName)) {
			setNameError("Please enter a valid name using only letters");
		} else {
			setNameError("");
		}
	};

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const sanitizedEmail = sanitizeInput(e.target.value);
		setEmail(sanitizedEmail);
		
		if (!validateEmail(sanitizedEmail)) {
			setEmailError("Please enter a valid email address");
		} else {
			setEmailError("");
		}
	};

	const handlePersonalReferrerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const sanitizedValue = sanitizeInput(e.target.value);
		setPersonalReferrer(sanitizedValue);
		
		if (!validateReferralText(sanitizedValue)) {
			setReferralError("Please enter a valid referrer name");
		} else {
			setReferralError("");
		}
	};

	const handleBusinessReferrerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const sanitizedValue = sanitizeInput(e.target.value);
		setBusinessReferrer(sanitizedValue);
		
		if (!validateReferralText(sanitizedValue)) {
			setReferralError("Please enter valid referrer details");
		} else {
			setReferralError("");
		}
	};

	const renderSpecificReferralInput = () => {
		if (referralSource === "Friend/Someone referred") {
			return (
				<div className='flex flex-col mb-4'>
					<label className='mb-2'>Who referred you?</label>
					<input
						type='text'
						value={personalReferrer}
						placeholder='Name and/or email'
						className='w-[300px] px-2 py-2 rounded-lg border border-gray-300 text-gray-900'
						onChange={handlePersonalReferrerChange}
					/>
					{referralError && <p className="text-red-500 text-sm mt-1">{referralError}</p>}
				</div>
			);
		} 
		if (referralSource === "Other") {
			return (
				<div className='flex flex-col mb-4'>
					<label className='mb-2'>Other referrer details:</label>
					<input
						type='text'
						value={businessReferrer}
						placeholder='Enter other referrer details...'
						className='w-[300px] px-2 py-2 rounded-lg border border-gray-300 text-gray-900'
						onChange={handleBusinessReferrerChange}
					/>
					{referralError && <p className="text-red-500 text-sm mt-1">{referralError}</p>}
				</div>
			);
		} 
			else if (
			[
				"Instagram",
				"Facebook",
				"YouTube",
				"TikTok",
				"Threads",
				"Blog/Website",
				"Google",
			].includes(referralSource)
		) {
			return (
				<div className='flex flex-col mb-4 w-[300px]'>
					<label className='mb-2'>
						Which {referralSource} account did you hear about Eco Wealth from?
					</label>
					<input
						type='text'
						value={businessReferrer}
						placeholder={referralSource === "Blog/Website" ? "Blog/Website name" : "@username"}
						className='w-[300px] px-2 py-2 rounded-lg border border-gray-300 text-gray-900'
						onChange={handleBusinessReferrerChange}
						maxLength={100}
					/>
					{referralError && <p className="text-red-500 text-sm mt-1">{referralError}</p>}
				</div>
			);
		}
	};
	const router = useRouter();
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!isEmailValid(email)) {
			setEmailError("Invalid email address");
			return;
		}
		setEmailError("");

		await axios
			.post("/api/waiting_list_signup", {
				name: formatFinalName(name),
				email,
				referralSource,
				personalReferrer,
				businessReferrer,
			})
			.then(() => {
				router.push(`/waiting-list-thank-you?name=${formatFinalName(name)}&email=${email}`);
			})
			.catch((err) => {
				console.log("/api/waiting_list_signup >> err", err);
			});
	};
	const handleReturnHome = () => {
		router.push("/");
	};
	useEffect(() => {
		const isValid = 
			validateName(name) && 
			validateEmail(email) && 
			!nameError && 
			!emailError && 
			!referralError;
		setIsFormValid(isValid);
	}, [name, email, nameError, emailError, referralError]);
	return (
		<form
			onSubmit={handleSubmit}
			className='flex flex-col items-center justify-center min-h-screen'
		>
			<Logo
				width={384}
				height={150}
			/>
			<h2 className='mb-12 lg:text-xl text-gray-400 text-center'>
				Join the waiting list and be the first to <br/>know when the app launches!
			</h2>
			<div className='flex flex-col mb-4'>
				<label className='mb-2'>Name:</label>
				<input
					type='text'
					value={name}
					className='w-[300px] px-2 py-2 rounded-lg border border-gray-300 text-gray-900'
					onChange={handleNameChange}
					maxLength={50}
				/>
				{nameError && <p className="text-red-500 text-sm mt-1">{nameError}</p>}
			</div>
			<div className='flex flex-col mb-4'>
				<label className='mb-2'>Email:</label>
				<input
					type='email'
					value={email}
					className='w-[300px] px-2 py-2 rounded-lg border border-gray-300 text-gray-900'
					onChange={handleEmailChange}
					maxLength={100}
				/>
				{emailError && <p style={{ color: "red" }}>{emailError}</p>}
			</div>
			{/* Referral source dropdown */}
			<div className='flex flex-col mb-4'>
				<label className='mb-2'>How did you hear about Eco Wealth?</label>
				<select
					value={referralSource}
					className='w-[300px] px-2 py-2 rounded-lg border border-gray-300 text-gray-900'
					onChange={handleReferralSourceChange}
				>
					<option value=''>Select</option>
					<option value='Instagram'>Instagram</option>
					<option value='Facebook'>Facebook</option>
					<option value='YouTube'>YouTube</option>
					<option value='TikTok'>TikTok</option>
					<option value='Threads'>Threads</option>
					<option value='Blog/Website'>Blog/Website</option>
					<option value='Google'>Google</option>
					<option value='Friend/Someone referred'>
						Friend/Someone referred me
					</option>
					<option value='Other'>Other</option>
				</select>
			</div>

			{/* Conditional text input for referrer */}
			{renderSpecificReferralInput()}
			
			<button
				className={
					isFormValid
						? "w-[300px] mt-8 px-4 py-2 rounded-lg bg-[var(--cta-one)] text-white cursor-pointer hover:bg-[var(--cta-one-hover)] transition-all hover:scale-105"
						: "w-[300px] mt-8 px-4 py-2 rounded-lg bg-gray-700 text-white cursor-default"
				}
				type='button'
				onClick={() => setShowTurnstile(true)}
				disabled={!isFormValid}
			>
				Join waiting list
			</button>
			<div className="mt-8">
				{showTurnstile
					&& <Turnstile
							sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ""}
							onVerify={() => {
								apiClient.post('/api/waiting_list_signup', {
									name,
									email,
									referralSource,
									personalReferrer,
									businessReferrer
								}).then(() => {
									console.log("Successfully submitted form");
									const searchParams = new URLSearchParams();
									searchParams.append('name', formatFinalName(name));
									searchParams.append('email', email);
									router.push('/waiting-list-thank-you?' + searchParams.toString());
									turnstile.reset();
								}).catch((err) => {
									console.log(err);
									turnstile.reset();
								});
							}}
						/>
				}
			</div>
			<div className='w-[300px] mt-4'>
				<p className='text-xs mt-2 text-gray-500'>
					<BiLock className='inline text-base' />
					<b>Your Privacy:</b> We promise to keep your contact information
					confidential and only contact you with news & updates regarding Eco
					Wealth, and inviting you to test the platform when opportunities
					arise.
				</p>
				<p className='text-xs mt-2 text-gray-500'>
					<b>Note:</b> More details can be found in our{" "}
					<a
						href='/privacy-policy'
						className='underline cursor-pointer hover:text-gray-400 transition-all'
					>
						privacy policy
					</a>
					.
				</p>
			</div>
		</form>
	);
}

export default WaitingListForm;
