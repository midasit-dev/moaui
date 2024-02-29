import StyledComponent, { type StyledProps } from "./Styled";

ScatterPlot.defaultProps = {} as StyledProps;

/**
 * moaui Styled ScatterPlot
 * 
 * @param props 
 * @returns React.ReactElement
 */
function ScatterPlot(props: StyledProps) {	
	return <StyledComponent {...props} />
}

export default ScatterPlot;

export { 
	type StyledProps,
}