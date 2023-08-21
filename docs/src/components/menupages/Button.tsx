import React from "react";
import Button from "@midasit-dev/moaui/dist/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import CodeComponent from "./CodeBlock";
import DropList from "@midasit-dev/moaui/dist/DropList";

const ImportCode = `import Button from "@midasit-dev/moaui/dist/Button"`;

export default function ButtonCompo(props: any) {
	const [DropListValue, setDropListValue] = React.useState("contained");
	
	const ButtonCode = `function ButtonCompo(props: any) {
	return (
		<Button variant="${DropListValue}">MoaButton</Button>
	)
}
`;
	const itemList = new Map();
	itemList.set("contained", "contained");
	itemList.set("outlined", "outlined");
	itemList.set("text", "text");

	function onChangeHandler(event: any) {
		setDropListValue(event.target.value);
	}

	return (
		<Box display={"flex"} width={"100%"} flexDirection={"column"}>
			<Typography sx={{fontWeight: 'bold'}} variant="h4" gutterBottom>
				MoaButton
			</Typography>
			<Typography sx={{fontWeight: 'bold'}} variant="h6" gutterBottom>
				Introduction
			</Typography>
			<Typography variant="body1" gutterBottom>
				The MoaButton component is a part of our React project that utilizes the
				moaui component library.
			</Typography><br/>
			<Typography sx={{fontWeight: 'bold'}} variant="h6" gutterBottom>
				Getting Started
			</Typography>
			<Typography variant="body1" gutterBottom>
				To use the MoaButton component from the moaui library in your React project, follow these steps:
			</Typography>
			<CodeComponent language="typescript" children={String(ImportCode).replace(/\n$/, "")}/>
			<br/>
			<Typography sx={{fontWeight: 'bold'}} variant="subtitle2" gutterBottom>
				Installation
			</Typography>
			<Typography variant="body2" gutterBottom>
				First, ensure that you have the moaui library and any other required dependencies installed in your project.
				You can install moaui using npm
			</Typography>
			<Box
				justifyContent={"center"}
				display={"flex"}
				width={"100%"}
			>
				<Box
					sx={{
						border: "1px solid #95d6fc",
						paddingRight: "1rem", paddingLeft:"1rem", paddingTop:"0.5rem", paddingBottom:"0.5rem",
						backgroundColor: "#FFFFFF",
						mt: 2, mb:2,
						borderRadius: 5,
						boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.25)"
					}}
					display={"flex"}
					width={"60%"}
					justifyContent={"center"}
					flexDirection={"column"}
				>	
					<Stack direction={"row"}>
						<Box display={"flex"} justifyContent={"center"} alignItems={"center"} width={"70%"} height="6rem">
							<Button variant={DropListValue as "contained" | "outlined" | "text"}>MoaButton</Button>
						</Box>
						<Divider variant="middle" orientation="vertical" flexItem/>
						<Box display={"flex"} justifyContent={"center"} alignItems={"center"} width={"30%"} height="6rem">
							<DropList itemList={itemList} defaultValue="contained" value={DropListValue} onChange={onChangeHandler}/>
						</Box>
					</Stack>
					<Box>
						<CodeComponent
							language="typescript"
							children={String(ButtonCode).replace(/\n$/, "")}
						/>
					</Box>
				</Box>
			</Box>

		</Box>
	);
}
