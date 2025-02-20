import React from "react";

export default function About() {
	return (
		<div
			id='about'
			className='py-[100px] px-[64px]'
		>
			<h3 className='text-3xl font-bold mt-8'>
				The vision: plant a billion trees.
			</h3>
			<div className='mt-8 text-lg'>
				<p className='mb-4'>
					Eco Wealth is dedicated to simplifying how we take care of our planet at scale. Planting trees is an act of love that goes beyond us individually. 
				</p>
				<p className='mb-4'>
					With a focus on easy impactful solutions, our app provides a robust platform for eco-conscious investors to make lasting positive change worldwide.
				</p>
				<p className='mb-4'>
					Our mission is to plant more trees than we destroy starting with a goal of planting a billion trees per year in less than a decade.
				</p>
				<p className='mb-4'>
					Every year, over 10 billion trees are lost to deforestation<a href="https://8billiontrees.com/trees/how-many-trees-cut-down-each-year/">&sup1;</a>, over 24 billion tons of fertile soil is lost to degradation, and over 4 billion cars worth of carbon dioxide is released into the atmosphere. (That&apos;s around 36.8 gigatonnes!)
				</p>
				<p className='mb-4'>
					You can be part of the solution with Eco Wealth — help crowdfund agroforestry and renewable energy projects for ROI, acquire verified carbon credits, test your soil&apos;s health, and get soil revitalization action plans.
				</p>
			</div>
		</div>
	);
}
