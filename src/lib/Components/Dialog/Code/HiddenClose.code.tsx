import React from 'react'; /**${comma}*/
import { Dialog, Icon, Button, GuideBox, Typography } from "@midasit-dev/moaui";/**${comma}*/

const ComponentsDialogHiddenClose = () => {
	const [open, setOpen] = React.useState(false);

	return (
    <>
      <Button onClick={() => setOpen(true)}>Help</Button>
      <Dialog
				hiddenClose
        open={open}
				headerIcon={<Icon iconName="HourglassEmpty" />}
        headerTitle="Loading ..."
      >
				<GuideBox width={300} height={150} spacing={2}>
					<Typography>Hidden Close ...</Typography>
				</GuideBox>
			</Dialog>
    </>
  );
}/**${comma}*/

export default ComponentsDialogHiddenClose;