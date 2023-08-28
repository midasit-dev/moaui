import React from "react";
import TextField from "../TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CodeComponent from "../CodeBlock";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Color from "../Color";
import Font from "../Font";
import Switch from '@mui/material/Switch';
import DropList from "../DropList";
import Autocomplete from '@mui/material/Autocomplete';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import MuiTextField from '@mui/material/TextField';

const widthList = [{ value: "100%", label: "100%" }, { value: "50%", label: "50%" }, { value: "40px", label: "40px" }, { value: "auto", label: "auto" }, { value: "5rem", label: "5rem" }]

export function TextFieldCompo(props: any) {
	const [titlePosition, setTitlePosition] = React.useState<"left" | "right" | "label" | undefined>("left");
	const [textFieldWidth, setTextFieldWidth] = React.useState("auto");
	const [inputValue, setInputValue] = React.useState('');
	const [disableChecked, setDisableChecked] = React.useState(false);
	const [errorChecked, setErrorChecked] = React.useState(false);
	const [title, setTitle] = React.useState('');
	const [placeholder, setPlaceholder] = React.useState('Text Field');
	const [defaultValue, setDefaultValue] = React.useState("");
	const [textFieldValue, setTextFieldValue] = React.useState("");

	const showDefaultValue = Boolean(defaultValue !== "");
	const showTextFieldValue = Boolean(textFieldValue !== "");

	const TextFieldCode = `function TextFieldCompo(props: any) {
	${showTextFieldValue ? `const [textFieldValue, setTextFieldValue] = React.useState("${textFieldValue}");
	function onChangeExampleHandler(event: any) {
		//do something
		}
	` : ""}
    return (
      <TextField onChange={onChangeExampleHandler}${placeholder !== "" ? ` placeholder="${placeholder}"` : ""}
        ${showDefaultValue ? ` defaultValue="${defaultValue}"` : ""}${title !== "" ? ` title="${title}"` : ""}${titlePosition !== undefined ? ` titlePosition="${titlePosition}"` : ""}${textFieldValue !== "" ? ` value="${textFieldValue}"` : ""}
        ${textFieldWidth !== "" ? ` width="${textFieldWidth}"` : ""}${disableChecked !== false ? ` disabled={${disableChecked}}` : ""}${errorChecked !== false ? ` error={${errorChecked}}` : ""}
      />
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
		setTextFieldValue("");
		setDefaultValue(event.target.value);
	}

	function onChangeTextFieldHandler(event: any) {
		setDefaultValue("");
		setTextFieldValue(event.target.value);
	}

	const handleDisableChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setDisableChecked(event.target.checked);
	};

	const handleErrorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setErrorChecked(event.target.checked);
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
					{
						(showDefaultValue || !showTextFieldValue) && 
							<TextField
								width={textFieldWidth}
								placeholder={placeholder}
								title={title}
								titlePosition={titlePosition}
								disabled={disableChecked}
								defaultValue={defaultValue}
								error={errorChecked}
							/>
					}
					{
						showTextFieldValue &&
						<TextField
							width={textFieldWidth}
							placeholder={placeholder}
							title={title}
							titlePosition={titlePosition}
							disabled={disableChecked}
							error={errorChecked}
							value={textFieldValue}
							onChange={onChangeTextFieldHandler}
						/>
					}
				</Box>
				<Divider orientation="vertical" flexItem sx={{ mr: 2, ml: 2 }} />
				<Stack
					justifyContent={"center"}
					alignItems={"left"}
					width={"30%"}
					direction="column"
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
						placeholder
					</Typography>
					<TextField width="100%" placeholder="placeholder" onChange={onChangePlaceholderHandler} value={placeholder} />
					<Typography
						sx={{
							fontWeight: "bold",
							mt: 1,
							fontFamily: Font.fontFamily,
						}}
						variant="caption"
						gutterBottom
					>
						defaultValue
					</Typography>
					<TextField width="100%" placeholder="defaultValue" onChange={onChangeDefaultValueHandler} value={defaultValue} />
					<Typography
						sx={{
							fontWeight: "bold",
							mt: 1,
							fontFamily: Font.fontFamily,
						}}
						variant="caption"
						gutterBottom
					>
						value
					</Typography>
					<TextField width="100%" placeholder="value" onChange={onChangeTextFieldHandler} value={textFieldValue} />
					<Typography
						sx={{
							fontWeight: "bold",
							mt: 1,
							fontFamily: Font.fontFamily,
						}}
						variant="caption"
						gutterBottom
					>
						title
					</Typography>
					<TextField width="100%" placeholder="title" onChange={onChangeTitleHandler} value={title} />
					<Typography
						sx={{
							fontWeight: "bold",
							mt: 1,
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
							return (
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
							inputProps={{ 'aria-label': 'controlled' }}
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
				</Stack>
			</Stack>
			<Box sx={{ mt: 2 }}>
				<CodeComponent
					language="typescript"
					children={String(TextFieldCode).replace(/\n$/, "")}
				/>
			</Box>
		</Box>
	)
}

export default function TextFieldWrapper(props: any) {
	return (
		<Box display={"flex"} width={"100%"} flexDirection={"column"}>
			<Box justifyContent={"center"} display={"flex"} width={"100%"}>
				<TextFieldCompo />
			</Box>
		</Box>
	)
}