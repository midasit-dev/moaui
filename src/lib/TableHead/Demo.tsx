import Table from "../Table";
import TableHead from "./";
import TableRow from "../TableRow";
import TableCell from "../TableCell";

function TableHeadDemo() {
	return (
		<Table>
			<TableHead>
				<TableRow>
					<TableCell>
						TableHead
					</TableCell>
				</TableRow>
			</TableHead>
		</Table>
	)
}

export default TableHeadDemo;