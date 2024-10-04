import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { contactProps } from "@/types";
import { toast } from "sonner";
import { useAuthContext } from "@/context/AuthContext";

interface DeleteContactProps {
	contact: contactProps;
	setContact: (contact: contactProps | null) => void;
	setIsOpen: (state: boolean) => void;
}

const DeleteContact: React.FC<DeleteContactProps> = ({
	contact,
	setContact,
	setIsOpen,
}) => {
	const { removeContact } = useAuthContext();
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const handleDelete = () => {
		removeContact(contact.id);
		toast.success(`${contact.name} has been deleted`, {});
		setIsDialogOpen(false);
		setIsOpen(false);
		setContact(null);
	};

	const handleCancel = () => {
		setIsDialogOpen(false);
	};
	return (
		<AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
			<AlertDialogTrigger asChild>
				<Button variant="outline" className="text-blue-600 hover:text-blue-600">
					Delete
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						Are you sure you want to delete {contact.name} from your contacts?
					</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently delete this
						contact from your account.
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

export default DeleteContact;
