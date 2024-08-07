import { ExperimentalPolygons as Polygons } from "@midasit-dev/moaui-components-v1";

const App = () => {
  return (
		<Polygons
			panelProps={{
				variant: 'shadow2',
				padding: 0,
			}}
			scale={10}
			data={[
				{
					coordinates: [[0,0], [0,6], [10,6], [10,21], [16,21], [16,0]],
					fill: "#E6E6FA",
					fillOpacity: 0.5,
					fillRule: "evenodd",
					stroke: "#a1a1a1",
					strokeLinecap: "round",
					strokeLinejoin: "round",
					strokeDasharray: "5,5",
					strokeDashoffset: 2,
					labelColor: '#c30010',
					labels: ['(1)-B(Two)', 'Desc1', 'Desc2'],
					labelSpacing: 2,
					labelPosition: 'rightBottom',
				},
				{
					coordinates: [[0,6], [0,21], [10,21], [10,6]],
					fill: "#98FB98",
					fillOpacity: 0.5,
					fillRule: "evenodd",
					stroke: "#a1a1a1",
					labels: ['(2)-C(Two)'],
				},
				{
					coordinates: [[0,21], [0,30], [29,30], [29,16], [16,16], [16,21]],
					fill: "#FFFFE0",
					fillOpacity: 0.5,
					fillRule: "evenodd",
					stroke: "#a1a1a1",
					labels: ['(3)-C(Two)'],
				},
				{
					coordinates: [[16,6], [16,16], [29,16], [39,16], [39,0], [29,0], [29,6]],
					fill: "#ADD8E6",
					fillOpacity: 0.5,
					fillRule: "evenodd",
					stroke: "#a1a1a1",
					labels: ['(4)-E(Two)'],
				},
				{
					coordinates: [[29, 16], [29, 30], [36, 30], [36, 21], [50, 21], [50, 16]],
					fill: "#B0E0E6",
					fillOpacity: 0.5,
					fillRule: "evenodd",
					stroke: "#a1a1a1",
					labels: ['(5)-B(Two)'],
				},
				{
					coordinates: [[36, 21], [36, 30], [50, 30], [50, 21]],
					fill: "#F08080",
					fillOpacity: 0.5,
					fillRule: "evenodd",
					stroke: "#a1a1a1",
					labels: ['(6)-C(Two)'],
				},
				{
					coordinates: [[39, 0], [39, 13], [50, 13], [50, 0]],
					fill: "#AFE4DE",
					fillOpacity: 0.5,
					fillRule: "evenodd",
					stroke: "#a1a1a1",
					labels: ['(7)-D(Two)'],
				},
				{
					coordinates: [[16, 6], [16, 0], [29, 0], [29, 6]],
					fill: "#9ACD32",
					fillOpacity: 0.5,
					fillRule: "evenodd",
					stroke: "#a1a1a1",
					labels: ['(8)-F(Two)'],
				},
			]}
		/>
  );
}

export default App;

// /**
// 	 * The coordinates of the Polygon.
// 	 */
// 	coordinates: number[][],

// 	/**
// 	 * The scale of the Polygon.
// 	 * @defaultValue 10
// 	 */
// 	scale?: number,

// 	/**
// 	 * The fill of the Polygon.
// 	 */
// 	fill?: string,
// 	/**
// 	 * The fillOpacity of the Polygon.
// 	 */
// 	fillOpacity?: number,
// 	/**
// 	 * The fillRule of the Polygon.
// 	 */
// 	fillRule?: "nonzero" | "evenodd" | "inherit",

// 	/**
// 	 * The stroke of the Polygon.
// 	 */
// 	stroke?: string,
// 	/**
// 	 * The strokeWidth of the Polygon.
// 	 */
// 	strokeWidth?: string,
// 	/**
// 	 * The strokeLinecap of the Polygon.
// 	 */
// 	strokeLinecap?: "butt" | "round" | "square" | "inherit",
// 	/**
// 	 * The strokeLinejoin of the Polygon.
// 	 */
// 	strokeLinejoin?: "round" | "bevel" | "miter" | "inherit",
// 	/**
// 	 * The strokeDasharray of the Polygon.
// 	 */
// 	strokeDasharray?: string,
// 	/**
// 	 * The strokeDashoffset of the Polygon.
// 	 */
// 	strokeDashoffset?: number,

// 	/**
// 	 * The labelColor of the Polygon.
// 	 */
// 	labelColor?: string,
// 	/**
// 	 * The labels of the Polygon.
// 	 */
// 	labels?: string[],
// 	/**
// 	 * The labelSpacing of the Polygon.
// 	 */
// 	labelSpacing?: number,