import React from "react";
import StyledComponent, {type StyledProps} from "./Styled";

Seperator.defaultProps = {
	direction: "horizontal"
} as StyledProps;

/**
 * moaui Styled Seperator
 * 
 * @param {MoaSeperatorProps} props - direction
 * @returns {React.ReactElement} MoaSeperator
 */
export default function Seperator(props:StyledProps): React.ReactElement {
	return (
		<StyledComponent {...props}/>
	)
}