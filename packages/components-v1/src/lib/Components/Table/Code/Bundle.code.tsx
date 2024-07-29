import { Table, TableHead, TableRow, TableCell, TableBody, Typography } from "@midasit-dev/moaui-components-v1"; /**${comma}*/

const ComponentsTableBundle = () => {
  return (
    <Table padding='normal'>
      <TableHead>
        <TableRow>
          <TableCell>
            <Typography>head 1</Typography>
          </TableCell>
          <TableCell>
            <Typography>head 2</Typography>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>
            <Typography>body 1</Typography>
          </TableCell>
          <TableCell>
            <Typography>body 2</Typography>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}; /**${comma}*/

export default ComponentsTableBundle;
