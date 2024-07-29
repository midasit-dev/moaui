import { ChartLine } from "@midasit-dev/moaui-components-v1";/**${comma}*/

const ComponentsChartLineAxisTopRight = () => {
	return (
		<ChartLine 
			data={[
				{
					'id': 'TempHeating',
					'color': '#f47560',
					'data': [
						{ 'x': 23.0, 'y': 0.0 },
						{ 'x': 6.0, 'y': -100.0 },
						{ 'x': 0.0, 'y': -400.0 },
						{ 'x': 0.0, 'y': -2130.0 },
						{ 'x': 3.0, 'y': -2330.0 },
					],
				},
				{
					'id': 'TempCooling',
					'color': '#1f78b4',
					'data': [
						{ 'x': -4.6, 'y': 0.0 },
						{ 'x': -1.2, 'y': -100.0 },
						{ 'x': 0.0, 'y': -400.0 },
						{ 'x': 0.0, 'y': -2130.0 },
						{ 'x': -3.0, 'y': -2330.0 },
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
			axisTopTickValues={5}
			axisTopDecimals={2}
			axisTopTickRotation={-30}
			axisRight
			axisRightTickValues={5}
			axisRightDecimals={2}
			axisRightTickRotation={-30}
			width={300}
			marginTop={60}
			marginRight={70}
			marginLeft={1}
			marginBottom={1}
		/>
	);
}/**${comma}*/

export default ComponentsChartLineAxisTopRight;