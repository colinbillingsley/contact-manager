import Link from "next/link";
import React from "react";

import { navLinkItemProps } from "@/types";
import { usePathname } from "next/navigation";

const NavLinkItem: React.FC<navLinkItemProps> = ({ href, title }) => {
	const pathname = usePathname();
	const isActive: (path: string) => boolean = (path) => pathname === path;

	return (
		<Link
			href={href}
			className={`${
				isActive(href) ? "font-bold text-primary bg-primary/5" : "text-gray-500"
			} py-2 px-2 sm:px-4 hover:text-primary hover:bg-primary/5 transition-colors duration-300 ease-in-out rounded-md`}
			data-
		>
			<span>{title}</span>
		</Link>
	);
};

export default NavLinkItem;
