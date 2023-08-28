import StyledComponent, { type StyledProps } from "./Styled";

Moabutton.defaultProps = {
	children: "Button",
	onClick: () => {},
	variant: "contained",
	disabled: false,
	width: "auto"
}

function Moabutton(props: StyledProps) : React.ReactElement {	
	return (
		<StyledComponent {...props} />
	)
}

export default Moabutton;