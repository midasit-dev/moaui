import StyledComponent, { type StyledProps } from "./Styled";

MoaPanel.defaultProps = {
	children: <></>,
	variant: 'shadow',
	width: 'fit-content',
	height: 'fit-content',
}

/**
 * <Panel />
 * @returns PanelComponent
 */
function MoaPanel(props: StyledProps) : React.ReactElement {
	return ( <StyledComponent {...props} /> )
}

export default MoaPanel;