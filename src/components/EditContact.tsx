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
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { contactProps } from "@/types";
import { toast } from "sonner";
import { useAuthContext } from "@/context/AuthContext";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EditContact: React.FC<{ contact: contactProps }> = ({ contact }) => {
	const { updateContact } = useAuthContext();

	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [name, setName] = useState(contact.name);
	const [email, setEmail] = useState(contact.email);
	const [phone, setPhone] = useState(contact.phone);
	const [address, setAddress] = useState(contact.address);
	const [job, setJob] = useState(contact.jobTitle);
	const [company, setCompany] = useState(contact.companyName);
	const [industry, setIndustry] = useState(contact.industry);
	const [nameError, setNameError] = useState(false);
	const [emailError, setEmailError] = useState(false);
	const [phoneError, setPhoneError] = useState(false);
	const [addressError, setAddressError] = useState(false);
	const [jobError, setJobError] = useState(false);
	const [companyError, setCompanyError] = useState(false);
	const [industryError, setIndustryError] = useState(false);

	const resetErrors = () => {
		setNameError(false);
		setEmailError(false);
		setPhoneError(false);
		setAddressError(false);
		setJobError(false);
		setCompanyError(false);
		setIndustryError(false);
	};

	const setErrors = () => {
		if (!name) setNameError(true);
		if (!email) setEmailError(true);
		if (!phone) setPhoneError(true);
		if (!address) setAddressError(true);
		if (!job) setJobError(true);
		if (!company) setCompanyError(true);
		if (!industry) setIndustryError(true);
	};

	const handleEditContact = () => {
		if (
			!name ||
			!email ||
			!phone ||
			!address ||
			!job ||
			!company ||
			!industry
		) {
			setErrors();
			toast.error("Please make sure all fields are filled.", {});
			return;
		}

		const updatedContact: contactProps = {
			...contact,
			name,
			email,
			phone,
			address,
			jobTitle: job,
			companyName: company,
			industry,
		};

		updateContact(updatedContact);

		// Close the dialog
		setIsDialogOpen(false);
		toast.success(`${contact.name} has been edited`, {});
	};

	const onCancel = () => {
		setIsDialogOpen(false);
		resetErrors();
	};

	const handleNameChange = (e: string) => {
		setName(e);
		setNameError(false);
	};

	const handleEmailChange = (e: string) => {
		setEmail(e);
		setEmailError(false);
	};

	const handlePhoneChange = (e: string) => {
		setPhone(e);
		setPhoneError(false);
	};

	const handleAddressChange = (e: string) => {
		setAddress(e);
		setAddressError(false);
	};

	const handleJobChange = (e: string) => {
		setJob(e);
		setJobError(false);
	};

	const handleCompanyChange = (e: string) => {
		setCompany(e);
		setCompanyError(false);
	};

	const handleIndustryChange = (e: string) => {
		setIndustry(e);
		setIndustryError(false);
	};

	return (
		<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
			<DialogTrigger asChild>
				<Button
					variant="outline"
					className="text-blue-600 hover:text-blue-600"
					onClick={() => setIsDialogOpen(true)}
				>
					Edit
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[75%]">
				<DialogHeader>
					<DialogTitle>Edit Contact</DialogTitle>
					<DialogDescription>
						Make changes to the contact here. Click save when you&apos;re done.
					</DialogDescription>
				</DialogHeader>
				<div className="grid grid-cols-4 items-center gap-4">
					<Label htmlFor="name" className="text-right">
						{nameError ? (
							<div className="text-red-500 flex items-center justify-end gap-2">
								<span>Name</span>
								<FontAwesomeIcon icon={faCircleExclamation} />
							</div>
						) : (
							<span>Name</span>
						)}
					</Label>
					<Input
						id="name"
						className={`col-span-3 ${
							nameError ? "border-red-500" : "border-gray-200"
						}`}
						onChange={(e) => handleNameChange(e.target.value)}
						defaultValue={contact.name}
					/>

					<Label htmlFor="email" className="text-right">
						{emailError ? (
							<div className="text-red-500 flex items-center justify-end gap-2">
								<span>Email</span>
								<FontAwesomeIcon icon={faCircleExclamation} />
							</div>
						) : (
							<span>Email</span>
						)}
					</Label>
					<Input
						id="email"
						className={`col-span-3 ${
							emailError ? "border-red-500" : "border-gray-200"
						}`}
						onChange={(e) => handleEmailChange(e.target.value)}
						defaultValue={contact.email}
					/>

					<Label htmlFor="name" className="text-right">
						{phoneError ? (
							<div className="text-red-500 flex items-center justify-end gap-2">
								<span>Phone</span>
								<FontAwesomeIcon icon={faCircleExclamation} />
							</div>
						) : (
							<span>Phone</span>
						)}
					</Label>
					<Input
						id="phone"
						className={`col-span-3 ${
							phoneError ? "border-red-500" : "border-gray-200"
						}`}
						onChange={(e) => handlePhoneChange(e.target.value)}
						defaultValue={contact.phone}
					/>

					<Label htmlFor="address" className="text-right">
						{addressError ? (
							<div className="text-red-500 flex items-center justify-end gap-2">
								<span>Address</span>
								<FontAwesomeIcon icon={faCircleExclamation} />
							</div>
						) : (
							<span>Address</span>
						)}
					</Label>
					<Input
						id="address"
						className={`col-span-3 ${
							addressError ? "border-red-500" : "border-gray-200"
						}`}
						onChange={(e) => handleAddressChange(e.target.value)}
						defaultValue={contact.address}
					/>

					<Label htmlFor="job-title" className="text-right">
						{jobError ? (
							<div className="text-red-500 flex items-center justify-end gap-2">
								<span>Job Title</span>
								<FontAwesomeIcon icon={faCircleExclamation} />
							</div>
						) : (
							<span>Job Title</span>
						)}
					</Label>
					<Input
						id="job-title"
						className={`col-span-3 ${
							jobError ? "border-red-500" : "border-gray-200"
						}`}
						onChange={(e) => handleJobChange(e.target.value)}
						defaultValue={contact.jobTitle}
					/>

					<Label htmlFor="company" className="text-right">
						{companyError ? (
							<div className="text-red-500 flex items-center justify-end gap-2">
								<span>Company</span>
								<FontAwesomeIcon icon={faCircleExclamation} />
							</div>
						) : (
							<span>Company</span>
						)}
					</Label>
					<Input
						id="company"
						className={`col-span-3 ${
							companyError ? "border-red-500" : "border-gray-200"
						}`}
						onChange={(e) => handleCompanyChange(e.target.value)}
						defaultValue={contact.companyName}
					/>

					<Label htmlFor="industry" className="text-right">
						{industryError ? (
							<div className="text-red-500 flex items-center justify-end gap-2">
								<span>Industry</span>
								<FontAwesomeIcon icon={faCircleExclamation} />
							</div>
						) : (
							<span>Industry</span>
						)}
					</Label>
					<Input
						id="industry"
						className={`col-span-3 ${
							industryError ? "border-red-500" : "border-gray-200"
						}`}
						onChange={(e) => handleIndustryChange(e.target.value)}
						defaultValue={contact.industry}
					/>
				</div>

				<DialogFooter className="flex sm:flex-row flex-col-reverse gap-2 justify-end">
					<Button
						variant={"outline"}
						className="text-blue-600 border-blue-600 hover:bg-blue-600/15 hover:text-blue-600"
						onClick={onCancel}
					>
						Cancel
					</Button>
					<Button
						type="submit"
						className="bg-blue-600 hover:bg-blue-700"
						onClick={handleEditContact}
					>
						Save changes
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default EditContact;
