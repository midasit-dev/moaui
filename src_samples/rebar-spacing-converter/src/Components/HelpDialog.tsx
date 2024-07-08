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
			<Button color="normal" onClick={() => setOpen(true)}>Help Dialog</Button>
			<Dialog
				open={open}
				setOpen={setOpen}
				headerIcon={<Icon iconName="InfoOutlined" />}
				headerTitle='Help'

			>
				<GuideBox spacing={2}>
					<GuideBox spacing={1}>
						<GuideBox row spacing={0.7}>
							<Typography variant='h1'>Rebar Spacing Converter Help</Typography>
						</GuideBox>
						<GuideBox paddingLeft={1}>
							<Typography variant='body1'>This plugin supports easy conversion for Rebars with different diameters.</Typography>
							<Typography variant='body1'>This plugin supports Rebar databases compliant with standards.</Typography>
						</GuideBox>
					</GuideBox>
					<GuideBox spacing={1}>
						<GuideBox row spacing={0.7}>
							<Typography variant='h1'>Button</Typography>
						</GuideBox>
						<GuideBox row spacing={2} verCenter>
							<Button color="normal">ADD TO BELOW LIST</Button>
							<Typography>Include the provided information in the list</Typography>
						</GuideBox>
						<GuideBox row spacing={2} verCenter>
							<Button color="normal">Clear</Button>
							<Typography>Delete table information</Typography>
						</GuideBox>
					</GuideBox>
					<GuideBox spacing={1}>
						<GuideBox spacing={1}>
							<GuideBox row spacing={0.7} >
								<Typography variant='h1'>Input Method</Typography>
							</GuideBox>
							<GuideBox paddingLeft={1}>
								<Typography variant='body1'>According to the input method, set input examples as follows.</Typography>
							</GuideBox>
							<GuideBox row spacing={0.7} verCenter>
								<img width="80%" height="80%" src={process.env.PUBLIC_URL + "/Input_Method1.svg"} alt="" />
								<img width="80%" height="80%" src={process.env.PUBLIC_URL + "/Input_Method2.svg"} alt="" />
							</GuideBox>
						</GuideBox>
					</GuideBox>
				</GuideBox>
			</Dialog>
		</GuideBox>

	);
}

export default CompHelpDialog;