import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export interface navLinkItemProps {
	href: string;
	icon: IconDefinition;
	title: string;
}

export interface profileCardProps {
	mainTitle: string;
	subTitle1?: string;
	subTitle2?: string;
	subTitle3?: string;
	info1: string;
	info2?: string;
	info3?: string;
}

export interface userProps {
	id: number;
	name: string;
	email: string;
	phone: string;
	address: string;
	jobTitle: string;
	companyName: string;
	industry: string;
	bio: string;
	avatarUrl?: string;
}

export interface taskProps {
	id: number;
	title: string;
	description: string;
	priority: string;
	status: number;
	dueDate: string;
}

export interface AuthContextType {
	user: userProps;
	setUser: (user: userProps) => void;
	updateUser: (user: userProps) => void;
	contacts: contactProps[];
	setContacts: (contacts: contactProps[]) => void;
	tasks: taskProps[];
	setTasks: React.Dispatch<React.SetStateAction<taskProps[]>>;
	addContact: (user: contactProps) => void;
	removeContact: (id: number) => void;
	updateContact: (user: contactProps) => void;
	addTask: (task: taskProps) => void;
	removeTask: (id: number) => void;
	updateTask: (task: taskProps) => void;
}

export type contactProps = Omit<userProps, "bio">;
