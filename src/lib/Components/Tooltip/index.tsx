import StyledComponent, { type StyledProps } from "./Styled";

Tooltip.defaultProps = {
} as StyledProps;

/**
 * moaui Styled Tooltip
 * 
 * @param props 
 * @returns React.ReactElement
 */
function Tooltip(props: StyledProps) {	
	return <StyledComponent {...props} />
}

export default Tooltip;