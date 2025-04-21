import { useRouter } from "next/navigation";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Ellipsis } from "lucide-react";
import { ConfirmationBox } from "@/components/shared/common/Dialog/ConfirmationBox";
import { TableCell, TableRow } from "@/components/ui/table";
import CommonTable from "@/components/shared/common/Table";
import CommonPagination from "@/components/shared/common/Pagination";
import { useState } from "react";
import { deleteUserById } from "@/services/userManagementService";
import { toast } from "sonner";

const MostActiveUsersTable = ({ users, loading, pagination, handlePageChange }) => {
  const [openConfirmBox, setOpenConfirmBox] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const router = useRouter();

  // const handleEdit = (userId) => {
  //   router.push(`/admin/users/${userId}`);
  // };

  // const handleDelete = async (id) => {
  //   try {
  //      await deleteUserById(id);
  //      toast.success("User deleted successfully");
  //     // After successful deletion, refresh the current page
  //     handlePageChange(pagination.currentPage);
  //   } catch (error) {
  //     toast.error("Error deleting user:", error);
  //   }
  // };
 
  const tableBody = (
    <>
      {users.map((user) => (
        <TableRow key={user.user.id} className="border-b">
          <TableCell>{user.user.username}</TableCell>
          <TableCell>{user.user.role.name}</TableCell>
          <TableCell>{user.user.email}</TableCell>
          <TableCell>{user.user.department.name}</TableCell>
          <TableCell>{user.user.role.name}</TableCell>
          {/* <TableCell>
            <Popover>
              <PopoverTrigger asChild>
                <div className="cursor-pointer flex justify-end">
                  <Ellipsis className="text-gray-500" />
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-[110px] rounded-xl p-0 flex flex-col text-center">
                <div className="border-t"></div>
                <p
                  className="text-sm p-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleEdit(user.user.id)}
                >
                  Edit
                </p>
                <div className="border-t"></div>
                <p
                  className="text-sm p-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    setDeleteId(user.user.id);
                    setOpenConfirmBox(true);
                  }}
                >
                  Delete
                </p>
              </PopoverContent>
            </Popover>
          </TableCell> */}
        </TableRow>
      ))}
    </>
  );

  return (
    <>
      <CommonTable
        columns={["Name", "User Role", "Email", "Department", "Role"]}
        loading={loading}
        tableBody={tableBody}
      />
      {/** Pagination */}
      {pagination.totalPages > 0 && (
        <div className="flex w-full mt-3">
          <CommonPagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
            position="end"
          />
        </div>
      )}
      {/* <ConfirmationBox
        title="Delete User"
        description="Are you sure you want to delete this user?"
        onConfirm={() => {
          if (deleteId) {
            handleDelete(deleteId);
            setDeleteId(null);
            setOpenConfirmBox(false);
          }
        }}
        onCancel={() => setOpenConfirmBox(false)}
        isOpen={openConfirmBox}
        setIsOpen={setOpenConfirmBox}
      /> */}
    </>
  );
};

export default MostActiveUsersTable;
