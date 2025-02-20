import React from "react";

type Props = {};

export default function Strategy({}: Props) {
	return (
		<>
			<hr className='border-green-400' />
			<div
				id='strategy'
				className='py-[100px] px-[64px]'
			>
				<h1 className='text-3xl font-bold'>The strategy: one step at a time.</h1>
				<div className='mt-8'>
					<div className='[&>*:nth-child(1)]:hover:text-[var(--h-one)] flex flex-col md:flex-row my-4 md:items-center mb-16 hover:scale-110 transition-all text-gray-400'>
						<span className=' flex-1 text-5xl font-bold mb-2 md:mb-0 mr-2 text-gray-200'>
							One
						</span>{" "}
						<div className='flex-[3.33]'>
							<h3 className='text-lg font-semibold'>
								Generative Environmental AI Agents
							</h3>
							With SME collaboration, we will develop interactive AI systems to provide actionable environmental evidence-based insights.
						</div>{" "}
					</div>
					<div className='[&>*:nth-child(1)]:hover:text-[var(--h-one)] flex flex-col md:flex-row my-4 md:items-center mb-16 hover:scale-110 transition-all text-gray-400'>
						<span className=' flex-1 text-5xl font-bold mb-2 md:mb-0 mr-2 text-gray-200'>
							Two
						</span>{" "}
						<div className='flex-[3.33]'>
							<h3 className='text-lg font-semibold'>
								Carbon Soil Sequestration
							</h3>
							Through trading carbon credits from verified environnmental projects & enhancing soil health with expert recommendations, we can sequester excess carbon into soil both reducing carbon dioxide in the atmosphere and
							enhancing crop & produce nutrients long term.
						</div>{" "}
					</div>
					<div className='[&>*:nth-child(1)]:hover:text-[var(--h-one)]  flex flex-col md:flex-row my-4 md:items-center mb-16 hover:scale-110 transition-all text-gray-400'>
						<span className='flex-1 text-5xl font-bold mb-2 md:mb-0 mr-2 text-gray-200'>
							Three
						</span>{" "}
						<div className='flex-[3.33]'>
							<h3 className='text-lg font-semibold'>
							 	Tree Health Tracking System Research & Development
							</h3>
							Here we will research and develop comprehensive tree health tracking systems for agroforestry projects worldwide.
						</div>
					</div>{" "}
					<div className='[&>*:nth-child(1)]:hover:text-[var(--h-one)] flex flex-col md:flex-row my-4 md:items-center mb-16 hover:scale-110 transition-all text-gray-400'>
						<span className='flex-1 text-5xl font-bold mb-2 md:mb-0 mr-2 text-gray-200'>
							Four
						</span>{" "}
						<div className='flex-[3.33]'>
							<h3 className='text-lg font-semibold'>
								Agroforestry and Renewable Energy Project Crowdfunding
							</h3>
							Once the platform is compliant and the technology is ready to track tree health at scale, we will offer the crowdfunding portal publicly.
						</div>
					</div>
					<div className='[&>*:nth-child(1)]:hover:text-[var(--h-one)] flex flex-col md:flex-row my-4 md:items-center mb-16 hover:scale-110 transition-all text-gray-400'>
						<span className='flex-1 text-5xl font-bold mb-2 md:mb-0 mr-2 text-gray-200'>
							Five
						</span>{" "}
						<div className='flex-[3.33]'>
							<h3 className='text-lg font-semibold'>
								Free Agroforestry and Renewable Energy Project Offerings
							</h3>
							As Eco Wealth grows, so does our commitment to the environment & ultimately human wellbeing. We
							will reinvest profits into free tree and solar projects in developing countries.
						</div>
					</div>
					
				</div>
			</div>
		</>
	);
}
