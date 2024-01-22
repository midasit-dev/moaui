import React from 'react';
import { ChartLine, Color, GuideBox, Typography } from "@midasit-dev/moaui";
import { 
	createGraphData4NZS1170_5_2004,
 } from "../utils_pyscript";
import { 
	VarDesignSpectrum,
	VarDesignDuctilityFactor,
  VarDistanceFromNearestMajorFault,
  VarHazardFactor,
  VarReturnPeriodFactor,
  VarSiteSubSoilClass,
	VarMaximumPeriod,
	VarValids,
} from "./variables";
import { useRecoilValue } from "recoil";
import { useSnackbar } from 'notistack';

interface ChartData {
	id: string;
	color: string;
	data: { x: string, y: string }[];
}

const CompPreviewRight = () => {
	const varValids = useRecoilValue(VarValids);

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
					if (!varValids.VarReturnPeriodFactor(return_period_factor) ||
							!varValids.VarHazardFactor(hazard_factor) ||
							!varValids.VarDesignDuctilityFactor(design_ductility_factor) ||
							!varValids.VarDistanceFromNearestMajorFault(distance_from_nearest_major_fault)) {
						throw new Error('Creating graph data is failed (Calc Input Error)');
					}

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
            throw new Error("Creating graph data is failed (Calc Input Error)");
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
					autoHideDuration: 1500,
        });
        setLoading(false);

        processing.current = false;
      }
    }, 500);
  }, [
		varValids,
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
		<GuideBox height="100%" verSpaceBetween>
			<GuideBox show fill='1' width="100%" center padding={1} borderRadius={1}>
				<Typography variant='h1'>Preview Design Spectrum</Typography>
			</GuideBox>
			<GuideBox loading={loading} center>
				<CompChartLeftBottom data={chartData} />
			</GuideBox>
		</GuideBox>
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