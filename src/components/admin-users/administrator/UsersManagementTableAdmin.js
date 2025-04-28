"use client";
import CommonPagination from "@/components/shared/common/Pagination";
import CommonTable from "@/components/shared/common/Table";
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
import { USER_ROLES } from "@/constants/common";
import { useRouter } from "next/navigation";

const filterSchema = z.object({
  department: z.string().optional(),
  keyword: z.string().optional(),
  role: z.string().optional(),
});

export const FilterForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm({ resolver: zodResolver(filterSchema) });

  const {
    fetchUsers,
    setCurrentPage,
    isFilterMode,
    setIsFilterMode,
    setDepartmentId,
    setSearchKey,
    setRoleId,
    departments,
    fetchAllDepartments,
  } = useUsers();

  const onSubmit = (data) => {
    fetchUsers(1, 10, watch("department"), data.keyword, watch("role"));
    setDepartmentId(watch("department"));
    setSearchKey(data.keyword);
    setRoleId(watch("role"));
    setIsFilterMode(true);
    setCurrentPage(1);
  };

  const handleReset = () => {
    reset();
    setIsFilterMode(false);
    fetchUsers(1);
    setDepartmentId(null);
    setSearchKey(null);
    setRoleId(null);
    setCurrentPage(1);
  };

  useEffect(() => {
    departments.length === 0 && fetchAllDepartments();
  }
  , [fetchAllDepartments]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className=" flex flex-col lg:flex-row items-end gap-4 justify-between mb-5"
    >
      <div className="flex flex-wrap gap-5">
        <div
          className={
            departments.length === 0
              ? "select-none opacity-45 pointer-events-none"
              : ""
          }
        >
          <Select
            onValueChange={(val) => {
              setValue("department", val);
            }}
            {...register("department")}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Departments">
                {departments.find(
                  (dept) => dept.id === parseInt(watch("department"))
                )?.name || "All Departments"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={0}>All Departments</SelectItem>
              {departments.map((dept) => (
                <SelectItem key={dept.id} value={dept.id}>
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
          <Select
            onValueChange={(val) => {
              setValue("role", val);
            }}
            {...register("role")}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Roles">
                {USER_ROLES.find((role) => role.id === parseInt(watch("role")))
                  ?.name || "All Roles"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={0}>All Roles</SelectItem>
              {USER_ROLES.map((role) => (
                <SelectItem key={role.id} value={role.id}>
                  {role.name}
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
      <div className="flex">
        <Button type="submit" >Filter</Button>
        {isFilterMode && (
          <Button onClick={() => handleReset()} variant="ghost" type="button">
            Clear
          </Button>
        )}
      </div>
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
    roleId,
    departmentId,
    searchKey,
    isFilterMode,
  } = useUsers();

  const router = useRouter();

  useEffect(() => {
    if (users.length === 0 && !isFilterMode) {
      console.log("Users fetched from start");
      fetchUsers(1);
    }
  }, [users.length, fetchUsers, isFilterMode]);

  const [openConfirmBox, setOpenConfirmBox] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleClickPagination = (page) => {
    if (isFilterMode) {
      fetchUsers(page, 10, departmentId, searchKey, roleId);
    } else {
      fetchUsers(page);
    }
    setCurrentPage(page);
  };

  const tableBody = users.map((user) => (
    <TableRow key={user.id}>
      <TableCell>{user.username}</TableCell>
      <TableCell>{user.id}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>{user.department.name}</TableCell>
      <TableCell>{user.role.name}</TableCell>
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
              onClick={() => router.push(`/admin/users/${user.id}`)}
              className="text-sm p-2 cursor-pointer hover:bg-gray-100"
            >
              Edit
            </p>
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

  return (
    <>

          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Users</h2>

            <Link href="/admin/users/new">
              <Button className="bg-primary text-white">Add User</Button>
            </Link>
          </div>

          <FilterForm />

          <CommonTable
            columns={["Name", "User ID", "Email", "Department", "Role", ""]}
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
