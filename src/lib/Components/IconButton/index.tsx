import React from "react";
import StyledComponent, { StyledProps } from "./Styled";

IconButton.defaultProps = {
	children: <div />,
	onClick: () => {},
} as StyledProps;

/**
 * moaui Styled Icon Button
 * 
 * @param props 
 * @returns JSX.Element
 */

function IconButton(props: StyledProps) : React.ReactElement {
	return (
		<StyledComponent {...props} />
	)
}

export default IconButton;