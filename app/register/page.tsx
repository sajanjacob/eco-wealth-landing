import WaitingListForm from "@/src/presentation/components/register/WaitingListForm";
import React, { Suspense } from "react";

export default function Register() {
	return (
		<div>
			<Suspense fallback={<div>Loading...</div>}>
				<WaitingListForm />
			</Suspense>
		</div>
	);
}
