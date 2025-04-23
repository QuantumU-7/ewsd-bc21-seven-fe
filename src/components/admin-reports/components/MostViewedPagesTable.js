import { TableCell, TableRow } from "@/components/ui/table";
import CommonTable from "@/components/shared/common/Table";
const MostViewedPagesTable = ({ pages, loading }) => {

  const tableBody = (
    <>
      {pages.map((page) => (
        <TableRow key={page.page_name} className="border-b">
          <TableCell>{page.page_name}</TableCell>
          <TableCell>{page.access_count}</TableCell>
          <TableCell>{page.access_percentage}</TableCell>
        </TableRow>
      ))}
    </>
  );

  return (
    <>
      <CommonTable
        columns={["Page Name", "View Count", "Percentage ( % )"]}
        loading={loading}
        tableBody={tableBody}
      />
    </>
  );
};

export default MostViewedPagesTable;
