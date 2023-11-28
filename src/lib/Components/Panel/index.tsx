import StyledComponent, { type StyledProps } from "./Styled";

Panel.defaultProps = {
	children: <></>,
	variant: 'box',
	width: 'fit-content',
	height: 'fit-content',
	flexItem: false,
} as StyledProps;

/**
 * moaui Styled Panel
 * 
 * @param props
 * @returns JSX.Element
 */
function Panel(props: StyledProps) : JSX.Element {
	return ( <StyledComponent {...props} /> )
}

export default Panel;