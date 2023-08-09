import React from "react";
import MoaTextField, {type  MoaTextFieldProps} from "./Styled";
import Box  from "@mui/material/Box";

MoaTextfield.defaultProps = {
	title :"",
	titlePosition: "left",
	defaultValue: "",
	error: false,
	disabled : false
}

/**
 * @param {MoaTextFieldProps} props - deafaultValue, title, titlePosition
 * @returns {React.ReactElement} moaTextField
 */

function MoaTextfield(props: MoaTextFieldProps) : React.ReactElement {
	const {defaultValue, title, titlePosition, ...rest} = props;

	const boxStyle = React.useCallback((position: MoaTextFieldProps["titlePosition"]) => {
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
	}, [titlePosition])

	return (
		<React.Fragment>
			{ title !== "" ?
				<Box style={boxStyle(titlePosition)} sx={(titlePosition === "label") ? {flexDirection:"column"} : {flexDirection:"row"}}>
					{
						titlePosition === "right" ?
						<React.Fragment>
							<MoaTextField defaultValue={defaultValue} {...rest} />
							<div>{title}</div>
						</React.Fragment>
						:
						<React.Fragment>
							<div>{title}</div>
							<MoaTextField defaultValue={defaultValue} {...rest}/>
						</React.Fragment>
					}
				</Box>
				:
				<MoaTextField defaultValue={defaultValue} {...rest}/>
			}
		</React.Fragment>
	)
}

export default MoaTextfield;