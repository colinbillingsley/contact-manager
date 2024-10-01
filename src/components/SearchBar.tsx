import React from "react";
import { Input } from "./ui/input";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SearchBar: React.FC<{
	title: string;
	className: string;
	handleSearchChange: (e: string) => void;
}> = ({ title, className, handleSearchChange }) => {
	return (
		<div className={`relative ${className}`}>
			<div className="absolute left-3 top-2 size-4 text-neutral-400">
				<FontAwesomeIcon icon={faMagnifyingGlass} />
			</div>
			<Input
				type="text"
				placeholder={title}
				className="rounded-full pl-9 text-sm bg-white"
				onChange={(e) => handleSearchChange(e.target.value)}
			/>
		</div>
	);
};

export default SearchBar;
