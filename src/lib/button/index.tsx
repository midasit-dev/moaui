import React from "react";
import MoaButton from "@moaui/lib/button/Styled";

function Moabutton(props: any) {
	const buttonText:string = props.children;
	const onClickEvent = props.onClick;
	return (
		<MoaButton onClick={onClickEvent}>{buttonText}</MoaButton>
	)
}

export default Moabutton;