import StyledComponent, { type StyledProps } from "./Styled";

/**
 * moaui Styled Typography Group
 * 
 * @param props - titleText, bodyText
 * @example
 * <TypographyGroup
 * 	titleText="Title"
 * 	bodyText="Body"
 * />
 * @returns JSX.Element
 */
const TypographyGroup = (props: StyledProps) => (<StyledComponent {...props} />);

TypographyGroup.defaultProps = {
	titleText: "",
	bodyText: ""
} as StyledProps;

const SampleProps = {};

export default TypographyGroup;

export {
	type StyledProps as TypographyGroupProps,
	SampleProps as TypographyGroupSample,
}