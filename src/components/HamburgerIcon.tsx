"use client";
import React from "react";
import { useState } from "react";

const HamburgerIcon = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<button
			className={`md:hidden bg-transparent p-2 flex flex-col gap-1 items-center justify-center rounded-lg ${
				isMenuOpen
					? "outline outline-offset-4 outline-sky-500 dark:outline-white"
					: ""
			}`}
			onClick={() => setIsMenuOpen(!isMenuOpen)}
		>
			<div
				className={`h-[1px] bg-black dark:bg-white w-6 transition duration-[500ms] ${
					isMenuOpen ? " translate-y-[5px] rotate-45" : ""
				}`}
			></div>
			<div
				className={`h-[1px] bg-black dark:bg-white w-6 transition duration-[500ms] ${
					isMenuOpen ? "opacity-0" : "opacity-100"
				}`}
			></div>
			<div
				className={`h-[1px] bg-black dark:bg-white h- w-6 transition duration-[500ms] ${
					isMenuOpen ? "-translate-y-[5px] rotate-[315deg]" : ""
				}`}
			></div>
		</button>
	);
};

export default HamburgerIcon;
