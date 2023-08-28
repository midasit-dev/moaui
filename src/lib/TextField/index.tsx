import React from "react";
import MoaTextField, {type StyledProps} from "./Styled";
import MoaStack from "../Stack";
import MoaTypography from "../Typography";

MoaTextfield.defaultProps = {
	title : "",
	titlePosition : "left",
	error : false,
	disabled : false
}

/**
 * @param {MoaTextFieldProps} props - defaultValue, title, titlePosition, error, disabled, placeholder, onChange
 * @returns {React.ReactElement} moaTextField
 */

function MoaTextfield(props: StyledProps) : React.ReactElement {
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
	}, [titlePosition])

	return (
		<React.Fragment>
			{ title !== "" ?
				<MoaStack width={props?.width} {...boxStyle(titlePosition)} direction={(titlePosition === "label") ? "column" : "row"}>
					{
						titlePosition === "right" ?
						<React.Fragment>
							<MoaTextField {...rest} />
							<MoaTypography>{title}</MoaTypography>
						</React.Fragment>
						:
						<React.Fragment>
							<MoaTypography>{title}</MoaTypography>
							<MoaTextField {...rest}/>
						</React.Fragment>
					}
				</MoaStack>
				:
				<MoaTextField {...rest}/>
			}
		</React.Fragment>
	)
}

export default MoaTextfield;