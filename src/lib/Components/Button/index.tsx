import StyledComponent, { type StyledProps } from "./Styled";

Button.defaultProps = {
	variant: "contained",
	disabled: false,
	loading: false,
} as StyledProps;

Button.sampleProps = {
	children: "Button",
	onClick: () => {},
	variant: "contained",
	disabled: false,
	width: '100px',
	color: "normal",
	loading: false,
} as StyledProps;

/**
 * moaui Styled Button
 * 
 * @param props 
 * @returns React.ReactElement
 */
function Button(props: StyledProps) {	
	return <StyledComponent {...props} />
}

export default Button;

export {
	type StyledProps,
}