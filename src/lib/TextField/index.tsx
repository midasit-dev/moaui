import React from "react";
import MoaTextField, {type  MoaTextFieldProps} from "./Styled";
import MoaTypography from "../Typography";
import MoaStack from "../Stack";
// import Box  from "@mui/material/Box";

MoaTextfield.defaultProps = {
	title : "",
	titlePosition : "left",
	defaultValue : "",
	error : false,
	disabled : false
}

/**
 * @param {MoaTextFieldProps} props - defaultValue, title, titlePosition, error, disabled, placeholder, onChange
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
				<MoaStack width={props?.width} {...boxStyle(titlePosition)} direction={(titlePosition === "label") ? "column" : "row"}>
					{
						titlePosition === "right" ?
						<React.Fragment>
							<MoaTextField defaultValue={defaultValue} {...rest} />
							<MoaTypography>{title}</MoaTypography>
						</React.Fragment>
						:
						<React.Fragment>
							<MoaTypography>{title}</MoaTypography>
							<MoaTextField defaultValue={defaultValue} {...rest}/>
						</React.Fragment>
					}
				</MoaStack>
				:
				<MoaTextField defaultValue={defaultValue} {...rest}/>
			}
		</React.Fragment>
	)
}

export default MoaTextfield;