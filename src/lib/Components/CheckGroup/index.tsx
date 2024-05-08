import StyledComponent, { type StyledProps } from "./Styled";

/**
 * moaui Styled Check Group.
 * 
 * @param props - text, children
 * @example
 * <CheckGroup id="" text="Check Group">
 * 	<Check />
 * 	<Check />
 * 	<Check />
 * </CheckGroup> 
 * @returns React.ReactElement
 */
const CheckGroup = (props: StyledProps) => (<StyledComponent {...props} />);

CheckGroup.defaultProps = {};

const SampleProps = {};

export default CheckGroup;

export {
	type StyledProps as CheckGroupProps,
	SampleProps as CheckGroupSample,
}