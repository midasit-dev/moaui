import { Table, TableHead, TableRow, TableBody, Typography } from "@midasit-dev/moaui-components-v1"; /**${comma}*/

const ComponentsTableHeader = () => {
  return (
    <Table padding="normal">
      <TableHead>
        <TableRow>
          <Typography>Header Row</Typography>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <Typography>Body Row</Typography>
        </TableRow>
      </TableBody>
    </Table>
  );
}; /**${comma}*/

export default ComponentsTableHeader;
