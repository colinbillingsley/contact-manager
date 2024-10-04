"use client";
import React, { useEffect, useState } from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faFilter,
	faFilterCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Checkbox } from "./ui/checkbox";

const TaskFilters: React.FC<{
	setAppliedFilters: (filters: string[]) => void;
}> = ({ setAppliedFilters }) => {
	const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

	const filterOptions = [
		{
			label: "Status",
			filters: [
				{ value: "0", label: "To Do" },
				{ value: "1", label: "In Progress" },
				{ value: "2", label: "Done" },
			],
		},
		{
			label: "Priority",
			filters: [
				{ value: "Low", label: "Low" },
				{ value: "Medium", label: "Medium" },
				{ value: "High", label: "High" },
			],
		},
	];

	const handleSelectFilter = (value: string, event: React.MouseEvent) => {
		event.preventDefault();
		setSelectedFilters(
			(prev) =>
				prev.includes(value)
					? prev.filter((filter) => filter !== value) // Remove if already selected
					: [...prev, value] // Add if not selected
		);
	};

	const handleClearFilters = () => {
		setSelectedFilters([]);
	};

	useEffect(() => {
		setAppliedFilters(selectedFilters);
	}, [selectedFilters]);

	return (
		<div>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant={"ghost"} className="text-primary hover:text-primary">
						<FontAwesomeIcon icon={faFilter} />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className="w-fit">
					{filterOptions.map((item) => (
						<div>
							<DropdownMenuLabel>{item.label}</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuGroup>
								{item.filters.map((filter) => (
									<DropdownMenuItem
										key={filter.value}
										onClick={(event) => handleSelectFilter(filter.value, event)} // Pass the event
										className="flex items-center gap-2 py-3 px-4 hover:cursor-pointer"
									>
										<Checkbox
											id={filter.value}
											checked={selectedFilters.includes(filter.value)}
										/>
										<label
											htmlFor={filter.value}
											className="text-sm font-medium hover:cursor-pointer"
										>
											{filter.label}
										</label>
									</DropdownMenuItem>
								))}
							</DropdownMenuGroup>
						</div>
					))}
				</DropdownMenuContent>
			</DropdownMenu>
			<Button variant={"ghost"} className="text-primary hover:text-primary">
				<FontAwesomeIcon
					icon={faFilterCircleXmark}
					onClick={() => {
						handleClearFilters();
					}}
				/>
			</Button>
		</div>
	);
};

export default TaskFilters;
