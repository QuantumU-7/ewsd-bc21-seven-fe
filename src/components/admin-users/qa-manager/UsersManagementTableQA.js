"use client";
import CommonPagination from "@/components/shared/common/Pagination";
import CommonTable from "@/components/shared/common/Table";
import {Card, CardContent} from "@/components/ui/card";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {TableCell, TableRow} from "@/components/ui/table";
import {useUsers} from "@/providers/UsersContext";
import {MoreHorizontal} from "lucide-react";
import React, {useEffect} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {enableDisableUser} from "@/services/userManagementService";
import {ConfirmationBox} from "@/components/shared/common/Dialog/ConfirmationBox";

const filterSchema = z.object({
	department: z.string().nonempty("Department is required"),
	keyword: z.string().optional(),
});

const FilterForm = ({departments, onFilter}) => {
	const {
		register,
		handleSubmit,
		formState: {errors},
	} = useForm({resolver: zodResolver(filterSchema)});

	const onSubmit = (data) => {
		onFilter(data);
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className=" flex justify-between mb-5"
		>
			<div className="flex gap-5">
				<div>
					<Select {...register("department")}>
						<SelectTrigger>
							<SelectValue placeholder="Select Department" />
						</SelectTrigger>
						<SelectContent>
							{departments.map((dept) => (
								<SelectItem key={dept} value={dept}>
									{dept}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					{errors.department && (
						<p className="text-red-500">{errors.department.message}</p>
					)}
				</div>
				<div>
					<Input {...register("keyword")} placeholder="Enter keyword" />
					{errors.keyword && (
						<p className="text-red-500">{errors.keyword.message}</p>
					)}
				</div>
			</div>
			<Button type="submit">Filter</Button>
		</form>
	);
};

const UsersManagementTableQA = () => {
	const {users, loading, fetchUsers} = useUsers();

	const [isOpen, setIsOpen] = React.useState(false);
	const [selectedUser, setSelectedUser] = React.useState(null);

	useEffect(() => {
		users.length === 0 && fetchUsers();
	}, [users.length, fetchUsers]);

	const tableBody = users.map((user) => (
		<TableRow key={user.id}>
			<TableCell>{user.username}</TableCell>
			<TableCell>{user.id}</TableCell>
			<TableCell>{user.email}</TableCell>
			<TableCell>{user.department.name}</TableCell>
			<TableCell className="w-12">
				{" "}
				<Popover>
					<PopoverTrigger asChild>
						<div className="cursor-pointer">
							<MoreHorizontal className="cursor-pointer" />
						</div>
					</PopoverTrigger>
					<PopoverContent className="w-[110px] rounded-xl p-0 flex flex-col text-center">
						<p
							className="text-sm p-2 cursor-pointer hover:bg-gray-100"
							onClick={() => {
								setSelectedUser(user);
								setIsOpen(true);
							}}
						>
							{user.is_disabled ? "Unblock User" : "Block User"}
						</p>
					</PopoverContent>
				</Popover>
			</TableCell>
		</TableRow>
	));

	const handleDisableConfirm = () => {
		const {id, is_disabled} = selectedUser;
		try {
			const res = enableDisableUser(id, is_disabled);
			if (res) {
				fetchUsers();
			}
		} catch (error) {
			console.error("Error disabling user:", error);
		} finally {
			setIsOpen(false);
		}
	};

	return (
		<Card>
			<CardContent className="p-6">
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-xl font-semibold">Users</h2>
				</div>

				<FilterForm departments={["Human Resource", "IT"]} />

				<CommonTable
					columns={["Name", "User ID", "Email", "Department", ""]}
					loading={loading}
					tableBody={tableBody}
				/>
				<CommonPagination
					className="mt-5"
					position="center"
					isLoading={loading}
					totalPages={5}
				/>
			</CardContent>
			<ConfirmationBox
				title={selectedUser?.is_disabled ? "Unblock User" : "Block User"}
				message={`Are you sure you want to ${
					selectedUser?.is_disabled ? "unblock" : "block"
				} this user?`}
				onConfirm={handleDisableConfirm}
				isOpen={isOpen}
				onCancel={() => setIsOpen(false)}
				onClose={() => setIsOpen(false)}
			/>
		</Card>
	);
};

export default UsersManagementTableQA;
