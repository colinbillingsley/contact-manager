"use client";
import React, { useEffect, useRef, useState } from "react";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { taskProps } from "@/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faArrowDown,
	faArrowUp,
	faChevronDown,
	faChevronUp,
	faEllipsisVertical,
	faGripLines,
} from "@fortawesome/free-solid-svg-icons";
import SearchBar from "./SearchBar";
import AddTask from "./AddTask";
import { format } from "date-fns";
import { Button } from "./ui/button";
import DeleteTask from "./DeleteTask";
import { useAuthContext } from "@/context/AuthContext";
import EditTask from "./EditTask";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import TaskFilters from "./TaskFilters";

const TaskTable: React.FC<{ tasks: taskProps[] }> = ({ tasks }) => {
	const { removeTask, updateTask } = useAuthContext();

	const [taskToDelete, setTaskToDelete] = useState<taskProps | null>(null);
	const [taskToEdit, setTaskToEdit] = useState<taskProps | null>(null);
	const [sortedTasks, setSortedTasks] = useState<taskProps[]>(tasks);
	const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
	const [searchbar, setSearchbar] = useState<string>("");
	const statusRef = useRef<string>("");
	const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
	const [appliedFilters, setAppliedFilters] = useState<string[]>([]);

	const maxDescriptionLength = 25;

	const handleSearchChange = (input: string) => {
		setSearchbar(input);
	};

	// add elipses to a desciption if it exceeds the max character length
	const truncateDescription = (
		description: string,
		maxLength: number
	): string => {
		if (description.length <= maxLength) return description;
		return `${description.slice(0, maxLength)}...`;
	};

	// get the status number and return string description
	const desrcibeStatus = (status: number) => {
		switch (status) {
			case 0:
				return "todo";
			case 1:
				return "inProgress";
			case 2:
				return "done";
			default:
				return "Unknown";
		}
	};

	// get priority and return icon
	const priorityToIcon = (priority: string) => {
		switch (priority) {
			case "Low":
				return (
					<FontAwesomeIcon icon={faChevronDown} className="text-primary" />
				);
			case "Medium":
				return (
					<FontAwesomeIcon icon={faGripLines} className="text-yellow-400" />
				);
			case "High":
				return <FontAwesomeIcon icon={faChevronUp} className="text-red-500" />;
			default:
				return "Unknown";
		}
	};

	// format dates to MMM dd, yyyy
	const formattedDate = (dateString: string): string => {
		const date = new Date(dateString);

		// Check if the date is valid
		if (isNaN(date.getTime())) {
			return "Invalid Date"; // Return a placeholder for invalid dates
		}

		return format(date, "MMM dd, yyyy");
	};

	const handleDeleteTask = (task: taskProps) => {
		setTaskToDelete(task);
	};

	const handleDeleteTaskClose = () => {
		setTaskToDelete(null);
	};

	const handleConfirmDeleteTask = () => {
		if (taskToDelete) {
			removeTask(taskToDelete.id); // Call removeTask with the task ID
		}
		setTaskToDelete(null); // Close the delete confirmation
	};

	const handleEditTask = (task: taskProps) => {
		setTaskToEdit(task);
	};

	const handleEditTaskClose = () => {
		setTaskToEdit(null);
	};

	// sort tasks by date (ascending or descending)
	const handleSortByDate = () => {
		const sortedTasks = tasks.slice().sort((a, b) => {
			const dateA = new Date(a.dueDate);
			const dateB = new Date(b.dueDate);
			if (sortOrder === "asc") {
				return dateA.getTime() - dateB.getTime();
			} else {
				return dateB.getTime() - dateA.getTime();
			}
		});
		setSortedTasks(sortedTasks);
	};

	const determineStatus = (status: string): number => {
		switch (status) {
			case "todo":
				return 0;
			case "inProgress":
				return 1;
			case "done":
				return 2;
			default:
				return 0;
		}
	};

	const translateStatus = (status: number): string => {
		switch (status) {
			case 0:
				return "To Do";
			case 1:
				return "In Progress";
			case 2:
				return "Done";
			default:
				return "Uknown";
		}
	};

	const handleStatusChange = (task: taskProps) => {
		const newTask: taskProps = {
			...task,
			status: determineStatus(statusRef.current),
		};
		updateTask(newTask);
	};

	const filteredTasks: taskProps[] = sortedTasks.filter((task) => {
		if (!task.title.toLowerCase().includes(searchbar.toLowerCase()))
			return false;

		// Check for applied filters
		if (appliedFilters.length > 0) {
			const statusFilter = appliedFilters.includes(task.status.toString());
			const priorityFilter = appliedFilters.includes(task.priority);

			// check and see if the filters has both a status and priority filter selected
			if (
				appliedFilters.some((filter) => ["0", "1", "2"].includes(filter)) &&
				appliedFilters.some((filter) =>
					["Low", "Medium", "High"].includes(filter)
				)
			) {
				return statusFilter && priorityFilter; // both a status and priority are selected, return tasks that match both
			} else {
				return statusFilter || priorityFilter; // only a status or priority filter is selected, return tasks that match either
			}
		}
		return true; // No filters applied
	});

	useEffect(() => {
		handleSortByDate();
	}, [tasks]);

	useEffect(() => {
		handleSortByDate();
	}, [sortOrder]);

	useEffect(() => {}, [searchbar]);

	return (
		<div className="w-full">
			<div className="flex items-center justify-between bg-gray-50 px-4 py-5 border-b border-gray-200 rounded-t-md">
				<h2 className="font-medium">Task List</h2>
				<div className="flex items-center gap-2">
					<SearchBar
						title="Search for task by title"
						handleSearchChange={handleSearchChange}
						className="w-[90px] sm:w-fit"
					/>
					<AddTask />
					<TaskFilters setAppliedFilters={setAppliedFilters} />
				</div>
			</div>
			<Table className="shadow-md text-xs md:text-sm">
				<TableCaption>A list of your tasks</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className="">Title</TableHead>
						<TableHead>Description</TableHead>
						<TableHead>Status</TableHead>
						<TableHead className="flex items-center text-nowrap gap-1">
							Due Date
							<Button
								variant="ghost"
								className="p-2 h-fit"
								onClick={() => {
									sortOrder === "asc"
										? setSortOrder("desc")
										: setSortOrder("asc");
								}}
							>
								{sortOrder === "asc" ? (
									<FontAwesomeIcon icon={faArrowUp} />
								) : (
									<FontAwesomeIcon icon={faArrowDown} />
								)}
							</Button>
						</TableHead>
						<TableHead className="">Priority</TableHead>
						<TableHead></TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{filteredTasks.length > 0 ? (
						filteredTasks.map((task) => (
							<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
								<DialogTrigger asChild>
									<TableRow key={task.id}>
										<TableCell className="font-medium text-nowrap">
											{task.title}
										</TableCell>
										<TableCell>
											{truncateDescription(
												task.description,
												maxDescriptionLength
											)}
										</TableCell>
										<TableCell className="">
											<Select
												onValueChange={(value) => {
													statusRef.current = value;
													handleStatusChange(task);
												}}
												defaultValue={desrcibeStatus(task.status)}
											>
												<SelectTrigger id="status" className="w-fit">
													<SelectValue
														placeholder={desrcibeStatus(task.status)}
													/>
												</SelectTrigger>
												<SelectContent position="popper">
													<SelectItem value="todo">
														<span className="bg-gray-400/15 p-1 rounded-lg text-nowrap">
															To Do
														</span>
													</SelectItem>
													<SelectItem value="inProgress">
														<span className="bg-primary/15 p-1 rounded-lg text-nowrap">
															In Progress
														</span>
													</SelectItem>
													<SelectItem value="done">
														<span className="bg-green-300/25 p-1 rounded-lg text-nowrap">
															Done
														</span>
													</SelectItem>
												</SelectContent>
											</Select>
										</TableCell>
										<TableCell className="text-nowrap">
											{formattedDate(task.dueDate)}
										</TableCell>
										<TableCell>{priorityToIcon(task.priority)}</TableCell>
										<TableCell>
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button variant={"ghost"}>
														<FontAwesomeIcon icon={faEllipsisVertical} />
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align="end" className="w-fit">
													<DropdownMenuItem
														onClick={(e) => {
															e.stopPropagation(); // Prevent the click event from propagating
															handleEditTask(task);
														}}
													>
														Edit Task
													</DropdownMenuItem>
													<DropdownMenuItem
														onClick={() => handleDeleteTask(task)}
													>
														Delete Task
													</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										</TableCell>
									</TableRow>
								</DialogTrigger>
								<DialogContent className="max-w-lg">
									<DialogHeader>
										<DialogTitle className="text-left">
											{task.title}
										</DialogTitle>
										<div className="w-full border-b-2 border-gray-200 py-1"></div>
									</DialogHeader>
									<div className="flex flex-col items-start gap-4 w-full">
										<div className="flex flex-col gap-2">
											<h2 className="font-bold">Description</h2>
											<span>{task.description}</span>
										</div>

										<div className="flex flex-col gap-2">
											<h2 className="font-bold">Status</h2>
											<span>{translateStatus(task.status)}</span>
										</div>

										<div className="flex flex-col gap-2">
											<h2 className="font-bold">Priority</h2>
											<div className="flex items-center gap-2">
												<span>{task.priority}</span>
												{priorityToIcon(task.priority)}
											</div>
										</div>

										<div className="flex flex-col gap-2">
											<h2 className="font-bold">Due Date</h2>
											<span>{format(task.dueDate, "MMM dd, yyyy")}</span>
										</div>
									</div>
								</DialogContent>
							</Dialog>
						))
					) : (
						<TableRow className="">
							<TableCell colSpan={6} className="">
								<div className="text-center text-gray-400">
									<span>No Tasks Found.</span>
								</div>
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
			{taskToDelete && (
				<DeleteTask
					task={taskToDelete}
					open={true}
					onClose={handleDeleteTaskClose}
					onConfirm={handleConfirmDeleteTask}
				/>
			)}
			{taskToEdit && (
				<EditTask
					task={taskToEdit}
					onClose={handleEditTaskClose}
					open={true}
					handleSortByDate={handleSortByDate}
				/>
			)}
		</div>
	);
};

export default TaskTable;
