import React from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { profileCardProps } from "@/types";

const ProfileCardInfo: React.FC<profileCardProps> = ({
	mainTitle,
	subTitle1,
	subTitle2,
	subTitle3,
	info1,
	info2,
	info3,
}) => {
	return (
		<Card className="flex flex-col bg-white rounded-md border border-neutral-200">
			<CardHeader className="mb-3 bg-neutral-50 border-b border-neutral-200 rounded-t-md p-4">
				<CardTitle className="text-xl font-semibold">{mainTitle}</CardTitle>
			</CardHeader>
			<CardContent className="flex items-center gap-5 p-5 flex-wrap">
				<div className="flex flex-col gap-1">
					<span>{subTitle1}</span>
					<span className="font-semibold">{info1}</span>
				</div>
				<div className="flex flex-col gap-1">
					<span>{subTitle2}</span>
					<span className="font-semibold">{info2}</span>
				</div>
				<div className="flex flex-col gap-1">
					<span>{subTitle3}</span>
					<span className="font-semibold">{info3}</span>
				</div>
			</CardContent>
		</Card>
	);
};

export default ProfileCardInfo;
