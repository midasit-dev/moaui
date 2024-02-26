import StyledComponent, { type StyledProps } from "./Styled";

ChartLine.defaultProps = {
	data: [],
	width: '100%',
	height: 400,
	axisTop: false,
	axisRight: false,
	axisLeft: false,
	axisBottom: false,
	legends: false,
	pointSize: 2,
} as StyledProps;

/**
 * moaui Styled ChartLine
 * 
 * @param props 
 * @returns React.ReactElement
 */
function ChartLine(props: StyledProps) {	
	return <StyledComponent {...props} />
}

export default ChartLine;