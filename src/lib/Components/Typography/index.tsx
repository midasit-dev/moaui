import { toUnionType } from "../../Common/UnionType";
import StyledComponent, { type StyledProps } from "./Styled";

/**
 * moaui Styled Typography
 * @param props
 * @returns TypographyComponent
 */
const Typography = (props: StyledProps) => {
	const children = props.children;
	return (
		<StyledComponent {...props}>
			{children}
		</StyledComponent>
	)
}

Typography.defaultProps = {
	children: "",
	variant: "body1",
	color: "primary",
} as StyledProps;

const SampleProps = {
	children: "Typography",
	variant: toUnionType({ values: ["h1", "body1", "body2", "body3"] }),
	color: toUnionType({ values: ["primary", "secondary", "tertiary", "quaternary"] }),
	width: 'auto',
	height: 'auto',
	size: toUnionType({ values: ["small", "medium", "large"] }),
	verTop: false,
	verCenter: false,
	verBottom: false,
	horLeft: false,
	horCenter: false,
	horRight: false,
	center: false,
};

export default Typography;

export {
	type StyledProps as TypographyProps,
	SampleProps as TypographySample,
}