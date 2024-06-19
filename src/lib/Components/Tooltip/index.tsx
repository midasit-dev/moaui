import StyledComponent, { type StyledProps } from "./Styled";

/**
 * moaui Styled Tooltip
 * 
 * @param props - children, title, placement, open, arrowBorder
 * @example
 * <Tooltip
 * 	id=""
 * 	title={React.ReactNode}
 * 	placement={'bottom-end' || 'bottom-start' || 'bottom' || 'left-end' || 'left-start' || 'left' || 'right-end' || 'right-start' || 'right' || 'top-end' || 'top-start' || 'top'}
 * 	open={true || false}
 * 	arrowBorder={true || false}
 * >
 * 	{children}
 * </Tooltip>
 * @returns React.ReactElement
 */
const Tooltip = (props: StyledProps) => (<StyledComponent {...props} />);

const SampleProps = {};

export default Tooltip;

export {
	type StyledProps as TooltipProps,
	SampleProps as TooltipSample,
}