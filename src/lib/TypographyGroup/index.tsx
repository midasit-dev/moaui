import StyledComponent, { type StyledProps } from "./Styled";

MoaTypographyGroup.defaultProps = {
	titleText: "",
	bodyText: ""
}

/**
 * Typography Group
 * @param props
 * @returns JSX.Element
 */
function MoaTypographyGroup(props: StyledProps) : JSX.Element {
	return (
		<StyledComponent {...props} />
	)
}

export default MoaTypographyGroup;