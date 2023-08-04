import React from "react";
import MoaTextField from "./Styled";
import { Typography, Box } from "@mui/material";

type MoaTextfieldProps = {
	frontText:string,
	children: string
}

MoaTextfield.defaultProps = {
	frontText :"",
	children: "TextField"
}

function MoaTextfield(props: MoaTextfieldProps) : React.ReactElement {
	const frontText = props.frontText;
	const textFieldText:string = props.children;
	return (
		<React.Fragment>
			<Box>
				<MoaTextField value={textFieldText} />
			</Box>
		</React.Fragment>
	)
}

export default MoaTextfield;