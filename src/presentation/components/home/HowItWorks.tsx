import React from "react";

export default function HowItWorks() {
	return (
		<>
			<hr className='border-green-400' />
			<div
				id='how-it-works'
				className='py-[100px] px-[64px]'
			>
				<h1 className='text-3xl font-bold'>
					How Eco Wealth Works 
				</h1>
				<div className='mt-16'>
				<div className='[&>*:nth-child(1)]:hover:text-[var(--h-one)] flex flex-col md:flex-row mt-4 md:items-center hover:scale-110 transition-all text-gray-400 hover:!text-white mb-16'>
						<span className='flex-1 mb-2 md:mb-0 text-2xl md:text-4xl font-bold mr-2 text-gray-200'>
							Generative Environmental AI
						</span>
						<div className='flex-[2.22]'>
							<h3 className='text-lg font-semibold'>
								Login for free and chat with our environmental AI agent just like you would with ChatGPT. The AI will be loaded with 
								specialized environmental knowledge from our SME partners made up of environmental scientists, professors, and farmers.
							</h3>
						</div>
					</div>
					<div className='[&>*:nth-child(1)]:hover:text-[var(--h-one)] flex flex-col md:flex-row mt-4 md:items-center hover:scale-110 transition-all text-gray-400 hover:!text-white mb-16'>
						<span className='flex-1 mb-2 md:mb-0 text-2xl md:text-4xl font-bold mr-2 text-gray-200'>
							Carbon Credits
						</span>
						<div className='flex-[2.22]'>
							<h3 className='text-lg font-semibold'>
								Discover projects worldwide that are offering carbon credits through an array of verified carbon credit registries, choose the number of credits you want to purchase
								from the project(s) you want to support, then purchase and store them in your account. <br/><br/>All credit purchases are automatically verified and registered with the original carbon credit registry.
							</h3>
						</div>
					</div>
					<div className='[&>*:nth-child(1)]:hover:text-[var(--h-one)] flex flex-col md:flex-row my-4 md:items-center hover:scale-110 transition-all text-gray-400 hover:!text-white mb-16'>
						<span className='flex-1 mb-2 md:mb-0 text-2xl md:text-4xl font-bold mr-2 text-gray-200'>
							Soil Testing
						</span>
						<div className='flex-[2.22]'>
							<h3 className='text-lg font-semibold'>
								Find local soil testing lab partners and order a soil test for your land by sending in a soil sample or requesting a on-site test. Our soil experts will put together an analysis of your soil as well as provide recommendations for revitalizing the soil unique to your area.
							</h3>
						</div>
					</div>
					<div className='[&>*:nth-child(1)]:hover:text-[var(--h-one)] flex flex-col md:flex-row my-4 md:items-center hover:scale-110 transition-all text-gray-400 hover:!text-white mb-16'>
						<span className='flex-1 mb-2 md:mb-0 text-2xl md:text-4xl font-bold mr-2 text-gray-200'>
							Crowdfunding
						</span>
						<div className='flex-[2.22]'>
							<h3 className='text-lg font-semibold'>
								Discover agroforestry and renewable energy projects, choose the number of shares you want to purchase for the project(s) you support, fund the project,
								and add the shares to your portfolio. <br/><br/> After farmer-producers begin making project returns, investors will receive their returns too.

							</h3>
						</div>
					</div>
					
				</div>
			</div>
		</>
	);
}
