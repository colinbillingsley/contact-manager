"use client";
import { AuthContextType, contactProps, taskProps, userProps } from "@/types";
import { createContext, ReactNode, useContext, useState } from "react";

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [user, setUser] = useState<userProps>({
		id: 0,
		name: "Temp Name",
		email: "someemail@gmail.com",
		phone: "+1 615-123-1234",
		address: "1234 SomeKind Rd City, STATE, 39290",
		jobTitle: "Temp Job Title",
		companyName: "Temp Company Name",
		industry: "Temp Industry",
		bio: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi eaque dolorem maxime, repudiandae alias vitae? Nesciunt mollitia modi aliquid iure necessitatibus, perferendis iste aperiam vitae ea incidunt voluptates ipsam nulla?
		Possimus, accusantium nisi quidem officia repellat tempore deserunt vero nulla temporibus debitis quam voluptatum ea similique dolore sapiente maxime a esse dicta, unde quos! Quo alias ratione culpa sunt amet?
		Quaerat ullam deserunt corporis autem, totam voluptates neque nobis necessitatibus reiciendis recusandae quae perferendis voluptatibus itaque iure ea, nam cum non error voluptate. Esse culpa accusantium quae dignissimos qui veniam.`,
		avatarUrl: "https://github.com/shadcn.png",
	});

	const updateUser = (updatedUser: userProps) => {
		setUser(updatedUser);
	};

	const [contacts, setContacts] = useState<contactProps[]>([
		{
			id: 1,
			name: "John Doe",
			email: "john.doe@example.com",
			phone: "(555) 123-4567",
			address: "123 Elm Street, Springfield, IL 62701",
			jobTitle: "Software Engineer",
			companyName: "Tech Solutions",
			industry: "Technology",
			avatarUrl: "https://github.com/shadcn.png",
		},
		{
			id: 2,
			name: "Jane Smith",
			email: "jane.smith@example.com",
			phone: "(555) 987-6543",
			address: "456 Oak Avenue, Springfield, IL 62702",
			jobTitle: "Marketing Manager",
			companyName: "Creative Agency",
			industry: "Marketing",
			avatarUrl: "https://github.com/shadcn.png",
		},
		{
			id: 3,
			name: "Alice Johnson",
			email: "alice.johnson@example.com",
			phone: "(555) 555-1212",
			address: "789 Pine Road, Springfield, IL 62703",
			jobTitle: "Graphic Designer",
			companyName: "Design Co.",
			industry: "Design",
			avatarUrl: "https://github.com/shadcn.png",
		},
		{
			id: 4,
			name: "Bob Brown",
			email: "bob.brown@example.com",
			phone: "(555) 444-3333",
			address: "321 Maple Drive, Springfield, IL 62704",
			jobTitle: "Product Manager",
			companyName: "Innovate Inc.",
			industry: "Product Development",
			avatarUrl: "https://github.com/shadcn.png",
		},
	]);

	const addContact = (contact: Omit<contactProps, "id">) => {
		const newContact = { ...contact, id: contacts.length + 1 };
		setContacts((prevContact) => [...prevContact, newContact]);
	};

	const removeContact = (id: number) => {
		setContacts((prevContact) => {
			const updatedContacts = prevContact.filter(
				(contact) => contact.id !== id
			);
			return updatedContacts;
		});
	};

	const updateContact = (updatedContact: contactProps) => {
		setContacts((prevContact) =>
			prevContact.map((contact) =>
				contact.id === updatedContact.id ? updatedContact : contact
			)
		);
	};

	const [tasks, setTasks] = useState<taskProps[]>([
		{
			id: 1,
			title: "Complete Project Report",
			description:
				"Finalize and submit the annual project report to the management team.",
			status: 0,
			dueDate: "2024-10-15",
			priority: "High",
		},
		{
			id: 2,
			title: "Schedule Team Meeting",
			description:
				"Arrange a meeting to discuss project milestones and deadlines.",
			status: 1,
			dueDate: "2024-10-05",
			priority: "Medium",
		},
		{
			id: 3,
			title: "Update Website Content",
			description: "Revise the homepage content and add new service offerings.",
			status: 0,
			dueDate: "2024-10-10",
			priority: "Low",
		},
		{
			id: 4,
			title: "Prepare for Client Presentation",
			description:
				"Create slides and gather materials for the upcoming client meeting.",
			status: 1,
			dueDate: "2024-10-08",
			priority: "High",
		},
		{
			id: 5,
			title: "Conduct Market Research",
			description:
				"Research current market trends and prepare a summary report.",
			status: 2,
			dueDate: "2024-09-30",
			priority: "Medium",
		},
		{
			id: 6,
			title: "Clean Up Project Files",
			description:
				"Organize and archive old project files to improve workspace efficiency.",
			status: 0,
			dueDate: "2024-10-20",
			priority: "Low",
		},
		{
			id: 7,
			title: "Review Budget Proposal",
			description:
				"Analyze and provide feedback on the proposed budget for the next quarter.",
			status: 1,
			dueDate: "2024-10-12",
			priority: "High",
		},
		{
			id: 8,
			title: "Update Software",
			description:
				"Ensure all team software is updated to the latest version for security.",
			status: 2,
			dueDate: "2024-09-28",
			priority: "Medium",
		},
		{
			id: 9,
			title: "Plan Team Building Activity",
			description:
				"Organize a fun team-building event to boost morale and collaboration.",
			status: 0,
			dueDate: "2024-10-25",
			priority: "Low",
		},
		{
			id: 10,
			title: "Draft Newsletter",
			description:
				"Write and design the company newsletter for distribution next month.",
			status: 1,
			dueDate: "2024-10-30",
			priority: "Medium",
		},
	]);

	const addTask = (task: taskProps) => {
		setTasks((prevTasks) => [...prevTasks, task]);
	};

	const removeTask = (id: number) => {
		setTasks((prevTasks) => {
			const updatedTasks = prevTasks.filter((task) => task.id !== id);
			return updatedTasks;
		});
	};

	const updateTask = (updatedTask: taskProps) => {
		const updatedTasks = tasks.map((task) =>
			task.id === updatedTask.id ? updatedTask : task
		);
		setTasks(updatedTasks);
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				setUser,
				updateUser,
				contacts,
				setContacts,
				tasks,
				setTasks,
				addContact,
				removeContact,
				updateContact,
				addTask,
				removeTask,
				updateTask,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuthContext = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuthContext must be used within a AuthContextProvider");
	}
	return context;
};
