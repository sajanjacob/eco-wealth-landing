import React from "react";

export default function SupportLink() {
	return (
		<div>
			<a
				href='mailto:support@ecowealth.app'
				target='_blank'
				className='text-[var(--cta-one)] hover:text-[var(--cta-one-hover)]'
			>
				support@ecowealth.app
			</a>
		</div>
	);
}
