import React from "react";
import StyledComponent, {type StyledProps} from "./Styled";

Separator.defaultProps = {
	direction: "horizontal"
} as StyledProps;

/**
 * moaui Styled Separator
 * 
 * @param {MoaSeparatorProps} props - direction
 * @returns {React.ReactElement} MoaSeparator
 */
export default function Separator(props:StyledProps): React.ReactElement {
	return (
		<StyledComponent {...props}/>
	)
}