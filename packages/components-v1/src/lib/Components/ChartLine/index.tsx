import StyledComponent, { type StyledProps } from "./Styled";

/**
 * moaui Styled ChartLine
 * 
 * @param props - data, width, height, axisTop, axisRight, axisBottom, axisLeft, legends, pointSize
 * @example
 * <ChartLine
 * 	data={[
 * 		{
 * 			'id': 'ID1',
 * 			'color': '#87CEEB',
 * 			'data': [
 * 					{ "x": 0, "y": 0 },
 * 					{ "x": 1, "y": 1 },
 * 					{ "x": 2, "y": 2 },
 * 					{ "x": 3, "y": 3 },
 * 					{ "x": 4, "y": 4 },
 * 					{ "x": 7, "y": 5 },
 * 			],
 * 		},
 * 	]}
 * 	width='300px'
 * 	height='300px'
 * 	legends={true} || {false}
 * 	axisTop, axisRight, axisBottom, axisLeft = {true} || {false}
 * 	axisTopLegendPosition, axisRightLegendPosition, axisBottomLegendPosition, axisLeftLegendPosition = 'middle' || 'start' || 'end'
 * 	axisTopLegend='Top' 
 * 	axisRightLegend='Right'
 * 	axisBottomLegend='Bottom'
 * 	axisLeftLegend='Left'
 * 	axisTopTickValues, axisTopTickRotation, axisTopDecimals, axisTopLegendOffset, ... = {number}
 * />
 * @returns React.ReactElement
 */
function ChartLine(props: StyledProps) {
	const _props = { width: '100%', height: 400, axisTop: false, axisRight: false, axisLeft: false, axisBottom: false, legends: false, pointSize: 2, ...props } as StyledProps;
	return <StyledComponent {..._props} />
}

const SampleProps = {
	data: [
		{
			'id': 'ID1',
			'color': '#87CEEB',
			'data': [
					{ "x": 0, "y": 0 },
					{ "x": 1, "y": 1 },
					{ "x": 2, "y": 2 },
					{ "x": 3, "y": 3 },
					{ "x": 4, "y": 4 },
					{ "x": 7, "y": 5 },
			],
		},
	],
	width: '300px',
	height: '300px',
	legends: true,
	axisTop: true,
	axisTopTickValues: 5,
	axisTopTickRotation: 0,
	axisTopDecimals: 0,
	axisTopLegend: 'Top',
	axisTopLegendOffset: -36,
	axisTopLegendPosition: 'middle',
	axisRight: true,
	axisRightTickValues: 5,
	axisRightTickRotation: 0,
	axisRightDecimals: 0,
	axisRightLegend: 'Right',
	axisRightLegendOffset: 50,
	axisRightLegendPosition: 'middle',
	axisBottom: true,
	axisBottomTickValues: 5,
	axisBottomTickRotation: 0,
	axisBottomDecimals: 0,
	axisBottomLegend: 'Bottom',
	axisBottomLegendOffset: 36,
	axisBottomLegendPosition: 'middle',
	axisLeft: true,
	axisLeftTickValues: 5,
	axisLeftTickRotation: 0,
	axisLeftDecimals: 0,
	axisLeftLegend: 'Left',
	axisLeftLegendOffset: -50,
	axisLeftLegendPosition: 'middle',
	pointSize: 1,
	marginTop: 50,
	marginRight: 110,
	marginBottom: 50,
	marginLeft: 60,
	xDecimals: 0,
	yDecimals: 0,
}

export default ChartLine;

export {
	type StyledProps as ChartLineProps,
	SampleProps as ChartLineSample,
}