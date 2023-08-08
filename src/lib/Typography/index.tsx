import StyledComponent, { type StyledProps } from "./Styled";

MoaTypography.defaultProps = {
	children: <></>,
	variant: "body1",
	color: "primary"
}

/**
 * <Typography />
 * @returns TypographyComponent
 */
function MoaTypography(props: StyledProps) : React.ReactElement {
	const children = props.children;
	return (
		<StyledComponent {...props}>
			{children}
		</StyledComponent>
	)
}

export default MoaTypography;