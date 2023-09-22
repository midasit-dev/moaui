import React from 'react';
import Dialog from '../Dialog';
import DialogTitle from '../DialogTitle';
import DialogContent from '../DialogContent';
import DialogActions from '../DialogActions';
import MoaTextField from '../TextField';
import MoaTypography from '../Typography';
import MoaButton from '../Button';
import { isExistQueryStrings } from '../Utils';

const StyledComponent = () => {
	const [open, setOpen] = React.useState(false);
	const [error, setError] = React.useState(false);
	const [mapiKey, setMapiKey] = React.useState('');

	const handleOk = () => {
		if (mapiKey === '') {
			setError(true);

			setTimeout(() => {
				setError(false);
			}, 3000);
			return;
		}

		setOpen(false);
		window.location.search = `?mapiKey=${mapiKey}`;
	}

	React.useEffect(() => {
		if (!isExistQueryStrings('mapiKey')) setOpen(true);
	}, []);



	return (
		<React.Fragment>
			<Dialog open={open}>
				<DialogTitle>MAPI-Key required</DialogTitle>
				<DialogContent>
					<MoaTypography>
						To use the plugin outside of MIDAS product,<br />
						you need to enter MAPI-key.
					</MoaTypography>
					<br />
					<MoaTypography variant="h1">
						MAPI-Key
					</MoaTypography>
					<MoaTextField
						id="mapikey"
						type="text"
						fullWidth
						placeholder="Enter MAPI-Key here"
						error={error}
						onChange={(e) => setMapiKey(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === 'Enter') handleOk();
						}}
					/>
					{!error &&
						<MoaTypography variant="body3" paddingTop={'4px'}>* MAPI-Key can be found in MIDAS Product</MoaTypography>
					}
					{error &&
						<MoaTypography variant='body3' paddingTop={'4px'}>
							* Please enter MAPI-Key.
						</MoaTypography>
					}
				</DialogContent>
				<DialogActions>
					<MoaButton onClick={handleOk} variant="text">continue</MoaButton>
				</DialogActions>
			</Dialog>
		</React.Fragment>
	)
};

export default StyledComponent;