import { TableCell, TableRow } from "@/components/ui/table";
import CommonTable from "@/components/shared/common/Table";
const MostUsedBrowsersTable = ({ browsers, loading }) => {

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
    </>
  );
};

export default MostUsedBrowsersTable;
