"use client";
import React, { useEffect, useState } from "react";
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
import { faCircleExclamation, faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuthContext } from "@/context/AuthContext";
import { toast } from "sonner";
import { userProps } from "@/types";

const EditProfile = () => {
	const { user, updateUser } = useAuthContext();
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [name, setName] = useState(user.name);
	const [email, setEmail] = useState(user.email);
	const [phone, setPhone] = useState(user.phone);
	const [address, setAddress] = useState(user.address);
	const [job, setJob] = useState(user.jobTitle);
	const [company, setCompany] = useState(user.companyName);
	const [industry, setIndustry] = useState(user.industry);
	const [bio, setBio] = useState(user.bio);
	const [nameError, setNameError] = useState(false);
	const [emailError, setEmailError] = useState(false);
	const [phoneError, setPhoneError] = useState(false);
	const [addressError, setAddressError] = useState(false);
	const [jobError, setJobError] = useState(false);
	const [companyError, setCompanyError] = useState(false);
	const [industryError, setIndustryError] = useState(false);
	const [bioError, setBioError] = useState(false);

	const resetErrors = () => {
		setNameError(false);
		setEmailError(false);
		setPhoneError(false);
		setAddressError(false);
		setJobError(false);
		setCompanyError(false);
		setIndustryError(false);
		setBioError(false);
	};

	const setErrors = () => {
		if (!name) setNameError(true);
		if (!email) setEmailError(true);
		if (!phone) setPhoneError(true);
		if (!address) setAddressError(true);
		if (!job) setJobError(true);
		if (!company) setCompanyError(true);
		if (!industry) setIndustryError(true);
		if (!bio) setBioError(true);
	};

	const onSaveChanges = () => {
		// any fields are not filled return error
		if (
			!name ||
			!email ||
			!phone ||
			!address ||
			!job ||
			!company ||
			!industry ||
			!bio
		) {
			setErrors();
			toast.error("Please make sure all fields are filled.", {});
			return;
		}

		// create updated user object
		const updatedUser: userProps = {
			...user,
			name,
			email,
			phone,
			address,
			jobTitle: job,
			companyName: company,
			industry,
			bio,
		};
		// send user object to get updated
		updateUser(updatedUser);
		// display success toast message
		toast.success(`Profile has been updated`, {});

		// reset fields
		setIsDialogOpen(false);
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

	const handleBioChange = (e: string) => {
		setBio(e);
		setBioError(false);
	};

	useEffect(() => {}, [user]);

	return (
		<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
			<DialogTrigger asChild>
				<Button>
					<FontAwesomeIcon
						icon={faPen}
						height={10}
						width={10}
						className="mr-2"
					/>
					Edit Profile
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[75%]">
				<DialogHeader>
					<DialogTitle>Edit profile</DialogTitle>
					<DialogDescription>
						Make changes to your profile here. Click save when you&apos;re done.
					</DialogDescription>
				</DialogHeader>
				<div key={user.name} className="grid grid-cols-4 items-center gap-4">
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
						defaultValue={user.name}
						className="col-span-3"
						onChange={(e) => handleNameChange(e.target.value)}
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
						defaultValue={user.email}
						className="col-span-3"
						onChange={(e) => handleEmailChange(e.target.value)}
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
						defaultValue={user.phone}
						className="col-span-3"
						onChange={(e) => handlePhoneChange(e.target.value)}
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
						defaultValue={user.address}
						className="col-span-3"
						onChange={(e) => handleAddressChange(e.target.value)}
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
						defaultValue={user.jobTitle}
						className="col-span-3"
						onChange={(e) => handleJobChange(e.target.value)}
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
						defaultValue={user.companyName}
						className="col-span-3"
						onChange={(e) => handleCompanyChange(e.target.value)}
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
						defaultValue={user.industry}
						className="col-span-3"
						onChange={(e) => handleIndustryChange(e.target.value)}
					/>

					<Label htmlFor="bio" className="text-right">
						{bioError ? (
							<div className="text-red-500 flex items-center justify-end gap-2">
								<span>Bio</span>
								<FontAwesomeIcon icon={faCircleExclamation} />
							</div>
						) : (
							<span>Bio</span>
						)}
					</Label>
					<Input
						id="bio"
						defaultValue={user.bio}
						className="col-span-3"
						onChange={(e) => handleBioChange(e.target.value)}
					/>
				</div>

				<DialogFooter className="gap-2 sm:gap-0">
					<Button variant={"outline"} onClick={onCancel}>
						Cancel
					</Button>
					<Button type="submit" onClick={onSaveChanges}>
						Save changes
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default EditProfile;
