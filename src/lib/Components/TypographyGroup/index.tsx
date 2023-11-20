import StyledComponent, { type StyledProps } from "./Styled";

TypographyGroup.defaultProps = {
	titleText: "",
	bodyText: ""
} as StyledProps;

/**
 * moaui Styled Typography Group
 * 
 * @param props
 * @returns JSX.Element
 */
function TypographyGroup(props: StyledProps) : JSX.Element {
	return (
		<StyledComponent {...props} />
	)
}

export default TypographyGroup;