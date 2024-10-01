"use client";
import { useAuthContext } from "@/context/AuthContext";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
	const { user } = useAuthContext();
	const [userName, setUserName] = useState<string>(user.name);

	useEffect(() => {
		setUserName(user.name);
	}, [user]);

	return (
		<main className="w-full h-full flex flex-col items-start justify-center py-4 px-4">
			<h1 className="text-5xl sm:text-7xl md:text-8xl font-bold text-blue-600 mb-4 max-w-[25ch]">
				Welcome to the Contact Manager!
			</h1>
			<p className="text-lg text-gray-700 mb-2">
				Easily manage your contacts and stay organized!
			</p>
			<div className="text-md text-gray-500 mb-4">
				<p className="mb-1">Get started by adding your first contact.</p>
				<p>
					And don&apos;t forget to create your tasks to keep track of what needs
					to be done!
				</p>
			</div>
			<button className="px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-500 transition">
				<Link href={"/contacts"}>Start Managing Contacts</Link>
			</button>
		</main>
	);
}
