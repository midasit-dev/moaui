import StyledComponent, { type StyledProps } from "./Styled";

MoaPanel.defaultProps = {
	children: <></>,
	variant: 'shadow',
	width: 'fit-content',
	height: 'fit-content',
}
function MoaPanel(props: StyledProps) : React.ReactElement {
	const children = props.children;
	const variant = props.variant;
	const width = props.width;
	const height = props.height;
	return (
		<StyledComponent 
			children={children}	
			variant={variant}
			width={width}
			height={height}
		/>
	)
}

export default MoaPanel;