import React from 'react'; /**${comma}*/
import { Typography, Dialog, Icon, Button, ComponentsListTypographyRadio, GuideBox } from "@midasit-dev/moaui-components-v1";/**${comma}*/

const ComponentsDialogHelpButton = () => {
	const [open, setOpen] = React.useState(false);
	const [closeMsg, setCloseMsg] = React.useState('-');

	return (
    <>
			<Typography>{closeMsg}</Typography>
      <Button onClick={() => setOpen(true)}>Help</Button>
      <Dialog
        open={open}
        setOpen={setOpen}
        headerIcon={<Icon iconName="Help" />}
        headerTitle="title Text"
				onClose={() => {
					setCloseMsg('closed!');
				}}
      >
				<GuideBox spacing={2}>
					<ComponentsListTypographyRadio />
					<Button width="100%" color='negative'>Button</Button>
				</GuideBox>
			</Dialog>
    </>
  );
}/**${comma}*/

export default ComponentsDialogHelpButton;