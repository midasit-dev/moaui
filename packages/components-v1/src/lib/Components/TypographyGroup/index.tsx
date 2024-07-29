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
const TypographyGroup = (props: StyledProps) => {
	const _props = { ...props } as StyledProps;
  return <StyledComponent {..._props} />;
};

const SampleProps = {};

export default TypographyGroup;

export {
	type StyledProps as TypographyGroupProps,
	SampleProps as TypographyGroupSample,
}