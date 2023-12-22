import React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import { GuideBox, VerifyUtil, Icon, Typography, Button, TextField, Color } from "../../";
import { CircularProgress, circularProgressClasses, Box } from '@mui/material';
import CheckTwoToneIcon from '@mui/icons-material/CheckTwoTone';

function CustomCircularProgress({
	color
}: any) {
  return (
    <Box sx={{ position: 'relative', display: 'flex', opacity: 0.3 }}>
      <CircularProgress
        variant="determinate"
        sx={{
          // color: (theme) => theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
					color: color === "negative" ? Color.text.secondary : Color.primary.enable,
        }}
        size={30}
        thickness={4}
        value={100}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        sx={{
          // color: (theme) => (theme.palette.mode === 'light' ? Color.primary.enable_strock : '#308fe8'),
					color: color === "negative" ? Color.primaryNegative.white : Color.primary.enable_strock,
          animationDuration: '550ms',
          position: 'absolute',
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: 'round',
          },
        }}
        size={30}
        thickness={4}
      />
    </Box>
  );
}

export interface StyledProps {
	/**
	 * prevent redirecting
	 * @default false
	 */
	preventRedirect: boolean;
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"escapeKeyDown"`, `"backdropClick"`.
   */
  onClose?: any;
	/**
	 * If `true`, loading option
	 */
	loading?: boolean;
}

const StyledComponent = styled((props: StyledProps) => {
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

	const handleBaseUriChange = (e: any) => {
		const url = e.target.value;
		const extractedUrl = VerifyUtil.extractProtocolDomainPort(url);
		if (extractedUrl) {
			const protocol = extractedUrl.protocol;
			const domain = extractedUrl.domain;
			const port = extractedUrl.port;
			setBaseUrl(`${protocol}://${domain}:${port}`);
		} else {
			setBaseUrl("https://moa-engineers.midasit.com:443");
		}
	}
	const handleMapiKeyChange = (e: any) => setMapiKey(e.target.value);

	React.useEffect(() => {
		console.log(baseUrl, mapiKey)
	}, [baseUrl, mapiKey])

	return (
    <Dialog 
			open={open} 
			sx={{ backdropFilter: "blur(5px)" }}
			onClose={props.onClose}
		>
      <GuideBox width={350} fill="1" padding={4}>
        <GuideBox width={350} fill="1" spacing={3}>
          <GuideBox width={350} fill="2" spacing={1} center row horSpaceBetween>
						<GuideBox width="70%" spacing={1}>
							<GuideBox width="100%" fill="2" spacing={1} row>
								<Icon iconName="Warning" />
								<Typography>To use the plugin</Typography>
							</GuideBox>
							<Typography>you need a base URI and an MAPI-key.</Typography>
          	</GuideBox>
						<GuideBox width="30%" horRight>
							{props.loading ? <CustomCircularProgress color="negative" /> : <CheckTwoToneIcon sx={{ color: Color.text.secondary }} />}
          	</GuideBox>
          </GuideBox>
          <GuideBox
            width="100%"
            fill="2"
            spacing={1}
            row
            horSpaceBetween
            verCenter
						opacity={props.loading ? 0.5 : 1}
          >
            <Typography variant="h1">Base URI</Typography>
            <TextField
              autoFocus
              width={250}
              placeholder="https://moa-engineers.midasit.com:443"
              onChange={handleBaseUriChange}
							disabled={props.loading}
            />
          </GuideBox>
          <GuideBox
            width="100%"
            fill="2"
            spacing={1}
            row
            horSpaceBetween
            verCenter
						opacity={props.loading ? 0.5 : 1}
						>
            <Typography variant="h1">MAPI-Key</Typography>
            <TextField
              width={250}
              placeholder="MIDASIT Auth API Key"
              onChange={handleMapiKeyChange}
							disabled={props.loading}
            />
          </GuideBox>
          <GuideBox show width="100%" fill="2" center>
            <Button
              variant="contained"
              color="negative"
              onClick={handleOk}
              width="100%"
							disabled={props.loading}
            >
              continue
            </Button>
          </GuideBox>
        </GuideBox>
      </GuideBox>
    </Dialog>
	);
})(({theme}) => ({}));

export default StyledComponent;