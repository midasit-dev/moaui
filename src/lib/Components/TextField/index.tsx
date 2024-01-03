import React from "react";
import StyledComponent, {type StyledProps} from "./Styled";
import MoaStack from "../Stack";
import { Typography, Stack } from "../..";
import * as mui from "@mui/material";

Textfield.defaultProps = {
	autoFocus: false,
	type: "text",
	title : "",
	titlePosition : "left",
	error : false,
	disabled : false,
	spacing: 1,
	textAlign: "left",
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
		// if(position === "left")
		// 	return {
		// 		display: "inline-flex", alignItems:"center"
		// 	}
		// if(position === "label")
		// 	return {
		// 		display: "inline-flex",  alignItems:"flex-start", justifyContent:"center"
		// 	}
		// if(position === "right")
		// 	return {
		// 		display: "inline-flex",  alignItems:"center"
		// 	}
		return {}
	}, [])

	return (
		<React.Fragment>
			{ title !== "" ?
				<MoaStack 
					width={props?.width}
					{...boxStyle(titlePosition)} 
					direction={(titlePosition === "label") ? "column" : "row"}
					spacing={props.spacing}
				>
					{
						titlePosition === "right" ?
						<>
							<StyledComponent {...rest} />
							<Typography center>{`${title}`}</Typography>
						</>
						:
						<>
							<Typography center>{`${title}`}</Typography>
							<StyledComponent {...rest}/>
						</>
					}
				</MoaStack>
				:
				<StyledComponent {...rest}/>
			}
		</React.Fragment>
	)
}

export default Textfield;