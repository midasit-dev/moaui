import React from 'react';
import { Button, ChartLine, Color, Dialog, GuideBox, Panel, Typography } from "@midasit-dev/moaui";
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

const CompPreviewRight = () => {
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
	const [chartData, setChartData] = React.useState<ChartData[]>([]);
	const processing = React.useRef(false);

	React.useEffect(() => {
    if (processing.current) return;

    setLoading(true);

    setTimeout(() => {
      try {
        processing.current = true;

        if (design_spectrum === 1) {
          const result = createGraphData4NZS1170_5_2004(
            site_sub_soil_class,
            return_period_factor,
            hazard_factor,
            distance_from_nearest_major_fault,
            design_ductility_factor,
            maximum_period
          );

          const arrX = result["period"];
          const arrY = result["value"];
          if (arrX.length !== arrY.length) {
            enqueueSnackbar(
              "Creating graph data is failed (Calc Input Error)",
              { variant: "error" }
            );
            return;
          }

          const data_of_chart = [];
          for (let i = 0; i < arrX.length; i++) {
            data_of_chart.push({ x: arrX[i], y: arrY[i] });
          }

          setChartData([
            {
              id: "TempHeating",
              color: Color.secondary.main,
              data: data_of_chart,
            },
          ]);
        }
      } catch (e: any) {
        console.error(e);
      } finally {
        enqueueSnackbar("Updating graph data is successfully", {
          variant: "success",
        });
        setLoading(false);

        processing.current = false;
      }
    }, 500);
  }, [
    design_spectrum,
    site_sub_soil_class,
    return_period_factor,
    hazard_factor,
    distance_from_nearest_major_fault,
    design_ductility_factor,
    maximum_period,
    enqueueSnackbar,
  ]);

	return (
		<Panel variant="shadow2" height="inherit" padding={2}>
			<GuideBox height="100%" verSpaceBetween>
				<GuideBox show fill='1' width="100%" center padding={1} borderRadius={1}>
					<Typography variant='h1'>Preview Design Spectrum</Typography>
				</GuideBox>
				<GuideBox loading={loading} center>
					<CompChartLeftBottom data={chartData} />
				</GuideBox>
			</GuideBox>
		</Panel>
	);
}

export default CompPreviewRight;

const CompChartLeftBottom = (props: any) => {
	const { data } = props;

	return (
		<ChartLine 
			width={500}
			data={data}
			axisBottom
			axisBottomTickValues={5}
			axisBottomDecimals={2}
			axisBottomTickRotation={0}
			axisBottomLegend='Period (sec)'
			axisBottomLegendOffset={50}
			axisLeft
			axisLeftTickValues={5}
			axisLeftDecimals={5}
			axisLeftTickRotation={0}
			axisLeftLegend='Spectral Data'
			axisLeftLegendOffset={-80}
			marginTop={20}
			marginRight={20}
			marginLeft={90}
			marginBottom={60}
			pointSize={0}
			xDecimals={2}
			yDecimals={4}
		/>
	);
}