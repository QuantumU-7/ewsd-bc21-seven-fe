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
import React, { useEffect } from "react";
import { enableDisableUser } from "@/services/userManagementService";
import { ConfirmationBox } from "@/components/shared/common/Dialog/ConfirmationBox";
import { FilterForm } from "../administrator/UsersManagementTableAdmin";
import { toast } from "sonner";

const UsersManagementTableQA = () => {
  const {
    users,
    loading,
    fetchUsers,
    totalPages,
    currentPage,
    setCurrentPage,
    isFilterMode,
    departmentId,
    searchKey,
  } = useUsers();

  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState(null);

  useEffect(() => {
    users.length === 0 && fetchUsers(currentPage, 10, null, null, 3);
  }, [users.length, fetchUsers]);

  const handlePageChange = (page) => {
    console.log({ isFilterMode });
    if (isFilterMode) {
      fetchUsers(page, 10, departmentId, searchKey, 3);
    } else {
      fetchUsers(page, 10, null, null, 3);
    }
    setCurrentPage(page);
  };

  const tableBody = users.map((user) => (
    <>
      {user.role.name !== "ADMIN" && (
        <TableRow key={user.id}>
          <TableCell>{user.username}</TableCell>
          <TableCell>{user.id}</TableCell>
          <TableCell>{user.email}</TableCell>
          <TableCell>{user.department.name}</TableCell>
          {/* <TableCell>{user.role.name}</TableCell> */}
          <TableCell>{user.isdisabled ? "Blocked" : "-"}</TableCell>
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
                  {user.isdisabled ? "Unblock User" : "Block User"}
                </p>
              </PopoverContent>
            </Popover>
          </TableCell>
        </TableRow>
      )}
    </>
  ));

  const handleDisableConfirm = () => {
    const { id, isdisabled } = selectedUser;
    try {
      const res = enableDisableUser(id, isdisabled);
      if (res) {
        fetchUsers(currentPage, 10, null, null, 3);
        toast.success('User status updated successfully');
      }
    } catch (error) {
      console.error("Error disabling user:", error);
    } finally {
      setIsOpen(false);
    }
  };

  return (
    <section className="">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Users</h2>
      </div>

      <FilterForm />

      <CommonTable
        columns={[
          "Name",
          "User ID",
          "Email",
          "Department",
          "Is Blocked",
          "",
        ]}
        loading={loading}
        tableBody={tableBody}
      />
      <CommonPagination
        className="mt-5"
        position="center"
        isLoading={loading}
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

      <ConfirmationBox
        title={selectedUser?.isdisabled ? "Unblock User" : "Block User"}
        message={`Are you sure you want to ${
          selectedUser?.isdisabled ? "unblock" : "block"
        } this user?`}
        onConfirm={handleDisableConfirm}
        isOpen={isOpen}
        onCancel={() => setIsOpen(false)}
        onClose={() => setIsOpen(false)}
      />
    </section>
  );
};

export default UsersManagementTableQA;
