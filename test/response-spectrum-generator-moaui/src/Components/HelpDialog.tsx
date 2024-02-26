import React from 'react';
import { 
	GuideBox,
	Typography,
	Dialog,
	Icon,
	Button,
} from '@midasit-dev/moaui';

const CompHelpDialog = (props: any) => {
	const [open, setOpen] = React.useState(false);

	return (
		<GuideBox horLeft verCenter>
			<Icon iconName="Help" toButton onClick={() => setOpen(true)} />
			<Dialog
				open={open}
				setOpen={setOpen}
				headerIcon={<Icon iconName="InfoOutlined" />}
				headerTitle='Seismic Data'
			>
				<GuideBox spacing={2}>
					<GuideBox spacing={1}>
						<GuideBox row spacing={0.7}>
							<Typography variant='h1'>Generate Design Spectrum</Typography>
						</GuideBox>
						<GuideBox paddingLeft={1}>
							<Typography variant='body1'>This Plug-in can use the feature to enter Spectrum function</Typography>
							<Typography variant='body1'>for response spectrum anlysis in accordance with the</Typography>
							<Typography variant='body1'>standards.</Typography>
						</GuideBox>
					</GuideBox>
					<GuideBox spacing={1}>
						<GuideBox row spacing={0.7}>
							<Typography variant='h1'>Details</Typography>
						</GuideBox>
						<GuideBox row spacing={2} verCenter>
							<Button color='negative'>Update</Button>
							<Typography>Enter spectral data to program</Typography>
						</GuideBox>
					</GuideBox>
				</GuideBox>
			</Dialog>
		</GuideBox>
	);
}

export default CompHelpDialog;