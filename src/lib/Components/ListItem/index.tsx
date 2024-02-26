import React from "react";
import StyledComponent, {type StyledProps} from "./Styled";

ListItem.defaultProps = {
	paddingLeft: 0,
	disableGutters: false
} as StyledProps;

/**
 * moaui Styled ListItem
 * 
 * @param props 
 * @returns React.ReactElement
 */
export default function ListItem(props: StyledProps): React.ReactElement {
	return (
		<StyledComponent {...props}/>
	)
}