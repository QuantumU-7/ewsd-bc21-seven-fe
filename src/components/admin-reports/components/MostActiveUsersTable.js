import { TableCell, TableRow } from "@/components/ui/table";
import CommonTable from "@/components/shared/common/Table";
import CommonPagination from "@/components/shared/common/Pagination";
import { USER_ROLES } from "@/constants/common";
const MostActiveUsersTable = ({ users, loading, pagination, handlePageChange }) => {

  const tableBody = (
    <>
      {users.map((user) => (
        <TableRow key={user.user.id} className="border-b">

          <TableCell>{user.user.username}</TableCell>
          <TableCell>{USER_ROLES.find((u) => u.id === user.user.role.id)?.name}</TableCell>
          <TableCell>{user.user.email}</TableCell>
          <TableCell>{user.user.department.name}</TableCell>
          {/* <TableCell>{user.user.role.name}</TableCell> */}
        </TableRow>
      ))}
    </>
  );

  return (
    <>
      <CommonTable
        columns={["Name", "User Role", "Email", "Department"]}
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
    </>
  );
};

export default MostActiveUsersTable;
