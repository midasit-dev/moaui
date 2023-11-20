import React from "react";
import Check from ".";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import CodeComponent from "../CodeBlock";
import TextField from "../TextField";
import Font from "../../Style/Font";
import Switch from '@mui/material/Switch';

export function CheckCompo() {
	const [checkName, setCheckName] = React.useState("MoaCheck");
	const [ariaLabel, setAriaLabel] = React.useState("MoaCheck-aria-label");
  const [disableChecked, setDisableChecked] = React.useState(false);
  const [defaultChecked, setDefaultChecked] = React.useState(false);
  const [checked, setChecked] = React.useState(true);
	const [required, setRequired] = React.useState(false);
	const [indeterminate, setIndeterminate] = React.useState(false);

	const isControlled = Boolean(checked !== undefined && defaultChecked === false);
	const isUncontrolled = Boolean(defaultChecked !== false);

	const CheckCode = `function CheckCompo(props: any) {
  function onChangeExampleHandler(event: any) {
    //do something
  }

  return (
    <Check onChange={onChangeExampleHandler}${isControlled ? ` checked={${checked}}` : ""}${isUncontrolled ? ` defaultChecked={${defaultChecked}}` : ""}
    ${checkName !== "" ? `name="${checkName}"` : ""}${required !== false ? ` required={${required}}` : ""}${indeterminate !== false ? ` indeterminate={${indeterminate}}` : ""}${disableChecked !== false ? ` disabled={${disableChecked}}` : ""}
    ${ariaLabel !== "" ? `ariaLabel="${ariaLabel}"` : ""}
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
		setChecked(false);
		setDefaultChecked(event.target.checked);
	}

	const handleCheckedChange = (checked: boolean | undefined) => {
		setChecked(checked || false);
	}
	
	const handleCheckedChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
		setDefaultChecked(false);
		setChecked(event.target.checked);
	}

	const handleRequiredChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRequired(event.target.checked);
	}

	const handleIndeterminateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setIndeterminate(event.target.checked);
	}

	return (
    <Box
      sx={{
        border: "1px solid #95d6fc",
        paddingRight: "1rem",
        paddingLeft: "1rem",
        paddingTop: "1rem",
        paddingBottom: "1rem",
        backgroundColor: "#FFFFFF",
        mt: 2,
        mb: 2,
        borderRadius: 5,
        boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.25)",
      }}
      display={"flex"}
      width={"70%"}
      justifyContent={"center"}
      flexDirection={"column"}
    >
      <Stack direction={"row"}>
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          width={"70%"}
        >
          {isControlled && isUncontrolled === false && (
            <Check
              onChange={(event, checked) => handleCheckedChange(checked)}
              required={required}
              checked={checked}
              disabled={disableChecked}
              name={checkName}
              ariaLabel={ariaLabel}
              indeterminate={indeterminate}
            />
          )}
          {isControlled === false && isUncontrolled && (
            <Check
              defaultChecked={defaultChecked}
              required={required}
              disabled={disableChecked}
              name={checkName}
              ariaLabel={ariaLabel}
              indeterminate={indeterminate}
            />
          )}
        </Box>
        <Divider orientation="vertical" flexItem sx={{ mr: 2, ml: 2 }} />
        <Stack
          justifyContent={"center"}
          alignItems={"left"}
          width={"30%"}
        >
          <Typography
            sx={{ fontWeight: "bold", m: 0, fontFamily: Font.fontFamily }}
            variant="caption"
            gutterBottom
          >
            name
          </Typography>
          <TextField
            width="100%"
            placeholder="name"
            onChange={onChangeNameHandler}
            value={checkName}
          />
          <Typography
            sx={{ fontWeight: "bold", mt: 1, fontFamily: Font.fontFamily }}
            variant="caption"
            gutterBottom
          >
            ariaLabel
          </Typography>
          <TextField
            width="100%"
            placeholder="ariaLabel"
            onChange={onChangeAriaLabelHandler}
            value={ariaLabel}
          />
          <Box sx={{ mt: 1 }}>
            <Typography
              sx={{
                fontWeight: "bold",
                mt: 1,
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
              inputProps={{ "aria-label": "controlled-defaultChecked" }}
              size="small"
            />
          </Box>
          <Box sx={{ mt: 1 }}>
            <Typography
              sx={{
                fontWeight: "bold",
                mt: 1,
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
              inputProps={{ "aria-label": "controlled-defaultChecked" }}
              size="small"
            />
          </Box>
          <Box sx={{ mt: 1 }}>
            <Typography
              sx={{
                fontWeight: "bold",
                mt: 1,
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
              inputProps={{ "aria-label": "controlled-required" }}
              size="small"
            />
          </Box>
          <Box sx={{ mt: 1 }}>
            <Typography
              sx={{
                fontWeight: "bold",
                mt: 1,
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
              inputProps={{ "aria-label": "controlled-indeterminate" }}
              size="small"
            />
          </Box>
          <Box sx={{ mt: 1 }}>
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
            <Switch
              sx={{ float: "right" }}
              checked={disableChecked}
              onChange={handleDisableChange}
              inputProps={{ "aria-label": "controlled-disabled" }}
              size="small"
            />
          </Box>
        </Stack>
      </Stack>
      <Box sx={{ mt: 2 }}>
        <CodeComponent
          language="typescript"
          children={String(CheckCode).replace(/\n$/, "")}
        />
      </Box>
    </Box>
  );
}

export default function ButtonCompo() {
	
	return (
    <Box display={"flex"} width={"100%"} flexDirection={"column"}>
      <Box justifyContent={"center"} display={"flex"} width={"100%"}>
        <CheckCompo />
      </Box>
    </Box>
  );
}
