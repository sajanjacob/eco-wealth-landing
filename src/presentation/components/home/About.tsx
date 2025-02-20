import React from "react";

type Props = {};

export default function About({}: Props) {
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
			</div>
		</div>
	);
}
