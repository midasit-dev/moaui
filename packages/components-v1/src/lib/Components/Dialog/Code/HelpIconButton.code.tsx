import React from 'react'; /**${comma}*/
import { Dialog, Button, Typography, Stack, IconButton, Icon } from "@midasit-dev/moaui-components-v1";/**${comma}*/

const ComponentsDialogHelpIconButton = () => {
	const [open, setOpen] = React.useState(false);

	const HelpDialog = (props: any) => {
		return (
			<Dialog
				open={props.open}
				setOpen={props.setOpen}
				json={{
					type: 'help',
					data: {
						titleText: 'Dialog Title Text',
						body: [
							{
								type: 'single',
								title: 'Single Title',
								content: 'Single Content'
							},
							{
								type: 'multiple',
								title: 'MulPtiple Title',
								content: [
									'Plane Text',
									<Typography>Typography Text</Typography>,
									<Button>Default Button</Button>,
									<Button width="400px" color="negative">300px Button</Button>,
									<Button width="100%">100% Button</Button>,
								]
							},
							{
								type: 'single',
								title: 'Button Text',
								content: 
									<Stack direction='row' spacing={1} alignItems="center">
										<Button>A Button</Button>
										<Typography>A Button Description</Typography>
									</Stack>
							}
						]
					}
				}}
			/>
		);
	}

	return (
		<>
			<IconButton transparent onClick={() => setOpen(true)}>
				<Icon iconName="Help" />
			</IconButton>
			<HelpDialog open={open} setOpen={setOpen} />
		</>
	)
}/**${comma}*/

export default ComponentsDialogHelpIconButton;