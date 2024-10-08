import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { AuthContextProvider } from "@/context/AuthContext";
import { Toaster } from "@/components/ui/sonner";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<AuthContextProvider>
			<html lang="en">
				<body
					className={`${geistSans.variable} ${geistMono.variable} antialiased h-full w-full text-black dark:text-white bg-white`}
				>
					<Navbar />
					{children}
					<Toaster
						toastOptions={{
							classNames: {
								error: "text-red-800 border-red-500 bg-[#ffecec]",
								success: "text-green-800 border-green-400 bg-[#ecfff0]",
								warning: "text-yellow-400",
								info: "bg-blue-400",
							},
						}}
					/>
				</body>
			</html>
		</AuthContextProvider>
	);
}
