import {
	faTrash,
	faEnvelope,
	faPhone,
	faLocationPin,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import React from "react";
import EditContact from "./EditContact";
import { Button } from "./ui/button";
import { contactProps } from "@/types";
import DeleteContact from "./DeleteContact";

interface DisplayContactProps {
	contact: contactProps;
	setContact: (contact: contactProps | null) => void;
	setIsOpen: (state: boolean) => void;
}

const DisplayContact: React.FC<DisplayContactProps> = ({
	contact,
	setContact,
	setIsOpen,
}) => {
	return (
		<div className="w-full h-full flex flex-col justify-start items-center gap-4">
			<Avatar>
				<AvatarImage
					src={contact.avatarUrl}
					className="rounded-full size-20 md:size-24"
				/>
			</Avatar>

			<div className="flex flex-col gap-1 justify-start items-center">
				<span className="font-semibold text-2xl text-center">
					{contact.name}
				</span>
				<span className="text-sm md:text-base text-neutral-500 text-center">{`${contact.companyName} (${contact.industry}), ${contact.jobTitle}`}</span>
			</div>

			<div className="text-xs md:text-base flex flex-col gap-1">
				<div className="flex items-center gap-2">
					<FontAwesomeIcon className="text-blue-600" icon={faEnvelope} />
					<span>{contact.email}</span>
				</div>
				<div className="flex items-center gap-2">
					<FontAwesomeIcon className="text-blue-600" icon={faPhone} />
					<span>{contact.phone}</span>
				</div>
				<div className="flex items-center gap-2">
					<FontAwesomeIcon className="text-blue-600" icon={faLocationPin} />
					<span>{contact.address}</span>
				</div>
			</div>

			<div className="flex items-center gap-2">
				<EditContact contact={contact} />
				<DeleteContact
					contact={contact}
					setContact={setContact}
					setIsOpen={setIsOpen}
				/>
			</div>
		</div>
	);
};

export default DisplayContact;
