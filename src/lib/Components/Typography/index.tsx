import StyledComponent, { type StyledProps } from "./Styled";

Typography.defaultProps = {
	children: "",
	variant: "body1",
	color: "primary",
	textAlign: "left",
} as StyledProps;

/**
 * moaui Styled Typography
 * @param props
 * @returns TypographyComponent
 */
function Typography(props: StyledProps) : JSX.Element {
	const children = props.children;
	return (
		<StyledComponent {...props}>
			{children}
		</StyledComponent>
	)
}

export default Typography;