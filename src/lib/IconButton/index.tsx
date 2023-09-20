import React from "react";
import MoaIconButton, { StyledProps } from "./Styled";

MoaIconbutton.defaultProps = {
	children: <div />,
	onClick: () => {},
}

function MoaIconbutton(props: StyledProps) : React.ReactElement {
	return (
		<MoaIconButton {...props} />
	)
}

export default MoaIconbutton;