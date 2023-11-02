import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import React from "react";
import MoaButton from "@midasit-dev/moaui/Button";
import MoaTextField from "@midasit-dev/moaui/TextField";
import MoaTypography from "@midasit-dev/moaui/Typography";

export default function FormDialog() {
	const [open, setOpen] = React.useState(true);
	const handleClose = () => {
		setOpen(false);
	}

	const [baseUrl, setBaseUrl] = React.useState("");
	const [mapiKey, setMapiKey] = React.useState("");
	const handleOk = () => {
		window.location.search = `?redirectTo=${baseUrl}&mapiKey=${mapiKey}`;
		handleClose();
	};

	const handleBaseUrlChange = (e) => {
		console.log(e);
		setBaseUrl(e.target.value)
	};

	const handleMapiKeyChange = (e) => {
		console.log(e);
		setMapiKey(e.target.value)
	};

	return (
		<div>
			<Dialog open={open} sx={{backdropFilter: "blur(5px)"}}>
				<DialogTitle>Enter URL and MAPI-Key</DialogTitle>
				<DialogContent>
					<MoaTypography>
						To use the plugin, <br />
						you need a base URL and an MAPI-key
					</MoaTypography>
					<br />
					<MoaTypography variant="h1">Base URL</MoaTypography>
					<MoaTextField
						autoFocus
						margin="dense"
						id="baseurl"
						placeholder="ex) https://api-beta.midasit.com"
						type="email"
						fullWidth
						variant="standard"
						onChange={handleBaseUrlChange}
					/>
					<div style={{ height: "1rem" }} />
					<MoaTypography variant="h1">MAPI-Key</MoaTypography>
					<MoaTextField
						id="mapikey"
						type="email"
						fullWidth
						variant="standard"
						onChange={handleMapiKeyChange}
					/>
				</DialogContent>
				<DialogActions>
					<MoaButton onClick={handleOk} variant="text">continue</MoaButton>
				</DialogActions>
			</Dialog>
		</div>
	);
}