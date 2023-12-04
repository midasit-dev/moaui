import React from "react";
import StyledComponent, {type StyledProps} from "./Styled";

List.defaultProps = {
	dense: true,
} as StyledProps;

/**
 * moaui Styled List
 * 
 * @param props 
 * @returns React.ReactElement
 */
export default function List(props: StyledProps): React.ReactElement {
	return (
		<StyledComponent {...props}/>
	)
}