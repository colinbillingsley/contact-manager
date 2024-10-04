import { navLinkItemProps } from "@/types";
import { faAddressBook, faListCheck } from "@fortawesome/free-solid-svg-icons";

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
