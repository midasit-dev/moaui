import StyledComponent, { type StyledProps } from "./Styled";

Panel.defaultProps = {
	children: <></>,
	variant: 'shadow',
	width: 'fit-content',
	height: 'fit-content',
} as StyledProps;

/**
 * Moa UI Styled Panel
 * @param props
 * @returns JSX.Element
 */
function Panel(props: StyledProps) : JSX.Element {
	return ( <StyledComponent {...props} /> )
}

export default Panel;