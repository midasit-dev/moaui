import React from "react";
import StyledComponent, {type StyledProps} from "./Styled";

ListItemButton.defaultProps = {} as StyledProps;

/**
 * moaui Styled ListItemButton
 * 
 * @param props 
 * @returns React.ReactElement
 */
export default function ListItemButton(props: StyledProps): React.ReactElement {
	return (
		<StyledComponent {...props}/>
	)
}