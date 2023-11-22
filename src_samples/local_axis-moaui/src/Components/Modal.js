import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import * as Buttons from "./Buttons.js";

import Dialog from "@mui/material/Dialog";
import MoaPanel from "@midasit-dev/moaui/Panel";
import MoaStack from "@midasit-dev/moaui/Stack";
import MoaButton from "@midasit-dev/moaui/Button";
import MoaTextField from "@midasit-dev/moaui/TextField";

import HelpImage from "../svg/help.svg";

export { NodeImportDialog, HelpDialog };

function NodeImportDialog(openDialog, onCloseDialog, setNode, clickevent) {
	return (
		<Dialog
			open={openDialog}
			onClose={onCloseDialog}
			aria-labelledby="Node Import Dialog"
			aria-describedby="Node Import Dialog"
		>
			<MoaStack>
				<MoaPanel>
					<MoaStack spacing={1} direction="row" alignItems="center">
						<MoaTextField
							focused
							required
							size="small"
							id="outlined-required"
							title="Node"
							titlePosition="left"
							onChange={(e) => setNode(e.target.value)}
						/>
						<MoaButton variant="contained" onClick={clickevent}>APPLY</MoaButton>
					</MoaStack>
				</MoaPanel>
			</MoaStack>
		</Dialog>
	);
}

function HelpDialog(openDialog, onCloseDialog) {
	return (
		<Dialog
			open={openDialog}
			onClose={onCloseDialog}
			aria-labelledby="Monotone cubic interpolation help dialog"
			aria-describedby="Monotone cubic interpolation graph"
		>
			<img src={HelpImage} alt="Monotone cubic interpolation help" width={691 * 0.8} height={615 * 0.8} />
		</Dialog>
	);
}
