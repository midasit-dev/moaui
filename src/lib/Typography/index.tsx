import StyledComponent, { type StyledProps } from "./Styled";

MoaTypography.defaultProps = {
	children: <></>,
	variant: "body1",
	color: "primary"
}

/**
 * Typography
 * @param props
 * @returns TypographyComponent
 */
function MoaTypography(props: StyledProps) : JSX.Element {
	const children = props.children;
	return (
		<StyledComponent {...props}>
			{children}
		</StyledComponent>
	)
}

export default MoaTypography;