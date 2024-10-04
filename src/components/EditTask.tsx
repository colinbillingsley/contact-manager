"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { taskProps } from "@/types";
import { toast } from "sonner";
import {
	faChevronDown,
	faGripLines,
	faChevronUp,
	faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { useAuthContext } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
} from "@radix-ui/react-popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

const EditTask: React.FC<{
	task: taskProps;
	onClose: () => void;
	open: boolean;
}> = ({ task, onClose, open }) => {
	const { updateTask } = useAuthContext();
	const [isDialogOpen, setIsDialogOpen] = useState<boolean>(open);
	const [date, setDate] = useState<Date | undefined>(new Date(task.dueDate));
	const [titleState, setTitleState] = useState<string>(task.title);
	const [descriptionState, setDescriptionState] = useState<string>(
		task.description
	);
	const [priorityState, setPriorityState] = useState<string>(task.priority);
	const [titleError, setTitleError] = useState(false);
	const [descError, setDescError] = useState(false);
	const [priorityError, setPriorityError] = useState(false);
	const [dateError, setDateError] = useState(false);

	const resetErrors = () => {
		setTitleError(false);
		setDescError(false);
		setPriorityError(false);
		setDateError(false);
	};

	const handleEditContact = () => {
		const title = titleState.trim();
		const description = descriptionState.trim();
		const priority = priorityState;

		if (!title || !description || !priority || !date) {
			if (!title) setTitleError(true);
			if (!description) setDescError(true);
			if (!priority) setPriorityError(true);
			if (!date) setDateError(true);

			toast.error("Please make sure all fields are filled.", {});
			return;
		}

		const updatedTask: taskProps = {
			...task,
			title: title,
			description: description,
			priority: priority,
			dueDate: date.toISOString(),
		};

		updateTask(updatedTask);
		toast.success(`Task "${task.title}" was edited`, {});

		// reset all fields
		setIsDialogOpen(false);
		setDate(undefined);
		setTitleState("");
		setDescriptionState("");
		setPriorityState("");
		onClose();
	};

	const handleCancel = () => {
		resetErrors();
		setIsDialogOpen(false);
		setDate(undefined);
		setTitleState("");
		setDescriptionState("");
		setPriorityState("");
		onClose();
	};

	const handleTitleChange = (value: string) => {
		setTitleState(value);
		setTitleError(false);
	};

	return (
		<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
			<DialogContent className="sm:max-w-[75%]">
				<DialogHeader>
					<DialogTitle>Edit Task</DialogTitle>
					<DialogDescription>
						Fill in the fields to edit the task. Click save changes when you're
						done to save the edits.
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
							defaultValue={task.title}
							onChange={(e) => handleTitleChange(e.target.value)}
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
							defaultValue={task.description}
							onChange={(e) => {
								setDescriptionState(e.target.value);
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
								setPriorityState(value), setPriorityError(false)
							)}
							defaultValue={task.priority}
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
						<Popover>
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
									onSelect={setDate}
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
					<Button type="submit" onClick={handleEditContact}>
						Save Changes
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default EditTask;
