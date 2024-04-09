import StyledComponent, { type StyledProps } from "./Styled";

/**
 * moaui Styled Check Group.
 * 
 * @param props 
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