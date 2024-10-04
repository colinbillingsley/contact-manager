"use client";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import React, { useState } from "react";
import { taskProps } from "@/types";
import { toast } from "sonner";

const DeleteTask: React.FC<{
	task: taskProps;
	open: boolean;
	onClose: () => void;
	onConfirm: () => void;
}> = ({ task, open, onClose, onConfirm }) => {
	const [isDialogOpen, setIsDialogOpen] = useState(open);

	const handleDelete = () => {
		toast.success(`${task.title} has been deleted`, {});
		setIsDialogOpen(false);
		onConfirm();
	};

	const handleCancel = () => {
		setIsDialogOpen(false);
		onClose();
	};

	return (
		<AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						Are you sure you want to delete {task.title} from your tasks?
					</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently delete this task
						from your account.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
					<AlertDialogAction
						className="bg-red-500 hover:bg-red-600"
						onClick={handleDelete}
					>
						Delete
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default DeleteTask;
