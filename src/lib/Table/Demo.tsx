import { Fragment } from "react"
import MoaTable from ".";
import MoaTableHead from "../TableHead";
import MoaTableBody from "../TableBody";
import MoaTableRow from "../TableRow";
import MoaTableCell from "../TableCell";
import MoaTypography from "../Typography";
import TableContainer from "@mui/material/TableContainer";
import MoaPanel from "../Panel";

function TableDemo() {
	return (
		<MoaPanel>
			<MoaTable>
				<MoaTableHead>
					<MoaTableRow>
						<MoaTableCell>
							<MoaTypography>head 1</MoaTypography>
						</MoaTableCell>
						<MoaTableCell>
							<MoaTypography>head 2</MoaTypography>
						</MoaTableCell>
					</MoaTableRow>
				</MoaTableHead>
				<MoaTableBody>
					<MoaTableRow>
						<MoaTableCell>
							<MoaTypography>body 1</MoaTypography>
						</MoaTableCell>
						<MoaTableCell>
							<MoaTypography>body 2</MoaTypography>
						</MoaTableCell>
					</MoaTableRow>
				</MoaTableBody>
			</MoaTable>
		</MoaPanel>
	)
}

export default TableDemo;