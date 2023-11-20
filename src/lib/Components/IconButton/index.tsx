import React from "react";
import StyledComponent, { StyledProps } from "./Styled";

IconButton.defaultProps = {
	children: <div />,
	onClick: () => {},
}

function IconButton(props: StyledProps) : React.ReactElement {
	return (
		<StyledComponent {...props} />
	)
}

export default IconButton;