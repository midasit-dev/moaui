import React from "react";
import Typography from "./index";
import DropList from "../DropList";
import TextField from "../TextField";
import CodeComponent from "../CodeBlock";
import Font from "../Font";
import { type StyledProps } from "./Styled";
// MUI
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import MUITypography from "@mui/material/Typography";

const itemList = new Map();
itemList.set("h1", "h1");
itemList.set("body1", "body1");
itemList.set("body2", "body2");
itemList.set("body3", "body3");

export function TypographyCompo() {
  const [text, setText] = React.useState("MoaTypography");
  const [typographyVariant, setTypographyVariant] = React.useState<StyledProps["variant"]>("h1");

  const TypographyCode = `function TypographyCompo(props: any) {
  return (
    <Typography${
      typographyVariant !== undefined ? ` variant="${typographyVariant}"` : ""
    }>
		  ${text}
    </Typography>
  )
}`;

  function onChangeTitleHandler(event: any) {
    setText(event.target.value);
  }

  function onChangePositionHandler(event: any) {
    setTypographyVariant(event.target.value);
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
          <Typography
            variant={
              typographyVariant as StyledProps["variant"]
            }
          >
            {text}
          </Typography>
        </Box>
        <Divider orientation="vertical" flexItem sx={{ mr: 2, ml: 2 }} />
        <Stack justifyContent={"center"} alignItems={"left"} width={"30%"}>
          <MUITypography
            sx={{
              fontWeight: "bold",
              mt: 1,
              fontFamily: Font.fontFamily,
            }}
            variant="caption"
            gutterBottom
          >
            text
          </MUITypography>
          <TextField
            width="100%"
            placeholder="title"
            onChange={onChangeTitleHandler}
            value={text}
          />
          <MUITypography
            sx={{
              fontWeight: "bold",
              mt: 1,
              fontFamily: Font.fontFamily,
            }}
            variant="caption"
            gutterBottom
          >
            variant
          </MUITypography>
          <DropList
            itemList={itemList}
            defaultValue="contained"
            value={typographyVariant}
            onChange={onChangePositionHandler}
            width="100%"
          />
		  <Typography marginTop={"5rem"}>
			marginTop
		  </Typography>
        </Stack>
      </Stack>
      <Box sx={{ mt: 2 }}>
        <CodeComponent
          language="typescript"
          children={String(TypographyCode).replace(/\n$/, "")}
        />
      </Box>
    </Box>
  );
}

export default function TypographyWrapper() {
  return (
    <Box display={"flex"} width={"100%"} flexDirection={"column"}>
      <Box justifyContent={"center"} display={"flex"} width={"100%"}>
        <TypographyCompo />
      </Box>
    </Box>
  );
}
