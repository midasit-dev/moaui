import { ExperimentalPolygon as Polygon } from "@midasit-dev/moaui-components-v1";

const coordinates = [
	[0, 0],
	[0, 6],
	[10, 6],
	[10, 21],
	[16, 21],
	[16, 0]
];

const App = () => {
  return (
		<Polygon
			coordinates={coordinates}
			scale={10}
			fill="#f5f6f7"
			fillRule="evenodd"
			stroke="#a1a1a1"
			strokeWidth="1"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeDasharray="1 1"
			strokeDashoffset={1}
			labels={[
				'Label 1', 
				'Label 2', 
				'Label 3'
			]}
			labelSpacing={1}
			labelPosition="center"
		/>
  );
}

export default App;