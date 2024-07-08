import { ChartLine } from "@midasit-dev/moaui";

const ComponentsChartLineAxisDecimals = () => {
	return (
		<ChartLine 
			data={[
				{
					'id': 'AASHTO_HeatingG',
					'color': '#f47560',
					'data': [
							{ "x": -5.9701, "y": 0.0 },
							{ "x": -4.2611, "y": -30.0 },
							{ "x": -0.2734, "y": -100.0 },
							{ "x": 0.4872, "y": -230.0 },
							{ "x": 0.6042, "y": -250.0 },
							{ "x": 0.8090, "y": -285.0 },
							{ "x": 0.8968, "y": -300.0 },
							{ "x": 1.4234, "y": -390.0 },
							{ "x": 1.4819, "y": -400.0 },
							{ "x": 1.4723, "y": -410.0 },
							{ "x": 1.2408, "y": -650.0 },
							{ "x": 1.2023, "y": -690.0 },
							{ "x": 0.3537, "y": -1570.0 },
							{ "x": 0.0162, "y": -1920.0 },
							{ "x": -0.0899, "y": -2030.0 },
							{ "x": -0.1525, "y": -2095.0 },
							{ "x": -0.1574, "y": -2100.0 },
							{ "x": -0.1767, "y": -2120.0 },
							{ "x": -0.1863, "y": -2130.0 },
							{ "x": -1.4015, "y": -2330.0 }
					],
				},
				{
					'id': 'Girder',
					'color': '#333333',
					'data': [
						{ 'x': 0.0, 'y': 0.0 },
						{ 'x': 0.0, 'y': -2330.0 },
					],
				},
			]}
			axisTop
			axisTopTickValues={4}
			axisTopTickRotation={-30}
			axisTopDecimals={2}
			axisRight
			axisRightTickValues={4}
			axisRightTickRotation={-30}
			axisRightDecimals={2}
			width={200}
			height={400}
			pointSize={0}
			marginTop={60}
			marginRight={70}
			marginLeft={1}
			marginBottom={1}
			xDecimals={4}
			yDecimals={2}
		/>
	);
}

export default ComponentsChartLineAxisDecimals;