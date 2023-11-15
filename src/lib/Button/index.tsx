import StyledComponent, { type StyledProps } from "./Styled";

Button.defaultProps = {
	variant: "contained",
	disabled: false,
} as StyledProps;

/**
 * MoaUI Styled Button (Single)
 * 
 * @param props 
 * @returns React.ReactElement
 */
function Button(props: StyledProps) {	
	return <StyledComponent {...props} />
}

export default Button;