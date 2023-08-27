import React from 'react';
import Switch from './index';
import DropList from "../DropList";
import TextField from "../TextField";
import CodeComponent from "../CodeBlock";
import Font from "../Font";
// MUI
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import MUISwitch from '@mui/material/Switch';

export function SwitchCompo(props: any){
	const [label, setLabel] = React.useState("MoaSwitch");
  const [disableChecked, setDisableChecked] = React.useState(false);
	const [checked, setChecked] = React.useState(true);

	const SwitchCode = `function SwitchCompo(props: any) {
  function onChangeExampleHandler(event: any) {
    //do something
  }

  return (
    <Switch onChange={onChangeExampleHandler}
      ${label !== "" ? `label="${label}"` : ""}${checked !== undefined ? ` checked={${checked}}` : ""}${disableChecked !== false ? ` disabled={${disableChecked}}` : ""}
    />
  )
}`;

  function onChangelabelHandler(event: any) {
    setLabel(event.target.value);
  }

	function onChangeMoaSwitchHandler(event: any) {
		setChecked(event.target.checked);
	}

  const handleDisableChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDisableChecked(event.target.checked);
  };

	const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
	
	return (
		<Box
			sx={{
				border: "1px solid #95d6fc",
				paddingRight: "1rem",
				paddingLeft: "1rem",
				paddingTop: "0rem",
				paddingBottom: "0rem",
				backgroundColor: "#FFFFFF",
				mt: 2,
				mb: 2,
				borderRadius: 5,
				boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.25)",
			}}
			display={"flex"}
			width={"70%"}
			height={"45rem"}
			justifyContent={"center"}
			flexDirection={"column"}
		>
			<Stack direction={"row"}>
				<Box
					display={"flex"}
					justifyContent={"center"}
					alignItems={"center"}
					width={"70%"}
					height="23rem"
				>
					<Switch	label={label} checked={checked} disabled={disableChecked} onChange={onChangeMoaSwitchHandler}/>
				</Box>
				<Divider orientation="vertical" flexItem sx={{ mr: 2, ml:2 }} />
				<Box
					display={"flex"}
					justifyContent={"center"}
					alignItems={"left"}
					width={"30%"}
					height="23rem"
					flexDirection={"column"}
				>
					<Typography
						sx={{
							fontWeight: "bold",
							mt: 1,
							fontFamily: Font.fontFamily,
						}}
						variant="caption"
						gutterBottom
					>
						label
					</Typography>
					<TextField width="100%" placeholder="label" onChange={onChangelabelHandler} value={label}/>
					<Box sx={{mt:1}}>
						<Typography
							sx={{
								fontWeight: "bold",
								mt: 1,
								fontFamily: Font.fontFamily,
							}}
							variant="caption"
							gutterBottom
						>
							check
						</Typography>
						<MUISwitch
							sx={{ float: "right" }}
							checked={checked}
							onChange={handleSwitchChange}
							inputProps={{ 'aria-label': 'controlled' }}
							size="small"
						/>
					</Box>
					<Box sx={{mt:1}}>
						<Typography
							sx={{
								fontWeight: "bold",
								mt: 1,
								fontFamily: Font.fontFamily,
							}}
							variant="caption"
							gutterBottom
						>
							disabled
						</Typography>
						<MUISwitch
							sx={{ float: "right" }}
							checked={disableChecked}
							onChange={handleDisableChange}
							inputProps={{ 'aria-label': 'controlled' }}
							size="small"
						/>
					</Box>
				</Box>
			</Stack>
			<Box sx={{ mt: 2 }}>
				<CodeComponent
					language="typescript"
					children={String(SwitchCode).replace(/\n$/, "")}
				/>
			</Box>
		</Box>
	)
}

export default function SwitchWrapper(props: any){	
	return(
		<Box display={"flex"} width={"100%"} flexDirection={"column"}>
      <Box justifyContent={"center"} display={"flex"} width={"100%"}>
        <SwitchCompo />
      </Box>
    </Box>
	)
}