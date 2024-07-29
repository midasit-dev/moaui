import React from 'react'; /**${comma}*/
import { Dialog, Button, Typography, Stack } from "@midasit-dev/moaui-components-v1";/**${comma}*/

const ComponentsDialogHelp = () => {
	const [open, setOpen] = React.useState(true);

	return (
    <Dialog
      open={open}
      setOpen={setOpen}
      json={{
        type: "help",
        data: {
          titleText: "Dialog Title Text",
          body: [
            {
              type: "single",
              title: "Single Title",
              content: "Single Content",
            },
            {
              type: "multiple",
              title: "MulPtiple Title",
              content: [
                "Plane Text",
                <Typography>Typography Text</Typography>,
                <Button>Default Button</Button>,
                <Button width="400px" color="negative">
                  300px Button
                </Button>,
                <Button width="100%">100% Button</Button>,
              ],
            },
            {
              type: "single",
              title: "Button Text",
              content: (
                <Stack direction="row" spacing={1} alignItems="center">
                  <Button>A Button</Button>
                  <Typography>A Button Description</Typography>
                </Stack>
              ),
            },
          ],
        },
      }}
    />
  );
}/**${comma}*/

export default ComponentsDialogHelp;