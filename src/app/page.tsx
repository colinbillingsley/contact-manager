import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
	return (
		<main className="w-full h-full py-4 px-4">
			<div className="flex flex-col items-center justify-center w-full">
				<h1 className="text-5xl sm:text-7xl md:text-8xl font-bold text-primary mb-4 max-w-[25ch] text-center">
					Welcome to the Contact Manager!
				</h1>
				<p className="text-lg text-gray-700 mb-2 text-center">
					Easily manage your contacts and stay organized!
				</p>
				<div className="text-md text-gray-500 mb-4 text-center">
					<p className="mb-1">Get started by adding your first contact.</p>
					<p>
						And don&apos;t forget to create your tasks to keep track of what
						needs to be done!
					</p>
				</div>
				<Button>
					<Link href={"/contacts"}>Start Managing Contacts</Link>
				</Button>
			</div>
		</main>
	);
}
