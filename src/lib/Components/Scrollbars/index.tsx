import React from "react";
import StyledComponent, {type StyledProps} from "./Styled";

Scrollbars.defaultProps = {
	outline: 'box',
} as StyledProps;

/**
 * moaui Styled Scrollbars
 *  
 * @param props 
 * @returns React.ReactElement
 */
export default function Scrollbars(props: StyledProps): React.ReactElement {
	return (
		<StyledComponent {...props}/>
	)
}