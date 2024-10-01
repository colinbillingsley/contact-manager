"use client";
import React, { useEffect, useState } from "react";
import AddContact from "@/components/AddContact";
import SearchBar from "@/components/SearchBar";
import { faUserSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuthContext } from "@/context/AuthContext";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { contactProps } from "@/types";
import DisplayContact from "@/components/DisplayContact";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const Contacts = () => {
	const { contacts } = useAuthContext();
	const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
	const [selectedContact, setSelectedContact] = useState<contactProps | null>(
		null
	);
	const [searchbar, setSearchbar] = useState<string>("");

	const handleContactClick = (contact: contactProps) => {
		setSelectedContact(contact);
	};
	const handleSearchChange = (e: string) => {
		setSearchbar(e);
	};

	const filteredContacts: contactProps[] = contacts.filter((contact) =>
		contact.name.toLowerCase().includes(searchbar.toLowerCase())
	);

	useEffect(() => {
		// contact is selected
		if (selectedContact) {
			// set contact that is selected to newly updated contact if updated
			const [updatedContact]: contactProps[] = filteredContacts.filter(
				(contact) => contact.id === selectedContact.id
			);
			setSelectedContact(updatedContact);
		}
	}, [contacts]);

	return (
		<div className="w-full h-[calc(100vh-67px)]">
			<div className="w-full h-full flex">
				<div className="h-full w-full sm:w-fit flex flex-col items-center px-4 sm:border-r-2 border-neutral-100">
					{/* Searchbar/Filters/Add */}
					<div className="flex items-center gap-2 py-4">
						<SearchBar
							title="Search for contacts"
							className="min-w-72"
							handleSearchChange={handleSearchChange}
						/>
						<AddContact />
					</div>
					{/* Display contacts added if any */}
					<div className="w-full h-full">
						{filteredContacts.length === 0 ? (
							<div className="h-full flex flex-col items-center justify-center opacity-25">
								<div className="flex flex-col items-center justify-center gap-3">
									<FontAwesomeIcon icon={faUserSlash} className="size-10" />
									<span>No Contacts</span>
								</div>
							</div>
						) : (
							<div className="w-full">
								<div className="sm:hidden w-full flex flex-col gap-1">
									{filteredContacts.map((contact, index) => (
										<Dialog
											key={contact.id}
											open={isDialogOpen}
											onOpenChange={setIsDialogOpen}
										>
											<DialogTrigger asChild>
												<div
													key={contact.id}
													className="w-full flex items-center gap-2 px-2 py-4 hover:cursor-pointer hover:bg-neutral-50"
													onClick={() => handleContactClick(contact)}
												>
													<Avatar>
														<AvatarImage
															src={contact.avatarUrl}
															className="rounded-full size-12"
														/>
													</Avatar>
													<div className="text-xs flex flex-col gap-1">
														<span className="font-semibold text-sm">
															{contact.name}
														</span>
														<span>{`${contact.companyName}, ${contact.jobTitle}`}</span>
													</div>
												</div>
											</DialogTrigger>
											<DialogContent className="sm:hidden">
												{selectedContact && (
													<DisplayContact
														contact={selectedContact}
														setContact={setSelectedContact}
														setIsOpen={setIsDialogOpen}
													/>
												)}
											</DialogContent>
										</Dialog>
									))}
								</div>
								<div className="sm:flex w-full hidden flex-col gap-1">
									{filteredContacts.map((contact, index) => (
										<div
											key={contact.id}
											className="w-full flex items-center gap-2 px-2 py-4 hover:cursor-pointer hover:bg-neutral-50"
											onClick={() => handleContactClick(contact)}
										>
											<Avatar>
												<AvatarImage
													src={contact.avatarUrl}
													className="rounded-full size-12"
												/>
											</Avatar>
											<div className="text-xs flex flex-col gap-1">
												<span className="font-semibold text-sm">
													{contact.name}
												</span>
												<span>{`${contact.companyName}, ${contact.jobTitle}`}</span>
											</div>
										</div>
									))}
								</div>
							</div>
						)}
					</div>
				</div>
				<div className="hidden relative w-full h-full sm:flex flex-col justify-start items-center py-4">
					{selectedContact ? (
						<DisplayContact
							contact={selectedContact}
							setContact={setSelectedContact}
							setIsOpen={setIsDialogOpen}
						/>
					) : (
						<div className="w-full h-full flex justify-center items-center">
							<span className="opacity-30 text-center">
								Select a contact to display their information
							</span>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Contacts;
