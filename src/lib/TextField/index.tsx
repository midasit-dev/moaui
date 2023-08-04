import React from "react";
import MoaTextField, {type  MoaTextFieldProps} from "./Styled";
import Box  from "@mui/material/Box";

MoaTextfield.defaultProps = {
	title :"",
	titlePosition: "",
	defaultValue: "TextField"
}

function MoaTextfield(props: MoaTextFieldProps) : React.ReactElement {
	const textFieldText:string = props.defaultValue;
	const title:string = props.title ? props.title : "";
	const titlePosition:string = props.titlePosition ? props.titlePosition : "";

	const boxStyle = (position: string) => {
		if(position === "left")
			return {
				display: "inline-flex", alignItems:"center", gap:"0.25rem"
			}
		if(position === "label")
			return {
				display: "inline-flex",  alignItems:"flex-start", justifyContent:"center"
			}
		if(position === "right")
			return {
				display: "inline-flex",  alignItems:"center", gap:"0.25rem"
			}
	}

	return (
		<React.Fragment>
			{ title !== "" &&
				<Box style={boxStyle(titlePosition)} sx={(titlePosition === "label") ? {flexDirection:"column"} : {flexDirection:"row"}}>
					{
						titlePosition === "right" ?
						<React.Fragment>
							<MoaTextField defaultValue={textFieldText} />
							<div>{props.title}</div>
						</React.Fragment>
						:
						<React.Fragment>
							<div>{props.title}</div>
							<MoaTextField defaultValue={textFieldText} />
						</React.Fragment>
					}
				</Box>
			}
		</React.Fragment>
	)
}

export default MoaTextfield;