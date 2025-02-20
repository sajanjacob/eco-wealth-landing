"use client";
import React from "react";
import { useRouter } from "next/navigation";
import WaitingListGoalTracker from "./WaitingListGoalTracker";
import { User } from "@supabase/supabase-js";

type Props = {
    user?: User;
    isLoading?: boolean;
    onWaitingList: () => void;
    onLogin: () => void;
    onSignup: () => void;
};

export default function Hero({user,
    isLoading,
    onWaitingList,
    onLogin,
    onSignup}: Props) {
	const router = useRouter();

	const handleWaitingListClick = () => router.push("/register");
    const backgroundImageUrl =
        "https://storage.googleapis.com/msgsndr/6xhGkq67K123q2R9TMf0/media/644868002b9d838721622a4d.jpeg";
	return (
		<div
				className='z-0 absolute top-0 w-[100%] mx-auto h-[100vh] bg-cover bg-center flex justify-center items-center bg-no-repeat'
				style={{
					backgroundImage: `url(${backgroundImageUrl})`,
				}}
			>
            <div className='z-[1000] w-full h-full flex justify-center flex-col items-center bg-black bg-opacity-75'>
                <div className='z-[1000] w-[80%] m-auto items-center md:w-[50%]'>
                    <h1 className='text-white font-bold text-2xl md:text-3xl md:w-[100%] mt-8 md:mt-0'>
                        Together, we can make a positive impact all around the world by{" "}
                        <span className='text-[var(--h-one)]'> planting trees</span>,
                        prioritizing{" "}
                        <span className='text-[var(--h-one)]'> soil health</span>, and
                        transitioning to{" "}
                        <span className='text-[var(--h-one)]'> renewable energy</span>.
                    </h1>
                    <div>
                        <h3 className='font-medium tracking-wide text-gray-400 text-lg md:text-2xl mt-4'>
                            Every year, 10 billion trees are lost to deforestation<a href="https://8billiontrees.com/trees/how-many-trees-cut-down-each-year/">*</a>, over 24 billion tons of fertile soil are lost to degradation, and over 4 billion cars worth of carbon dioxide is released into the atmosphere. (That&apos;s around 36.8 gigatonnes!)
                        </h3>
                        <h4 className='font-medium tracking-wide text-gray-200 text-lg mt-4'>
                            Be part of the solution — help crowdfund agroforestry and renewable energy projects for ROI, acquire verified carbon credits, test your soil&apos;s health, and get soil revitalization action plans.
                        </h4>
                        <h5 className='font-medium tracking-wide text-gray-500 mt-4'>First 1000 users pay no platform fees for life.</h5>
                        <button
                            className='z-[1000] pulsate mb-4 cursor-pointer transition-all bg-[var(--cta-one)] hover:bg-[var(--cta-one-hover)] text-white font-medium rounded-md text-sm lg:text-lg lg:px-8 px-4 py-2 mt-8'
                            onClick={handleWaitingListClick}
                        >
                            Join the waiting list today
                        </button>
                        <WaitingListGoalTracker />
                    </div>	
                </div>
                <div className='flex justify-end w-[100%]'>
                    <h6 className='text-right text-white font-light mb-4 mr-4 text-xs opacity-50'>
                        Photo by Matthew Smith via Unsplash.
                    </h6>
                </div>
            </div>
        </div>		
	);
}
