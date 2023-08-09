import StyledComponent, { type StyledProps } from "./Styled";

MoaPanel.defaultProps = {
	children: <></>,
	variant: 'shadow',
	width: 'fit-content',
	height: 'fit-content',
}

/**
 * Panel
 * @param props
 * @returns JSX.Element
 */
function MoaPanel(props: StyledProps) : JSX.Element {
	return ( <StyledComponent {...props} /> )
}

export default MoaPanel;