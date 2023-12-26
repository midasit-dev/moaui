import Table from ".";
import { TableHead, TableBody, TableRow, TableCell, Typography, Panel } from "../../";

function TableDemo() {
	return (
		<Panel>
			<Table>
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
		</Panel>
	)
}

export default TableDemo;