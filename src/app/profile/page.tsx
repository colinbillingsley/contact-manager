"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import ProfileCardInfo from "@/components/ProfileCardInfo";
import EditProfile from "@/components/EditProfile";
import { useAuthContext } from "@/context/AuthContext";

const Profile = () => {
	const { user } = useAuthContext();
	return (
		<div className="w-full h-full px-6 py-4">
			<div className="w-full flex flex-col sm:flex-row items-start sm:items-start sm:justify-start">
				<div className="w-full flex-shrink-0 sm:w-fit flex flex-col justify-start items-center gap-2 mr-7 mb-5 px-4">
					<Avatar>
						<AvatarImage
							src={user.avatarUrl}
							className="rounded-full size-48"
						/>
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>
					<div>
						<span className="font-semibold">{user.name}</span>
					</div>
					<div>
						<EditProfile />
					</div>
				</div>
				<div className="flex flex-col gap-8">
					<ProfileCardInfo
						mainTitle="Contact Information"
						subTitle1="Email"
						subTitle2="Phone"
						subTitle3="Address"
						info1={user.email}
						info2={user.phone}
						info3={user.address}
					/>

					<ProfileCardInfo
						mainTitle="Professional Information"
						subTitle1="Job Title"
						subTitle2="Company"
						subTitle3="Industry"
						info1={user.jobTitle}
						info2={user.companyName}
						info3={user.industry}
					/>

					<ProfileCardInfo mainTitle="Bio" info1={user.bio} />
				</div>
			</div>
		</div>
	);
};

export default Profile;
