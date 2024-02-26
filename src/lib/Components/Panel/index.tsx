import StyledComponent, { type StyledProps } from "./Styled";

Panel.defaultProps = {
	children: <></>,
	variant: 'shadow',
	width: 'fit-content',
	height: 'fit-content',
	flexItem: false,
} as StyledProps;

Panel.sampleProps = {
	children: <></>,
	variant: 'shadow2',
	width: '100px',
	height: '100px',
	flexItem: false,
	backgroundColor: '#fff',
	borderRadius: '5px',
	border: 'none',
	relative: false,
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

export { 
	type StyledProps,
};