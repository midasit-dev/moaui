import React from "react";
import Check from "@midasit-dev/moaui/dist/Check";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import CodeComponent from "./CodeBlock";
import DropList from "@midasit-dev/moaui/dist/DropList";
import TextField from "@midasit-dev/moaui/dist/TextField";
import Color from "@midasit-dev/moaui/dist/Color";
import Font from "@midasit-dev/moaui/dist/Font";
import Switch from '@mui/material/Switch';

const ImportCode = `import Check from "@midasit-dev/moaui/dist/Check"`;

export default function ButtonCompo(props: any) {
	const [checkName, setCheckName] = React.useState("MoaCheck");
	const [ariaLabel, setAriaLabel] = React.useState("MoaCheck-aria-label");
  const [disableChecked, setDisableChecked] = React.useState(false);
  const [defaultChecked, setDefaultChecked] = React.useState(false);
  const [checked, setChecked] = React.useState(true);
	const [required, setRequired] = React.useState(false);
	const [indeterminate, setIndeterminate] = React.useState(false);

	const CheckCode = `function CheckCompo(props: any) {
  function onChangeExampleHandler(event: any) {
    //do something
  }

  return (
    <Check onChange={onChangeExampleHandler}${checkName !== "" ? ` name="${checkName}"` : ""}${defaultChecked !== false ? ` defaultChecked="${defaultChecked}"` : ""}
    ${checked !== undefined ? ` checked="${checked}"` : ""}${required !== false ? ` required="${required}"` : ""}${indeterminate !== false ? ` indeterminate="${indeterminate}"` : ""}${disableChecked !== false ? ` disabled="${disableChecked}"` : ""}
    ${ariaLabel !== "" ? ` ariaLabel="${ariaLabel}"` : ""}
    />
  )
}
`;
	const itemList = new Map();
	itemList.set("contained", "contained");
	itemList.set("outlined", "outlined");
	itemList.set("text", "text");

	function onChangeNameHandler(event: any) {
		setCheckName(event.target.value);
	}

	function onChangeAriaLabelHandler(event: any) {
		setAriaLabel(event.target.value);
	}

	const handleDisableChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setDisableChecked(event.target.checked);
	};

	const handleDefaultCheckedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setDefaultChecked(event.target.checked);
	}

	const handleCheckedChange = (checked: boolean | undefined) => {
		setChecked(checked || false);
	}

	const handleCheckedChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChecked(event.target.checked);
	}

	const handleRequiredChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRequired(event.target.checked);
	}

	const handleIndeterminateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setIndeterminate(event.target.checked);
	}

	return (
    <Box display={"flex"} width={"100%"} flexDirection={"column"}>
      <Typography sx={{ fontWeight: "bold" }} variant="h4" gutterBottom>
        MoaCheck
      </Typography>
      <Typography sx={{ fontWeight: "bold" }} variant="h6" gutterBottom>
        Introduction
      </Typography>
      <Typography variant="body1" gutterBottom>
        The MoaCheck component is a part of our React project that utilizes the
        moaui component library.
      </Typography>
      <br />
      <Typography sx={{ fontWeight: "bold" }} variant="h6" gutterBottom>
        Getting Started
      </Typography>
      <Typography variant="body1" gutterBottom>
        To use the MoaCheck component from the moaui library in your React
        project, follow these steps:
      </Typography>
      <CodeComponent
        language="typescript"
        children={String(ImportCode).replace(/\n$/, "")}
      />
      <br />
      <Typography sx={{ fontWeight: "bold" }} variant="subtitle2" gutterBottom>
        Installation
      </Typography>
      <Typography variant="body2" gutterBottom>
        First, ensure that you have the moaui library and any other required
        dependencies installed in your project. You can install moaui using npm
      </Typography>
      <Box justifyContent={"center"} display={"flex"} width={"100%"}>
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
          height={"37rem"}
          justifyContent={"center"}
          flexDirection={"column"}
        >
          <Stack direction={"row"}>
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              width={"70%"}
              height="17rem"
            >
              <Check
								defaultChecked={true}
								onChange={(event, checked) => handleCheckedChange(checked)}
								required={required}
								checked={checked}
								disabled={disableChecked}
								name={checkName}
								ariaLabel={ariaLabel}
								indeterminate={indeterminate}
							/>
            </Box>
            <Divider orientation="vertical" flexItem sx={{ mr: 2, ml:2 }} />
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"left"}
              width={"30%"}
              height="17rem"
              flexDirection={"column"}
            >
              <Typography
                sx={{ fontWeight: "bold", m: 0, fontFamily: Font.fontFamily }}
                variant="caption"
                gutterBottom
              >
                name
              </Typography>
							<TextField width="100%" placeholder="name" onChange={onChangeNameHandler} value={checkName}/>
							<Typography
                sx={{ fontWeight: "bold", m: 0, fontFamily: Font.fontFamily }}
                variant="caption"
                gutterBottom
              >
                ariaLabel
              </Typography>
							<TextField width="100%" placeholder="ariaLabel" onChange={onChangeAriaLabelHandler} value={ariaLabel}/>
							<Box sx={{mt:1}}>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    mt: 1,
                    mb: 0,
                    fontFamily: Font.fontFamily,
                  }}
                  variant="caption"
                  gutterBottom
                >
                  defaultChecked
                </Typography>
                <Switch
                  sx={{ float: "right" }}
                  checked={defaultChecked}
                  onChange={handleDefaultCheckedChange}
                  inputProps={{ 'aria-label': 'controlled-defaultChecked' }}
                  size="small"
                />
              </Box>
							<Box sx={{mt:1}}>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    mt: 1,
                    mb: 0,
                    fontFamily: Font.fontFamily,
                  }}
                  variant="caption"
                  gutterBottom
                >
                  checked
                </Typography>
                <Switch
                  sx={{ float: "right" }}
                  checked={checked}
                  onChange={handleCheckedChange2}
                  inputProps={{ 'aria-label': 'controlled-defaultChecked' }}
                  size="small"
                />
              </Box>
							<Box sx={{mt:1}}>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    mt: 1,
                    mb: 0,
                    fontFamily: Font.fontFamily,
                  }}
                  variant="caption"
                  gutterBottom
                >
                  required
                </Typography>
                <Switch
                  sx={{ float: "right" }}
                  checked={required}
                  onChange={handleRequiredChange}
                  inputProps={{ 'aria-label': 'controlled-required' }}
                  size="small"
                />
              </Box>
							<Box sx={{mt:1}}>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    mt: 1,
                    mb: 0,
                    fontFamily: Font.fontFamily,
                  }}
                  variant="caption"
                  gutterBottom
                >
                  indeterminate
                </Typography>
                <Switch
                  sx={{ float: "right" }}
                  checked={indeterminate}
                  onChange={handleIndeterminateChange}
                  inputProps={{ 'aria-label': 'controlled-indeterminate' }}
                  size="small"
                />
              </Box>
              <Box sx={{mt:1}}>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    mt: 1,
                    mb: 0,
                    fontFamily: Font.fontFamily,
                  }}
                  variant="caption"
                  gutterBottom
                >
                  disabled
                </Typography>
                <Switch
                  sx={{ float: "right" }}
                  checked={disableChecked}
                  onChange={handleDisableChange}
                  inputProps={{ 'aria-label': 'controlled-disabled' }}
                  size="small"
                />
              </Box>
            </Box>
          </Stack>
          <Box sx={{ mt: 2 }}>
            <CodeComponent
              language="typescript"
              children={String(CheckCode).replace(/\n$/, "")}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
