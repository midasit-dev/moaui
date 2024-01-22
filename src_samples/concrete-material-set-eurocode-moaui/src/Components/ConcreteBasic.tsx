/**
 *		                                                                         __      
 *		                                                                        /\ \__   
 *		  ___     ___     ___ ___     _____     ___     ___       __     ___    \ \ ,_\  
 *		 /'___\  / __`\ /' __` __`\  /\ '__`\  / __`\ /' _ `\   /'__`\ /' _ `\   \ \ \/  
 *		/\ \__/ /\ \L\ \/\ \/\ \/\ \ \ \ \L\ \/\ \L\ \/\ \/\ \ /\  __/ /\ \/\ \   \ \ \_ 
 *		\ \____\\ \____/\ \_\ \_\ \_\ \ \ ,__/\ \____/\ \_\ \_\\ \____\\ \_\ \_\   \ \__\
 *		 \/____/ \/___/  \/_/\/_/\/_/  \ \ \/  \/___/  \/_/\/_/ \/____/ \/_/\/_/    \/__/
 *		                                \ \_\                                            
 *		                                 \/_/                                            
 */

import React from "react";
import { useRecoilState } from "recoil";
import { VarGenProp, VarConcGrade, VarConcGamma, VarConcChartItemNb, VarConcGammaErr } from "./variables";
import { GuideBox, Typography, TextField, DropList, Stack, DataGrid, Panel } from "@midasit-dev/moaui";
import { useGridApiRef, GridColDef } from '@mui/x-data-grid';
import { checkPyScriptReady } from '../utils_pyscript';
import { chartBasic, useValidationRange1 } from './ComponentUser';
import { useSnackbar } from 'notistack';

const ConcreteBasic = () => {
	const [concGrade, setConcGrade] = useRecoilState(VarConcGrade);
	const [concGamma, setConcGamma] = useRecoilState(VarConcGamma);
	const [concGammaErr, setConcGammaErr] = useRecoilState(VarConcGammaErr);
	const [rowsGenProp, setRowsGenProp] = useRecoilState(VarGenProp);
	const apiRef = useGridApiRef();

	const [chartData, setChartData] = React.useState([{ id: "Area", lineType: "solid", areaType: "empty", data: [{ x: 0, y: 0 }] }]);
	const [chartColor, setChartColor] = React.useState(["rgb(97, 205, 187)", "rgb(255, 127, 14)"]);
	const [yscalemax, setYscalemax] = React.useState(0.0);

	const [ConcChartItemNb, setConcChartItemNb] = useRecoilState(VarConcChartItemNb);
	const chartItem = new Map<string, number>([
		['for non-linear structural analysis', 1],
		['for the design of cross-section: Parabola-rectangle', 2],
		['for the design of cross-section: Bi-linear', 3],
	]);

	//Concrete Grade
	const gradeItems = new Map<string, number>([
		['C12/15', 12],
		['C16/20', 16],
		['C20/25', 20],
		['C25/30', 25],
		['C30/37', 30],
		['C35/45', 35],
		['C40/50', 40],
		['C45/55', 45],
		['C50/60', 50],
		['C55/67', 55],
		['C60/75', 60],
		['C70/85', 70],
		['C80/95', 80],
		['C90/105', 90]
	]);

	//Validation
	useValidationRange1(concGamma, setConcGammaErr, 1.0);

	//Snackbar
	const { enqueueSnackbar } = useSnackbar();

	//General Properties
	React.useEffect(() => {

		// Calculations General Properties
		checkPyScriptReady(() => {
			const ConcGenProp = pyscript.interpreter.globals.get("concrete_properties");
			const ConcGenPropResults = ConcGenProp(concGrade);
			const parsedConcGenProp = JSON.parse(ConcGenPropResults);

			setRowsGenProp(() => {
				return [
					{ id: 1, desc: 'Density, ρ', value: parsedConcGenProp.density, unit: 'kN/m³/g' },
					{ id: 2, desc: 'Unit Weight, w', value: parsedConcGenProp.weight, unit: 'kN/m³' },
					{ id: 3, desc: 'Elastic Modulus, E', value: parsedConcGenProp.Elastic, unit: 'MPa' },
					{ id: 4, desc: 'Shear Modulus, G', value: parsedConcGenProp.Shear, unit: 'MPa' },
					{ id: 5, desc: 'poisson\'s ratio, ν', value: parsedConcGenProp.Poisson, unit: '-' },
					{ id: 6, desc: 'Coefficient of thermal expansion, α', value: parsedConcGenProp.Thermal, unit: '1/°C' },
				]
			});

			// Calculations Stress-Strain relation of Concrete 
			const SScurve = pyscript.interpreter.globals.get("stain_stress_curve");
			const SScurveResults = SScurve(concGrade, parseFloat(concGamma));
			const parsedSSCurve = JSON.parse(SScurveResults);

			if (parsedSSCurve.hasOwnProperty("error")) {
				enqueueSnackbar(parsedSSCurve["error"], { variant: "error" });
				setChartData([{ id: "error", lineType: "solid", areaType: "empty", data: [{ x: 0, y: 0 }] }])
				return;
			}

			let new_charts_data = [];
			let new_charts_color = [];
			let new_maxY = 0;

			const yscale = (graphData: any) => {
				let maxY = graphData[0].y;
				for (const point of graphData) {
					if (point.y > maxY) {
						maxY = point.y;
					}
				}
				maxY = (maxY * 1.1);
				maxY = Math.ceil(maxY);
				return maxY
			}

			if (ConcChartItemNb === 1) {
				new_charts_data.push(
					{
						id: "stress-strain relation",
						lineType: "solid",
						areaType: "Full",
						data: parsedSSCurve.nonlinear
					},
					{
						id: "elastic modulus",
						lineType: "dotted",
						areaType: "empty",
						data: parsedSSCurve.elastic_modulus
					}
				);
				new_charts_color.push(
					"rgb(97, 205, 187)",
					"rgb(255, 127, 14)"
				);
				new_maxY = yscale(parsedSSCurve.nonlinear);

			} else if (ConcChartItemNb === 2) {
				new_charts_data.push(
					{
						id: "fcd with αcc = 0.80",
						lineType: "dotted",
						areaType: "min",
						data: parsedSSCurve.parabola_min
					},
					{
						id: "fcd with αcc = 0.85",
						lineType: "solid",
						areaType: "mean",
						data: parsedSSCurve.parabola_bridge
					},
					{
						id: "fcd with αcc = 1.00",
						lineType: "dotted",
						areaType: "max",
						data: parsedSSCurve.parabola_max
					},
					{
						id: "fck",
						lineType: "solid",
						areaType: "empty",
						data: parsedSSCurve.parabola_pure
					}
				);
				new_charts_color.push(
					"rgb(97, 205, 187)",
					"rgb(97, 205, 187)",
					"rgb(97, 205, 187)",
					"rgb(52, 58, 63)"
				);
				new_maxY = yscale(parsedSSCurve.parabola_pure);

			} else if (ConcChartItemNb === 3) {
				new_charts_data.push(
					{
						id: "fcd with αcc = 0.80",
						lineType: "dotted",
						areaType: "min",
						data: parsedSSCurve.bilinear_min
					},
					{
						id: "fcd with αcc = 0.85",
						lineType: "solid",
						areaType: "mean",
						data: parsedSSCurve.bilinear_bridge
					},
					{
						id: "fcd with αcc = 1.00",
						lineType: "dotted",
						areaType: "max",
						data: parsedSSCurve.bilinear_max
					},
					{
						id: "fck",
						lineType: "solid",
						areaType: "empty",
						data: parsedSSCurve.bilinear_pure
					}
				);
				new_charts_color.push(
					"rgb(97, 205, 187)",
					"rgb(97, 205, 187)",
					"rgb(97, 205, 187)",
					"rgb(52, 58, 63)"
				);
				new_maxY = yscale(parsedSSCurve.bilinear_pure);
			}
			setYscalemax(new_maxY);
			setChartData(new_charts_data);
			setChartColor(new_charts_color);
		})
	}, [concGrade, concGamma, ConcChartItemNb, setRowsGenProp, setChartData, setChartColor, setYscalemax, setConcGammaErr, enqueueSnackbar])

	// DataGride Columns
	const columns: GridColDef[] = [
		{ field: 'desc', headerName: 'Discription', type: 'string', width: 260, sortable: false },
		{ field: 'value', headerName: 'Value', type: 'string', width: 130, sortable: false },
		{ field: 'unit', headerName: 'Unit', type: 'string', width: 70, sortable: false },
	];

	return (
		<GuideBox row width='100%' spacing={1} horSpaceBetween>
			<GuideBox width={500} column spacing={1}>
				<Panel variant="shadow2" width="100%" height={380}>
					<GuideBox width="100%" column spacing={1}>
						<GuideBox width="100%" row horSpaceBetween verCenter>
							<Typography>
								Concrete Grade
							</Typography>
							<DropList
								itemList={gradeItems}
								width={120}
								value={concGrade}
								onChange={(e: any) => setConcGrade(e.target.value)}
							/>
						</GuideBox>
						<GuideBox width="100%" row horSpaceBetween verCenter>
							<Typography>
								Concrete partial material safety factor, γc
							</Typography>
							<TextField
								type="number"
								width={120}
								value={concGamma.toString()}
								onChange={(e: any) => setConcGamma(e.target.value)}
								error={concGammaErr}
							/>
						</GuideBox>
						<GuideBox width="100%" column spacing={1} paddingTop={1}>
							<Typography>
								General material properties for Reinforced Concrete
							</Typography>
							<Stack direction="row" height={229} width="100%">
								<DataGrid
									apiRef={apiRef}
									rows={rowsGenProp}
									columns={columns}
									disableColumnMenu={true}
									columnHeaderHeight={50}
									hideFooter
								/>
							</Stack>
						</GuideBox>
					</GuideBox>
				</Panel>
			</GuideBox>
			<GuideBox show={false} width={600} column>
				<Panel variant="shadow2" width="100%" height={380}>
					<GuideBox width="100%" row horSpaceBetween verCenter>
						<Typography>
							Stress-Strain relation of Concrete
						</Typography>
						<DropList
							itemList={chartItem}
							width={380}
							value={ConcChartItemNb}
							onChange={(e: any) => setConcChartItemNb(e.target.value)}
						/>
					</GuideBox>
					<GuideBox width="100%">
						{chartBasic(chartData, chartColor, yscalemax, 3.5, "Strain, εc (‰)", " Stress, σc (MPa)")}
					</GuideBox>
				</Panel>
			</GuideBox>
		</GuideBox>
	);
};

export default ConcreteBasic;
