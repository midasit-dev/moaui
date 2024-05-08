import StyledComponent, { type StyledProps } from "./Styled";

/**
 * moaui Styled ScatterPlot
 * 
 * @param props - data, width, height, margin, xScale, xFormat, yScale, yFormat, axisTop, axisRight, axisLeft, axisBottom, legends, legendsDefault, nodeSize
 * @link https://nivo.rocks/scatterplot
 * @returns React.ReactElement
 */
const ScatterPlot = (props: StyledProps) => (<StyledComponent {...props} />);

ScatterPlot.defaultProps = {} as StyledProps;

const SampleProps = {
	data: [
		{"id": "dot1", "data":  [{"x": 1.1, 		 "y": 2.1}]},
		{"id": "dot2", "data":  [{"x": 1.358819, "y": 2.065926}]},
		{"id": "dot3", "data":  [{"x": 1.6, 		 "y": 1.966025}]},
		{"id": "dot4", "data":  [{"x": 1.807107, "y": 1.807107}]},
		{"id": "dot5", "data":  [{"x": 1.966025, "y": 1.6}]},
		{"id": "dot6", "data":  [{"x": 2.065926, "y": 1.358819}]},
		{"id": "dot7", "data":  [{"x": 2.1, 		 "y": 1.1}]},
		{"id": "dot8", "data":  [{"x": 2.065926, "y": 0.841181}]},
		{"id": "dot9", "data":  [{"x": 1.966025, "y": 0.6}]},
		{"id": "dot10", "data": [{"x": 1.807107, "y": 0.392893}]},
		{"id": "dot11", "data": [{"x": 1.6, 		 "y": 0.233975}]},
		{"id": "dot12", "data": [{"x": 1.358819, "y": 0.134074}]},
		{"id": "dot13", "data": [{"x": 1.1, 		 "y": 0.1}]},
		{"id": "dot14", "data": [{"x": 0.841181, "y": 0.134074}]},
		{"id": "dot15", "data": [{"x": 0.6, 		 "y": 0.233975}]},
		{"id": "dot16", "data": [{"x": 0.392893, "y": 0.392893}]},
		{"id": "dot17", "data": [{"x": 0.233975, "y": 0.6}]},
		{"id": "dot18", "data": [{"x": 0.134074, "y": 0.841181}]},
		{"id": "dot19", "data": [{"x": 0.1, 		 "y": 1.1}]},
		{"id": "dot20", "data": [{"x": 0.134074, "y": 1.358819}]},
		{"id": "dot21", "data": [{"x": 0.233975, "y": 1.6}]},
		{"id": "dot22", "data": [{"x": 0.392893, "y": 1.807107}]},
		{"id": "dot23", "data": [{"x": 0.6, 		 "y": 1.966025}]},
		{"id": "dot24", "data": [{"x": 0.841181, "y": 2.065926}]},
		{"id": "dot25", "data": [{"x": 1.1, 		 "y": 2.1}]},
		{"id": "dot26", "data": [{"x": 1.358819, "y": 2.065926}]},
		{"id": "dot27", "data": [{"x": 1.6, 		 "y": 1.966025}]},
		{"id": "dot28", "data": [{"x": 1.807107, "y": 1.807107}]},
		{"id": "dot29", "data": [{"x": 1.966025, "y": 1.6}]},
		{"id": "dot30", "data": [{"x": 2.065926, "y": 1.358819}]},
	],
	width: '100%',
	height: '400px',
	margin: {
		top: 		50,
		right: 	50,
		bottom: 50,
		left: 	50,
	},
	xScale: {
		type: 'linear',
		min: 0,
		max: 'auto',
	},
	xFormat: '>-.2f',
	yScale: {
		type: 'linear',
		min: 0,
		max: 'auto'
	},
	yFormat: '>-.2f',
	axisTop: {
		tickSize: 5, 
		tickPadding: 5, 
		tickRotation: 0, 
		legend: "TOP", 
		legendPosition: "middle", 
		legendOffset: -36, 
		truncateTickAt: 0, 
	},
	axisRight: {
		tickSize: 5, 
		tickPadding: 5, 
		tickRotation: 0, 
		legend: "RIGHT", 
		legendPosition: "middle", 
		legendOffset: 50, 
		truncateTickAt: 0, 
	},
	axisLeft: {
		tickSize: 5, 
		tickPadding: 5, 
		tickRotation: 0, 
		legend: "LEFT", 
		legendPosition: "middle", 
		legendOffset: -50, 
		truncateTickAt: 0, 
	},
	axisBottom: {
		tickSize: 5, 
		tickPadding: 5, 
		tickRotation: 0, 
		legend: "BOTTOM", 
		legendPosition: "middle", 
		legendOffset: 36, 
		truncateTickAt: 0, 
	},
	legendsDefault: false,
	nodeSize: {
		key: 'data.x',
		values: [0, 2],
		sizes: [8, 32]
	},
};

export default ScatterPlot;

export { 
	type StyledProps as ScatterPlotProps,
	SampleProps as ScatterPlotSample,
}