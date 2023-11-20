import React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { Typography, Button, TextField } from "../../";

export interface StyledProps {
	/**
	 * prevent redirecting
	 * @default false
	 */
	preventRedirect: boolean;
}

const StyledComponent = styled((props: StyledProps) => {
	const [open, setOpen] = React.useState(true);
	const handleClose = () => {
		setOpen(false);
	}

	const [baseUrl, setBaseUrl] = React.useState("");
	const [mapiKey, setMapiKey] = React.useState("");
	const handleOk = () => {
		if (!props.preventRedirect) {
			window.location.search = `?redirectTo=${baseUrl}&mapiKey=${mapiKey}`;
		}
		handleClose();
	};

	const handleBaseUrlChange = (e: any) => {
		console.log(e);
		setBaseUrl(e.target.value)
	};

	const handleMapiKeyChange = (e: any) => {
		console.log(e);
		setMapiKey(e.target.value)
	};

	return (
		<div>
			<Dialog open={open} sx={{backdropFilter: "blur(5px)"}}>
				<DialogTitle>Enter URL and MAPI-Key</DialogTitle>
				<DialogContent>
					<Typography>
						To use the plugin,
						you need a base URL and an MAPI-key
					</Typography>
					<br />
					<Typography variant="h1">Base URL</Typography>
					<TextField
						autoFocus
						placeholder="ex) https://api-beta.midasit.com"
						width="100%"
						onChange={handleBaseUrlChange}
					/>
					<div style={{ height: "1rem" }} />
					<Typography variant="h1">MAPI-Key</Typography>
					<TextField
						width="100%"
						placeholder="ex) 1234"
						onChange={handleMapiKeyChange}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleOk} variant="text">continue</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
})(({theme}) => ({}));

export default StyledComponent;