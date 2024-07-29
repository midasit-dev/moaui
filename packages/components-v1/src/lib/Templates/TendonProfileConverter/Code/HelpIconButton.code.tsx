import React from 'react'; /**${comma}*/
import { Dialog, IconButton, Icon, Typography, Button, Stack } from "@midasit-dev/moaui-components-v1"; /**${comma}*/

const TemplatesTendonProfileConverterHelpIconButton = () => {
	const [open, setOpen] = React.useState(false);

	const HelpDialog = (props: any) => {
		return (
			<Dialog
				open={props.open}
				setOpen={props.setOpen}
				json={{
					type: 'help',
					data: {
						titleText: 'Tendon Profile Converter',
						body: [
							{
								type: 'single',
								title: 'Tendon Profile Coordinate Converter',
								content: 
									<Typography paddingLeft={1}>
										<div>
											This Plug-in converts <b>Element</b> tendon profile to{" "}
											<b>Straight</b> tendon profile.
										</div>
									</Typography>
							},
							{
								type: 'multiple',
								title: 'Details',
								content: [
									<Button>Update Tendon Profile List</Button>,
									'Only Import : 2D/3D, Splice, Element type tendon profile',
									<Stack direction='row' spacing={1} alignItems="center">
										<Button>New</Button>
										<Typography>Create new tendon profile as file name + _str</Typography>
									</Stack>,
									<Stack direction='row' spacing={1} alignItems="center">
										<Button color='negative'>Modify</Button>
										<Typography>Edit imported tendon profile</Typography>
									</Stack>,
								]
							},
							{
								type: 'single',
								title: 'Improper conditions',
								content: `2D/3D : When Straight Length of Tendon, Transfer Length existed.`
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
        <Icon iconName="Help" />
      </IconButton>
      <HelpDialog open={open} setOpen={setOpen} />
    </>
  );
}; /**${comma}*/

export default TemplatesTendonProfileConverterHelpIconButton;
