import React from "react";

export default function About() {
	return (
		<div
			id='about'
			className='py-[100px] px-[64px]'
		>
			<h3 className='text-3xl font-bold'>
				The vision: plant a billion trees.
			</h3>
			<div className='mt-8 '>
				<p>
					Eco Wealth is dedicated to simplifying how we take care of our planet at scale. With a focus on easy impactful solutions, our app provides a robust platform for eco-conscious investors to make lasting positive change worldwide.
				</p>
				<br/>
				<p>
					Our mission is to plant more trees than we destroy starting with a goal of planting a billion trees per year in less than a decade.
				</p>
				<p className='text-gray-400 mt-4'>
					Every year, 10 billion trees are lost to deforestation<a href="https://8billiontrees.com/trees/how-many-trees-cut-down-each-year/">&sup1;</a>, over 24 billion tons of fertile soil are lost to degradation, and over 4 billion cars worth of carbon dioxide is released into the atmosphere. (That&apos;s around 36.8 gigatonnes!)
				</p>
				<p className='text-gray-200 mt-4'>
					Be part of the solution — help crowdfund agroforestry and renewable energy projects for ROI, acquire verified carbon credits, test your soil&apos;s health, and get soil revitalization action plans.
				</p>
			</div>
		</div>
	);
}
