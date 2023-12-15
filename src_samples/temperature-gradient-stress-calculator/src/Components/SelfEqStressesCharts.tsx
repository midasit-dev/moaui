import { ChartLine } from '@midasit-dev/moaui';

const LeftChart = ({
	data
}: any) => {
	return (
		<ChartLine 
			data={data}
			axisTop
			axisTopTickValues={4}
			axisTopTickRotation={-30}
			axisTopDecimals={2}
			axisRight
			axisRightTickValues={4}
			axisRightTickRotation={-30}
			axisRightDecimals={2}
			width={250}
			height={400}
			pointSize={0}
		/>
	);
}


const RightChart = ({
	data
}: any) => {
	return (
		<ChartLine 
			data={data}
			axisTop
			axisTopTickValues={4}
			axisTopTickRotation={-30}
			axisTopDecimals={2}
			axisRight
			axisRightTickValues={4}
			axisRightTickRotation={-30}
			axisRightDecimals={2}
			width={250}
			height={400}
			pointSize={0}
		/>
	);
}

const SelfEqStressesCharts = ({
	leftValue,
	rightValue,
}: any) => {
	return (
		<>
			<LeftChart data={leftValue} />
			<RightChart data={rightValue} />
		</>
	)
}

export default SelfEqStressesCharts;