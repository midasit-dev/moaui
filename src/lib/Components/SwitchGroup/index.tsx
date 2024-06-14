import StyledComponent, { type StyledProps } from "./Styled";

/**
 * moaui Styled Switch (Group)
 * 
 * @param props - children, text
 * @example
 * <SwitchGroup
 * 	id=""
 * 	text="Switch Group"	
 * >
 * 	{children}
 * </SwitchGroup>
 * @returns React.ReactElement
 */
const SwitchGroup = (props: StyledProps) => (<StyledComponent {...props} />);

const SampleProps = {};

export default SwitchGroup;

export {
	type StyledProps as SwitchGroupProps,
	SampleProps as SwitchGroupSample,
}
