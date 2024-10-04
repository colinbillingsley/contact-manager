import { navLinkItemProps, profileCardProps, userProps } from "@/types";
import {
	faAddressBook,
	faBookmark,
	faGaugeHigh,
	faListCheck,
	faPeopleGroup,
	faUser,
} from "@fortawesome/free-solid-svg-icons";

export const navLinks: navLinkItemProps[] = [
	{
		href: "/contacts",
		icon: faAddressBook,
		title: "Contacts",
	},
	{
		href: "/tasks",
		icon: faListCheck,
		title: "Tasks",
	},
];
