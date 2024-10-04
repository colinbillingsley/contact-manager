"use client";
import {
	faChevronDown,
	faChevronUp,
	faCircleExclamation,
	faGripLines,
	faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import React, { useRef, useState } from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { taskProps } from "@/types";
import { useAuthContext } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
} from "@radix-ui/react-popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { SelectSingleEventHandler } from "react-day-picker";

const AddTask = () => {
	const { addTask, tasks } = useAuthContext();

	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [date, setDate] = useState<Date | undefined>(undefined);
	const titleRef = useRef<HTMLInputElement>(null);
	const descriptionRef = useRef<HTMLInputElement>(null);
	const priorityRef = useRef<string>("");
	const [titleError, setTitleError] = useState(false);
	const [descError, setDescError] = useState(false);
	const [priorityError, setPriorityError] = useState(false);
	const [dateError, setDateError] = useState(false);
	const [isPopoverOpen, setIsPopoverOpen] = useState(false);

	const resetErrors = () => {
		setTitleError(false);
		setDescError(false);
		setPriorityError(false);
		setDateError(false);
	};

	const handleAddTask = () => {
		const title = titleRef.current?.value.trim();
		const description = descriptionRef.current?.value.trim();
		const priority = priorityRef.current;

		if (!title || !description || !priority || !date) {
			if (!title) setTitleError(true);
			if (!description) setDescError(true);
			if (!priority) setPriorityError(true);
			if (!date) setDateError(true);

			toast.error("Please fill in all fields.", {});
			return;
		}

		const newTask: taskProps = {
			id: tasks.length + 1,
			title,
			priority,
			description,
			status: 0,
			dueDate: date.toISOString(),
		};

		// Close the dialog
		addTask(newTask);
		toast.success(`Task "${titleRef.current?.value}" has been created`, {});

		// reset all fields
		setIsDialogOpen(false);
		setDate(undefined);
		if (titleRef.current) titleRef.current.value = "";
		if (descriptionRef.current) descriptionRef.current.value = "";
		priorityRef.current = "";
	};

	const handleCancel = () => {
		setIsDialogOpen(false);
		resetErrors();
		setDate(undefined);
		if (titleRef.current) titleRef.current.value = "";
		if (descriptionRef.current) descriptionRef.current.value = "";
		priorityRef.current = "";
	};

	const handleDateSelect: SelectSingleEventHandler = (date) => {
		setDate(date);
		setIsPopoverOpen(false);
	};

	return (
		<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
			<DialogTrigger asChild>
				<Button variant={"outline"}>
					<span className="hidden sm:block">Add Task</span>
					<FontAwesomeIcon icon={faPlus} className="sm:ml-2" />
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[75%]">
				<DialogHeader>
					<DialogTitle>Create Task</DialogTitle>
					<DialogDescription>
						Fill in the fields for your desired task. Click create when
						you&apos;re done to save the task.
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="title" className="text-right">
							{titleError ? (
								<div className="text-red-500 flex items-center justify-end gap-2">
									<span>Title</span>
									<FontAwesomeIcon icon={faCircleExclamation} />
								</div>
							) : (
								<span>Title</span>
							)}
						</Label>
						<Input
							id="title"
							placeholder="Enter title"
							className={`col-span-3 ${
								titleError ? "border-red-500" : "border-gray-200"
							}`}
							ref={titleRef}
							onChange={() => {
								setTitleError(false);
							}}
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="description" className="text-right">
							{descError ? (
								<div className="text-red-500 flex items-center justify-end gap-2">
									<span>Description</span>
									<FontAwesomeIcon icon={faCircleExclamation} />
								</div>
							) : (
								<span>Description</span>
							)}
						</Label>
						<Input
							id="description"
							placeholder="Enter description"
							className={`col-span-3 ${
								descError ? "border-red-500" : "border-gray-200"
							}`}
							ref={descriptionRef}
							onChange={() => {
								setDescError(false);
							}}
						/>
					</div>

					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="priority" className="text-right">
							{priorityError ? (
								<div className="text-red-500 flex items-center justify-end gap-2">
									<span>Priority</span>
									<FontAwesomeIcon icon={faCircleExclamation} />
								</div>
							) : (
								<span>Priority</span>
							)}
						</Label>
						<Select
							onValueChange={(value) => (
								(priorityRef.current = value), setPriorityError(false)
							)}
						>
							<SelectTrigger
								className={`col-span-3 w-[180px] ${
									priorityError ? "border-red-500" : "border-gray-200"
								}`}
							>
								<SelectValue placeholder="Select a Priority" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectLabel>Priority</SelectLabel>
									<SelectItem value="Low">
										Low{" "}
										<FontAwesomeIcon
											icon={faChevronDown}
											className="ml-1 text-primary"
										/>
									</SelectItem>
									<SelectItem value="Medium">
										Medium{" "}
										<FontAwesomeIcon
											icon={faGripLines}
											className="ml-1 text-yellow-400"
										/>
									</SelectItem>
									<SelectItem value="High">
										High{" "}
										<FontAwesomeIcon
											icon={faChevronUp}
											className="ml-1 text-red-500"
										/>
									</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>

					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="dueDate" className="text-right">
							{dateError ? (
								<div className="text-red-500 flex items-center justify-end gap-2">
									<span>Date</span>
									<FontAwesomeIcon icon={faCircleExclamation} />
								</div>
							) : (
								<span>Date</span>
							)}
						</Label>
						<Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
							<PopoverTrigger asChild>
								<Button
									variant={"outline"}
									className={cn(
										`w-[280px] justify-start text-left font-normal ${
											dateError ? "border-red-500" : "border-gray-200"
										} ${!date ? "text-muted-foreground" : "text-foreground"}}`
									)}
								>
									<CalendarIcon className="mr-2 h-4 w-4" />
									{date ? format(date, "PPP") : <span>Pick a date</span>}
								</Button>
							</PopoverTrigger>
							<PopoverContent className="w-auto p-0">
								<Calendar
									mode="single"
									selected={date}
									onSelect={handleDateSelect}
									onDayClick={() => {
										setDateError(false);
									}}
									initialFocus
									className="bg-white rounded-md shadow-md mb-2"
								/>
							</PopoverContent>
						</Popover>
					</div>
				</div>
				<DialogFooter className="flex sm:flex-row flex-col-reverse gap-2 justify-end ">
					<Button variant={"outline"} onClick={handleCancel}>
						Cancel
					</Button>
					<Button type="submit" onClick={handleAddTask}>
						Create
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default AddTask;
