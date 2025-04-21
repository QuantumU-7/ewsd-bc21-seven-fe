import { TableCell, TableRow } from "@/components/ui/table";
import CommonTable from "@/components/shared/common/Table";
import CommonPagination from "@/components/shared/common/Pagination";
const MostUsedBrowsersTable = ({ browsers, loading, pagination, handlePageChange }) => {

  const tableBody = (
    <>
      {browsers.map((browser,index) => (
        <TableRow key={index} className="border-b">
          <TableCell>{browser.browser_name}</TableCell>
          <TableCell>{browser.usage_count}</TableCell>
          <TableCell>{browser.usage_percentage}</TableCell>
        </TableRow>
      ))}
    </>
  );

  return (
    <>
      <CommonTable
        columns={["Name", "Count","Percentage ( % )"]}
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

export default MostUsedBrowsersTable;
