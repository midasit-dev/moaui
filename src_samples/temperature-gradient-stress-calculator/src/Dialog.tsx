import React from 'react';
import Dialog from '@mui/material/Dialog';
import { GuideBox, Typography, Button, TextField, VerifyUtil, Icon } from "@midasit-dev/moaui";

const TDialog = (props: any) => {
	const [baseUrl, setBaseUrl] = React.useState("");
	const [mapiKey, setMapiKey] = React.useState("");

	const [open, setOpen] = React.useState(false);
	React.useEffect(() => {
		if (!VerifyUtil.isExistQueryStrings('mapiKey')) setOpen(true);
		if (!VerifyUtil.isExistQueryStrings('redirectTo')) {
			setBaseUrl('https://moa-engineers.midasit.com:443');
		};
	}, []);

	const handleClose = () => setOpen(false);
	const handleOk = () => {
		if (!props.preventRedirect) {
			window.location.search = `?redirectTo=${baseUrl}&mapiKey=${mapiKey}`;
		}
		handleClose();
	};

	const handleBaseUrlChange = (e: any) => setBaseUrl(e.target.value);
	const handleMapiKeyChange = (e: any) => setMapiKey(e.target.value);

	return (
    <Dialog open={open} sx={{ backdropFilter: "blur(5px)" }}>
      <GuideBox width={350} fill="1" padding={4}>
        <GuideBox width={350} fill="1" spacing={3}>
          <GuideBox width="100%" fill="2" spacing={1} center>
            <GuideBox width="100%" fill="2" spacing={1} center row>
              <Icon iconName="Warning" />
              <Typography>To use the plugin</Typography>
            </GuideBox>
            <Typography>you need a base URL and an MAPI-key.</Typography>
          </GuideBox>
          <GuideBox
            width="100%"
            fill="2"
            spacing={1}
            row
            horSpaceBetween
            verCenter
          >
            <Typography variant="h1">Base URL</Typography>
            <TextField
              autoFocus
              width={250}
              placeholder="default: https://moa-engineers.midasit.com:443"
              onChange={handleBaseUrlChange}
            />
          </GuideBox>
          <GuideBox
            width="100%"
            fill="2"
            spacing={1}
            row
            horSpaceBetween
            verCenter
          >
            <Typography variant="h1">MAPI-Key</Typography>
            <TextField
              width={250}
              placeholder="ex) 1234"
              onChange={handleMapiKeyChange}
            />
          </GuideBox>
          <GuideBox show width="100%" fill="2" center>
            <Button
              variant="contained"
              color="negative"
              onClick={handleOk}
              width="100%"
            >
              continue
            </Button>
          </GuideBox>
        </GuideBox>
      </GuideBox>
    </Dialog>
  );
}

export default TDialog;