import React from "react";
import Button from "./index";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import CodeComponent from "../CodeBlock";
import DropList from "../DropList";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Color from "../Color";
import Font from "../Font";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Switch from "@mui/material/Switch";

import { StyledProps } from "./Styled";

const widthList = [
  { value: "100%", label: "100%" },
  { value: "50%", label: "50%" },
  { value: "40px", label: "40px" },
  { value: "auto", label: "auto" },
  { value: "5rem", label: "5rem" },
];

export function ButtonCompo() {
  const [buttonVariant, setButtonVariant] = React.useState("contained");
  const [buttonWidth, setButtonWidth] = React.useState("auto");
  const [buttonColor, setButtonColor] = React.useState("normal");

  const [disableChecked, setDisableChecked] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  const ButtonCode = `function ButtonCompo(props: any) {
  function onClickExampleHandler(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    //do something
  }

  return (
    <Button onClick={onClickExampleHandler}${
      buttonVariant !== "" ? ` variant="${buttonVariant}"` : ""
    }${buttonWidth !== "" ? ` width="${buttonWidth}"` : ""}${
    disableChecked !== false ? ` disabled={${disableChecked}}` : ""
  	}${buttonColor !== "normal" ? ` color="${buttonColor}"` : ""
  }>
      MoaButton
    </Button>
  )
}
`;

  const variantList = new Map([
	["contained", "contained"],
	["outlined", "outlined"],
	["text", "text"],
  ]);

  const colorList = new Map([
	["normal", "normal"],
	["negative", "negative"],
  ])

  function onChangeVariantHandler(event: any) {
    setButtonVariant(event.target.value);
  }

  function onChangeColorHandler(event: any) {
    setButtonColor(event.target.value);
  }

  function onChangeWidthHandler(event: any, newValue: string | null) {
    setButtonWidth(newValue as string);
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDisableChecked(event.target.checked);
  };

  function onClickExampleHandler(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    //do something
    console.log(event.target);
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
          <Button
            variant={buttonVariant as StyledProps["variant"]}
			      color={buttonColor as StyledProps["color"]}
            width={buttonWidth}
            disabled={disableChecked}
            onClick={onClickExampleHandler}
          >
            MoaButton
          </Button>
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
            variant
          </Typography>
          <DropList
            itemList={variantList}
            defaultValue="contained"
            value={buttonVariant}
            onChange={onChangeVariantHandler}
            width="100%"
          />
          <Typography
            sx={{ fontWeight: "bold", m: 0, fontFamily: Font.fontFamily }}
            variant="caption"
            gutterBottom
          >
            color
          </Typography>
          <DropList
            itemList={colorList}
            defaultValue="contained"
            value={buttonColor}
            onChange={onChangeColorHandler}
            width="100%"
          />
          <Typography
            sx={{
              fontWeight: "bold",
              mt: 1,
              fontFamily: Font.fontFamily,
            }}
            variant="caption"
            gutterBottom
          >
            width
          </Typography>
          <Autocomplete
            id="free-solo-demo"
            freeSolo
            onChange={onChangeWidthHandler}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            value={buttonWidth}
            inputValue={inputValue}
            options={widthList.map((option) => option.label)}
            renderInput={(params) => {
              const { InputProps } = params;
              const startAdornment: React.ReactNode =
                InputProps?.startAdornment;
              const endAdornment: React.ReactNode = InputProps?.endAdornment;
              const ref: React.Ref<any> = InputProps?.ref;
              return (
                <TextField
                  {...params}
                  InputProps={{
                    startAdornment: startAdornment,
                    endAdornment: endAdornment,
                    ref: ref,
                    sx: {
                      width: "100%",
                      height: "1.75rem",
                      alignItems: "center",
                      flexShrink: 0,
                      //text
                      color: Color.text.secondary,
                      ...Font.defaultFontSet,
                      fontSize: "0.75rem",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "0.875rem",
                    },
                  }}
                />
              );
            }}
            ListboxComponent={List}
            renderOption={(props, option) => (
              <ListItem
                {...props}
                sx={{
                  height: "20px",
                  fontFamily: Font.fontFamily,
                  fontFeatureSettings: Font.fontFeatureSettings,
                  fontSize: "0.8rem",
                  fontStyle: "normal",
                  fontWeight: 400,
                }}
              >
                {option}
              </ListItem>
            )}
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
              disabled
            </Typography>
            <Switch
              sx={{ float: "right" }}
              checked={disableChecked}
              onChange={handleChange}
              inputProps={{ "aria-label": "controlled" }}
              size="small"
            />
          </Box>
        </Stack>
      </Stack>
      <Box sx={{ mt: 2 }}>
        <CodeComponent
          language="typescript"
          children={String(ButtonCode).replace(/\n$/, "")}
        />
      </Box>
    </Box>
  );
}

export default function ButtonWrapper() {
  return (
    <Box display={"flex"} width={"100%"} flexDirection={"column"}>
      <Box justifyContent={"center"} display={"flex"} width={"100%"}>
        <ButtonCompo />
      </Box>
    </Box>
  );
}
