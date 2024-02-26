import React from 'react'; /**${comma}*/
import { Dialog, Icon, Button, ComponentsListTypographyRadio, GuideBox } from "@midasit-dev/moaui";/**${comma}*/

const ComponentsDialogHelpButton = () => {
	const [open, setOpen] = React.useState(false);

	return (
    <>
      <Button onClick={() => setOpen(true)}>Help</Button>
      <Dialog
        open={open}
        setOpen={setOpen}
        headerIcon={<Icon iconName="Help" />}
        headerTitle="title Text"
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