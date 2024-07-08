import React from 'react'; 
import { Dialog, Typography, IconButton, Icon, GuideBox } from "@midasit-dev/moaui";

const CompImportSectionButtonHelp = () => {
	const [open, setOpen] = React.useState(false);

	const HelpDialog = (props: any) => {
		return (
			<Dialog
				open={props.open}
				setOpen={props.setOpen}
				json={{
					type: 'help',
					data: {
						titleText: 'Available Section',
						body: [
							{
								type: 'single',
								title: 'Gradient Temperature Self-Equalibriting Stress Calculator',
								content: 
									<GuideBox paddingLeft={1}>
										<Typography>{'This Plug-in calculates AASHTO LRFD Gradient Temperature'}</Typography>
										<Typography>{'Self Equalibriting Stress for PSC and COMPOSIT (Concrete'}</Typography>
										<Typography>{'and Stee) Sections in Midas Civil DB Section data'}</Typography>
									</GuideBox>
							},
							{
								type: 'single',
								title: 'Exceptions',
								content: 
									<GuideBox paddingLeft={1}>
										<Typography>{'PSC > PSC-CMPWEB, nCELL, nCELL2'}</Typography>
										<Typography>{'Composite > General, User'}</Typography>
									</GuideBox>
							},
						]
					}
				}}
			/>
		);
	}

	return (
		<>
			<IconButton transparent onClick={() => setOpen(true)}>
				<Icon iconName='Help' />
			</IconButton>
			<HelpDialog open={open} setOpen={setOpen} />
		</>
	)
}

export default CompImportSectionButtonHelp;