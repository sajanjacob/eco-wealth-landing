import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import moment from "moment";
import { BsCheckCircleFill } from "react-icons/bs";
import { FaFileSignature } from "react-icons/fa";
import { extractFirstName } from "../../utils/nameUtils";
import apiClient from "../../utils/apiClient";

type Registration = {
	name: string;
	email: string;
	created_at: string;
};

export default function RecentRegistrations() {
	const [registrations, setRegistrations] = useState<Registration[]>([]);
	useEffect(() => {
		const fetchRegistrations = async () =>
			apiClient.get("/api/recent_waiting_list_subscribers").then((res) => {
				console.log("Recent registrations: ", res.data);
				setRegistrations(res.data);
			}); // 1 second delay between each toast});

		fetchRegistrations();
	}, []);

	useEffect(() => {
		async function DisplayPopup(index: number, name: string) {
			setTimeout(async () => {
				toast.success(
					() => (
						<div className='flex items-center'>
							<FaFileSignature className='mr-[8px] text-[#07bc0c] text-xl' />{" "}
							<div>
								{name && name?.split(" ").length > 1
									? extractFirstName(name)
									: name}{" "}
								registered {moment(registrations[index].created_at).fromNow()}{" "}
								<span className='text-[#07bc0c] flex items-center font-bold text-xs'>
									<BsCheckCircleFill className='mr-[2px]' /> Verifed Email
								</span>
							</div>
						</div>
					),
					{
						position: "bottom-left",
						theme: "dark",
						icon: false,
					}
				);
			}, index * 5000);
		}
		for (let i = 0; i < registrations.length; i++) {
			DisplayPopup(i, registrations[i]?.name);
		}
	}, [registrations]);

	return <></>;
}
