import StyledComponent, { type StyledProps } from "./Styled";

MoaTypography.defaultProps = {
	children: <></>,
	variant: "body1",
	color: "primary"
}
function MoaTypography(props: StyledProps) : React.ReactElement {
	const children = props.children;
	const variant = props.variant;
	const color = props.color;

	return (
		<StyledComponent 
			variant={variant} 
			color={color}
		>
			{children}
		</StyledComponent>
	)
}

export default MoaTypography;