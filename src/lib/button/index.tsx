import MoaButton, { type MoabuttonProps } from "./Styled";

Moabutton.defaultProps = {
	children: "Button",
	onClick: () => {},
	variant: "contained",
	disabled: false,
	width: "auto"
}

function Moabutton(props: MoabuttonProps) : React.ReactElement {	
	return (
		<MoaButton {...props} />
	)
}

export default Moabutton;