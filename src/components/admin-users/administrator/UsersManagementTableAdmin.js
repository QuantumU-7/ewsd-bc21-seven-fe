"use client";
import CommonPagination from "@/components/shared/common/Pagination";
import CommonTable from "@/components/shared/common/Table";
import { Card, CardContent } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TableCell, TableRow } from "@/components/ui/table";
import { useUsers } from "@/providers/UsersContext";
import { MoreHorizontal } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { ConfirmationBox } from "@/components/shared/common/Dialog/ConfirmationBox";

const filterSchema = z.object({
  department: z.string().optional(),
  keyword: z.string().optional(),
});

const FilterForm = ({ departments}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: zodResolver(filterSchema) });

  const { fetchUsers, currentPage } = useUsers();
  const [selectedDepartmentId, setSelectedDepartmentId] = useState(null);

  const onSubmit = (data) => {
    fetchUsers(currentPage, 5, selectedDepartmentId, data.keyword);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className=" flex justify-between mb-5"
    >
      <div className="flex gap-5">
        <div>
          <Select
            onValueChange={(val) => {setValue("department", val)
              const id = departments.find((dept) => dept.name === val).id;
              setSelectedDepartmentId(id)
            }}
            {...register("department")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Department" />
            </SelectTrigger>
            <SelectContent>
              {departments.map((dept) => (
                <SelectItem key={dept.id} value={dept.name}>
                  {dept.name}
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

const UsersManagementTableAdmin = () => {
  const {
    users,
    loading,
    fetchUsers,
    totalPages,
    currentPage,
    setCurrentPage,
    deleteUser,
  } = useUsers();

  useEffect(() => {
    if (users.length === 0) {
      console.log("Users fetching...");
      fetchUsers(1);
    }
  }, [users.length, fetchUsers]);

  const [openConfirmBox, setOpenConfirmBox] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleClickPagination = (page) => {
    setCurrentPage(page);
    fetchUsers(page);
  };

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
            <p className="text-sm p-2 cursor-pointer hover:bg-gray-100">Edit</p>
            <span className="border-t"></span>
            <p
              onClick={() => {
                setDeleteId(user.id);
                setOpenConfirmBox(true);
              }}
              className="text-sm p-2 cursor-pointer hover:bg-gray-100"
            >
              Delete
            </p>
          </PopoverContent>
        </Popover>
      </TableCell>
    </TableRow>
  ));

  // console.log({ users });
  return (
    <>
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Users</h2>

            <Link href="/admin/users/new">
              <Button className="bg-primary text-white">Add User</Button>
            </Link>
          </div>

          <FilterForm
            departments={[
              {
                id: 1,
                name: "IT",
              },
              {
                id: 2,
                name: "HR",
              },
              {
                id: 3,
                name: "Finance",
              },]}
          />

          <CommonTable
            columns={["Name", "User ID", "Email", "Department", ""]}
            loading={loading}
            tableBody={tableBody}
          />
          <CommonPagination
            className="mt-5"
            position="center"
            isLoading={loading}
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handleClickPagination}
          />
        </CardContent>
      </Card>

      <ConfirmationBox
        title="Delete User"
        description="Are you sure you want to delete this user?"
        onConfirm={() => {
          if (deleteId) {
            deleteUser(deleteId);
            setDeleteId(null);
            setOpenConfirmBox(false);
          }
        }}
        onCancel={() => setOpenConfirmBox(false)}
        isOpen={openConfirmBox}
        setIsOpen={setOpenConfirmBox}
      />
    </>
  );
};

export default UsersManagementTableAdmin;
