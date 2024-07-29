import React from 'react'; /**${comma}*/
import { Dialog, Icon, Button, GuideBox } from "@midasit-dev/moaui-components-v1";/**${comma}*/

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
				<GuideBox width={100} height={50} loading />
			</Dialog>
    </>
  );
}/**${comma}*/

export default ComponentsDialogHiddenClose;