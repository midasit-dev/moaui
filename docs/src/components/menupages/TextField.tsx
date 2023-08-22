import React from "react";
import TextField from "@midasit-dev/moaui/dist/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CodeComponent from "./CodeBlock";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Color from "@midasit-dev/moaui/dist/Color";
import Font from "@midasit-dev/moaui/dist/Font";
import Switch from '@mui/material/Switch';
import DropList from "@midasit-dev/moaui/dist/DropList";
import Autocomplete from '@mui/material/Autocomplete';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import MuiTextField from '@mui/material/TextField';

const ImportCode = `import TextField from "@midasit-dev/moaui/dist/TextField"`;

const widthList = [{value: "100%", label: "100%"}, {value: "50%", label: "50%"}, {value: "40px", label: "40px"}, {value: "auto", label: "auto"}, {value: "5rem", label: "5rem"}]

export default function TextFieldCompo(props: any){
	const [titlePosition, setTitlePosition] = React.useState<"left" | "right" | "label" | undefined>("left");
	const [textFieldWidth, setTextFieldWidth] = React.useState("auto");
  const [inputValue, setInputValue] = React.useState('');
  const [disableChecked, setDisableChecked] = React.useState(false);
  const [errorChecked, setErrorChecked] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [placeholder, setPlaceholder] = React.useState('Text Field');
  const [defaultValue, setDefaultValue] = React.useState('');
  const [textFieldValue, setTextFieldValue] = React.useState('');

	const TextFieldCode = `function TextFieldCompo(props: any) {
    function onChangeExampleHandler(event: any) {
      //do something
    }
	
    return (
      <TextField onChange={onChangeExampleHandler}${placeholder !== "" ? ` placeholder="${placeholder}"` : ""}
        ${defaultValue !== "" ? ` defaultValue="${defaultValue}"` : ""}${title !== "" ? ` title="${title}"` : ""}${titlePosition !== undefined ? ` titlePosition="${titlePosition}"` : ""}${textFieldValue !== "" ? ` value="${textFieldValue}"` : ""}
        ${textFieldWidth !== "" ? ` width="${textFieldWidth}"` : ""}${disableChecked !== false ? ` disabled="${disableChecked}"` : ""}${errorChecked !== false ? ` error="${errorChecked}"` : ""}
      >
        MoaTextField
      </TextField>
    )
}`;

	const itemList = new Map();
	itemList.set("left", "left");
	itemList.set("right", "right");
	itemList.set("label", "label");

	function onChangePositionHandler(event: any) {
		setTitlePosition(event.target.value);
	}

  function onChangeWidthHandler(event: any, newValue: string | null) {
    setTextFieldWidth(newValue as string);
  }

  function onChangeTitleHandler(event: any) {
    setTitle(event.target.value);
  }

	function onChangePlaceholderHandler(event: any) {
		setPlaceholder(event.target.value);
	}

	function onChangeDefaultValueHandler(event: any) {
		setDefaultValue(event.target.value);
	}

	function onChangeTextFieldHandler(event: any) {
		setTextFieldValue(event.target.value);
	}

  const handleDisableChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDisableChecked(event.target.checked);
  };

	const handleErrorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setErrorChecked(event.target.checked);
  };
	
	
	return(
		<Box display={"flex"} width={"100%"} flexDirection={"column"}>
      <Typography sx={{ fontWeight: "bold" }} variant="h4" gutterBottom>
        MoaTextField
      </Typography>
      <Typography sx={{ fontWeight: "bold" }} variant="h6" gutterBottom>
        Introduction
      </Typography>
      <Typography variant="body1" gutterBottom>
        The MoaTextField component is a part of our React project that utilizes the
        moaui component library.
      </Typography>
      <br />
      <Typography sx={{ fontWeight: "bold" }} variant="h6" gutterBottom>
        Getting Started
      </Typography>
      <Typography variant="body1" gutterBottom>
        To use the MoaTextField component from the moaui library in your React
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
          height={"44rem"}
          justifyContent={"center"}
          flexDirection={"column"}
        >
          <Stack direction={"row"}>
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              width={"70%"}
              height="21rem"
            >
							<TextField
								width={textFieldWidth}
								placeholder={placeholder}
								title={title}
								titlePosition={titlePosition}
								disabled={disableChecked}
								defaultValue={defaultValue}
								error={errorChecked}
								onChange={onChangeTextFieldHandler}
								value={textFieldValue}
							/>
            </Box>
            <Divider orientation="vertical" flexItem sx={{ mr: 2, ml:2 }} />
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"left"}
              width={"30%"}
              height="21rem"
              flexDirection={"column"}
            >
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
                placeholder
              </Typography>
							<TextField width="100%" placeholder="placeholder" onChange={onChangePlaceholderHandler} value={placeholder}/>
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
                defaultValue
              </Typography>
							<TextField width="100%" placeholder="defaultValue" onChange={onChangeDefaultValueHandler} value={defaultValue}/>
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
                title
              </Typography>
							<TextField width="100%" placeholder="title" onChange={onChangeTitleHandler} value={title}/>
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
                titlePosition
              </Typography>
              <DropList
                itemList={itemList}
                defaultValue="contained"
                value={titlePosition}
                onChange={onChangePositionHandler}
                width="100%"
              />
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
                width
              </Typography>
              <Autocomplete
                id="free-solo-demo"
                freeSolo
                onChange={onChangeWidthHandler}
                onInputChange={(event, newInputValue) => {
                  setInputValue(newInputValue);
                }}
                value={textFieldWidth}
                inputValue={inputValue}
                options={widthList.map((option) => option.label)}
                renderInput={(params) => {
                  const { InputProps } = params;
                  const startAdornment: React.ReactNode = InputProps?.startAdornment;
                  const endAdornment: React.ReactNode = InputProps?.endAdornment;
                  const ref: React.Ref<any> = InputProps?.ref;
                  return (
                    <MuiTextField
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
                renderOption={(props, option) => {
									return(
										<Box display={"flex"} justifyContent={"center"}>
											<ListItem
												{...props}
												sx={{
													display: "flex",
													justifyContent: "center",
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
										</Box>
									)
								}}
              />
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
                  inputProps={{ 'aria-label': 'controlled' }}
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
                  error
                </Typography>
                <Switch
                  sx={{ float: "right" }}
                  checked={errorChecked}
                  onChange={handleErrorChange}
                  inputProps={{ 'aria-label': 'controlled' }}
                  size="small"
                />
              </Box>
            </Box>
          </Stack>
          <Box sx={{ mt: 2 }}>
            <CodeComponent
              language="typescript"
              children={String(TextFieldCode).replace(/\n$/, "")}
            />
          </Box>
        </Box>
      </Box>
    </Box>
	)
}