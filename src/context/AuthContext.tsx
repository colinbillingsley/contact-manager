"use client";
import { AuthContextType, contactProps, taskProps, userProps } from "@/types";
import { createContext, ReactNode, useContext, useState } from "react";

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [user, setUser] = useState<userProps>({
		id: 0,
		name: "Colin Billingsley",
		email: "someemail@gmail.com",
		phone: "+1 615-123-1234",
		address: "1234 SomeKind Rd Orlando, FL, 39290",
		jobTitle: "Senior Bullshitter",
		companyName: "Company of Stuff",
		industry: "Software",
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
			name: "Jane Doe",
			email: "jane.doe@example.com",
			phone: "+1 853-235-5521",
			address: "5321 SomeKind Rd Orlando, FL, 39290",
			jobTitle: "Junior Bullshitter",
			companyName: "Company of Stuff",
			industry: "Software",
			avatarUrl: "https://github.com/shadcn.png",
		},
		{
			id: 2,
			name: "Leroy Jenkins",
			email: "leroy.jenkins@example.com",
			phone: "+1 953-542-5313",
			address: "9503 SomeKind Rd Orlando, FL, 39290",
			jobTitle: "Mid Bullshitter",
			companyName: "Company of Stuff",
			industry: "Software",
			avatarUrl: "https://github.com/shadcn.png",
		},
	]);

	const addContact = (contact: Omit<contactProps, "id">) => {
		const newContact = { ...contact, id: contacts.length };
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

	const [tasks, setTasks] = useState<taskProps[]>([]);

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
