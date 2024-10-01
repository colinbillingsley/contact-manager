"use client";
import React from "react";
import NavLinkItem from "./NavLinkItem";
import { navLinks } from "@/constants";
import { faPeopleRoof } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import Link from "next/link";
import HamburgerIcon from "./HamburgerIcon";

const Navbar: React.FC = () => {
	return (
		<div className="w-full h-fit bg-white border-b border-neutral-300 px-4 py-2">
			<nav className="w-full flex items-center justify-between">
				<div className="text-blue-600">
					<FontAwesomeIcon icon={faPeopleRoof} className="size-12" />
				</div>

				{/* links in navbar */}
				<div className="flex items-center text-sm">
					{/* non-small screen */}
					<div className="flex items-center text-sm">
						{navLinks.map((link) => (
							<NavLinkItem
								key={link.title}
								href={link.href}
								icon={link.icon}
								title={link.title}
							/>
						))}
					</div>

					{/* Profile Icon with Dropdown */}
					<DropdownMenu>
						<DropdownMenuTrigger
							asChild
							className="hover:bg-gray-100 bg-transparent rounded-full p-2 transition-colors duration-300"
						>
							<Avatar className="hover:cursor-pointer">
								<AvatarImage
									src="https://github.com/shadcn.png"
									className="rounded-full size-8"
								/>
								<AvatarFallback>CN</AvatarFallback>
							</Avatar>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="w-56">
							<Link href="/profile">
								<DropdownMenuItem>Profile</DropdownMenuItem>
							</Link>

							<DropdownMenuItem>Settings</DropdownMenuItem>
							<DropdownMenuItem>Logout</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</nav>
		</div>
	);
};

export default Navbar;
