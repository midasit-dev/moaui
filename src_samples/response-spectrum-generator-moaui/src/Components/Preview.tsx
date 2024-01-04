import React from 'react';
import { Button, ChartLine, Color, Dialog, GuideBox } from "@midasit-dev/moaui";
import { 
	createGraphData4NZS1170_5_2004,
 } from "../pyscript_utils";
import { 
	VarDesignSpectrum,
	VarDesignDuctilityFactor,
  VarDistanceFromNearestMajorFault,
  VarHazardFactor,
  VarReturnPeriodFactor,
  VarSiteSubSoilClass,
	VarMaximumPeriod,
} from "./variables";
import { useRecoilValue } from "recoil";
import { useSnackbar } from 'notistack';

interface ChartData {
	id: string;
	color: string;
	data: { x: string, y: string }[];
}

const CompPreview = () => {
	const design_spectrum = useRecoilValue(VarDesignSpectrum);

  //NZS1170.5 (2004)용 데이터
  const site_sub_soil_class = useRecoilValue(VarSiteSubSoilClass);
  const return_period_factor = useRecoilValue(VarReturnPeriodFactor);
  const hazard_factor = useRecoilValue(VarHazardFactor);
  const distance_from_nearest_major_fault = useRecoilValue(VarDistanceFromNearestMajorFault);
  const design_ductility_factor = useRecoilValue(VarDesignDuctilityFactor);

  const maximum_period = useRecoilValue(VarMaximumPeriod);

	const [loading, setLoading] = React.useState(false);
	const { enqueueSnackbar } = useSnackbar();
	const [open, setOpen] = React.useState(false);
	const [chartData, setChartData] = React.useState<ChartData[]>([]);

	return (
		<GuideBox>
			<Button
				onClick={() => {
					setLoading(true);

					setTimeout(() => {
						try {
							if (design_spectrum === 1) {
								const result = createGraphData4NZS1170_5_2004(
									site_sub_soil_class,
									return_period_factor,
									hazard_factor,
									distance_from_nearest_major_fault,
									design_ductility_factor,
									maximum_period,
								);

								const arrX = result["period"];
								const arrY = result["value"];
								if (arrX.length !== arrY.length) {
									enqueueSnackbar('Creating graph data is failed (Calc Input Error)', { variant: 'error' });
									return;
								}

								const data_of_chart = [];
								for (let i = 0; i < arrX.length; i++) {
									data_of_chart.push({ 'x': arrX[i], 'y': arrY[i] });
								}

								setChartData([
									{
										id: 'TempHeating',
										'color': Color.secondary.main,
										'data': data_of_chart,
									}
								]);
							}
						} catch (e: any) {
							console.error(e);
						} finally {
							enqueueSnackbar('Creating graph data is successfully', { variant: 'success' });
							setLoading(false);
							setOpen(true);
						}
					}, 500);
				}}
				loading={loading}
			>
				Preview
			</Button>
			<Dialog
				open={open}
				setOpen={setOpen}
				headerTitle='Preview Design Spectrum'
			>
				<CompChartLeftBottom 
					data={chartData}
				/>
			</Dialog>
		</GuideBox>
	);
}

export default CompPreview;

const CompChartLeftBottom = (props: any) => {
	const { data } = props;

	return (
		<ChartLine 
			width={500}
			data={data}
			axisBottom
			axisBottomTickValues={5}
			axisBottomDecimals={1}
			axisBottomTickRotation={0}
			axisLeft
			axisLeftTickValues={5}
			axisLeftDecimals={1}
			axisLeftTickRotation={0}
			marginTop={40}
			marginRight={10}
			marginLeft={70}
			marginBottom={60}
			pointSize={0}
		/>
	);
}