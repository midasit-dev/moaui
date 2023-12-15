import { ChartLine, GuideBox, Check } from '@midasit-dev/moaui';

const ComponentsChartLineAxisTopRight = ({
	data
}: any) => {
	return (
		<ChartLine 
			data={data}
			axisTop
			axisTopTickValues={5}
			axisTopDecimals={2}
			axisTopTickRotation={-30}
			axisRight
			axisRightTickValues={5}
			axisRightDecimals={2}
			axisRightTickRotation={-30}
			width={400}
		/>
	);
}

const TemperatureGradientChart = ({
	value
}: any) => {
	return (
		<GuideBox width="100%" center>
			<GuideBox>
				<ComponentsChartLineAxisTopRight 
					data={value}
				/>
			</GuideBox>
			<GuideBox row spacing={2} center>
				<Check name='Heating' />
				<Check name='Cooling' />
			</GuideBox>
		</GuideBox>
	)
}

export default TemperatureGradientChart
