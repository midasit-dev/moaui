import StyledComponent, { type StyledProps } from "./Styled";

Icon.defaultProps = {
	iconName: "Add",
} as StyledProps;

/**
 * moaui Styled Icon (Single)
 * 
 * @param props 
 * @returns React.ReactElement
 */
function Icon(props: StyledProps) : React.ReactElement {
	return (
		<StyledComponent {...props} />
	)
}

export default Icon;