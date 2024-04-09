import StyledComponent, { type StyledProps } from "./Styled";

/**
 * moaui Styled TabGroup
 * 
 * @param props
 * @returns JSX.Element
 */
const TabGroup = (props: StyledProps) => (<StyledComponent {...props} />);

TabGroup.defaultProps = {} as StyledProps;

const SampleProps = {};

export default TabGroup;

export {
	type StyledProps as TabGroupProps,
	SampleProps as TabGroupSample,
}