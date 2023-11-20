import React from "react";
import StyledComponent, {type StyledProps} from "./Styled";
import MoaStack from "../Stack";
import MoaTypography from "../Typography";
import * as mui from "@mui/material";

Textfield.defaultProps = {
	autoFocus: false,
	type: "text",
	title : "",
	titlePosition : "left",
	error : false,
	disabled : false
} as StyledProps;

/**
 * moaui Styled TextField
 * 
 * @param {MoaTextFieldProps} props - defaultValue, title, titlePosition, error, disabled, placeholder, onChange
 * @returns {React.ReactElement} moaTextField
 */

function Textfield(props: StyledProps) : React.ReactElement {
	const {title, titlePosition, ...rest} = props;

	const boxStyle = React.useCallback((position: StyledProps["titlePosition"]) => {
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
	}, [])

	return (
		<React.Fragment>
			{ title !== "" ?
				<MoaStack 
					width={props?.width} 
					{...boxStyle(titlePosition)} 
					direction={(titlePosition === "label") ? "column" : "row"}
				>
					{
						titlePosition === "right" ?
						<React.Fragment>
							<StyledComponent {...rest} />
							<mui.Typography sx={{
								display: 'flex'
							}}>
								Test
							</mui.Typography>
							{/* <MoaTypography>{title}</MoaTypography> */}
						</React.Fragment>
						:
						<React.Fragment>
							<MoaTypography>{title}</MoaTypography>
							<StyledComponent {...rest}/>
						</React.Fragment>
					}
				</MoaStack>
				:
				<StyledComponent {...rest}/>
			}
		</React.Fragment>
	)
}

export default Textfield;