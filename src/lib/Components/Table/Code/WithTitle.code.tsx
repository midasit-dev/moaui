import { Table, TableHead, TableRow, TableCell, TableBody, Typography, Stack, TextField, Panel } from "@midasit-dev/moaui"; /**${comma}*/

const ComponentsTableWithTitle = ({
	title = "Table Title Text", /**${props-separator}*/
  spacing = 2, /**${props-separator}*/
  headers = [
    'head1', 'head2', 'head3'
  ], /**${props-separator}*/
  rows = [
    [ 'Row Text', <TextField width='50px' />, <TextField width='50px' /> ],
    [ 'Row Text', <TextField width='50px' />, <TextField width='50px' /> ],
    [ 'Row Text', <TextField width='50px' />, <TextField width='50px' /> ],
  ], /**${props-separator}*/
}) => {
  return (
		<Panel width={300}>
			<Stack spacing={spacing} display='flex' justifyContent='center'>
				<Panel flexItem width="100%">
					<Typography variant="h1">{title}</Typography>
				</Panel>
				<Table padding="normal" width={300}>
					<TableHead>
						<TableRow>
							{headers.map((header, index) => <TableCell key={index}><Typography center>{header}</Typography></TableCell>)}
						</TableRow>
					</TableHead>
					<TableBody>
							{rows.map((row, index) => {
								return (
									<TableRow key={index}>
										{row.map((cell, index) => <TableCell key={index}>{cell}</TableCell>)}
									</TableRow>
								);
							})}
					</TableBody>
				</Table>
			</Stack>
		</Panel>
  );
}; /**${comma}*/

export default ComponentsTableWithTitle;
