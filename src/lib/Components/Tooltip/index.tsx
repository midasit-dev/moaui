import StyledComponent, { type StyledProps } from "./Styled";

/**
 * moaui Styled Tooltip
 * 
 * @param props 
 * @returns React.ReactElement
 */
const Tooltip = (props: StyledProps) => (<StyledComponent {...props} />);

Tooltip.defaultProps = {} as StyledProps;

const SampleProps = {};

export default Tooltip;

export {
	type StyledProps as TooltipProps,
	SampleProps as TooltipSample,
}