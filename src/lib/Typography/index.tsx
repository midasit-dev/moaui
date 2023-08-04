import StyledComponent from "./Styled";

type MoaTypographyProps = {
	children: React.ReactNode;
	variant: string;
	color: string;
}

MoaTypography.defaultProps = {
	children: <></>,
	variant: "body1",
	color: "primary"
}

function MoaTypography(props: MoaTypographyProps) : React.ReactElement {
	const children = props.children;
	const variant = props.variant;
	const color = props.color;

	return (
		<StyledComponent variant={variant} color={color}>
			{children}
		</StyledComponent>
	)
}

export default MoaTypography;