/**
 *	                        __                                                   
 *	  ___ ___       __     /\_\     ___                 __      _____    _____   
 *	/' __` __`\   /'__`\   \/\ \  /' _ `\             /'__`\   /\ '__`\ /\ '__`\ 
 *	/\ \/\ \/\ \ /\ \L\.\_  \ \ \ /\ \/\ \           /\ \L\.\_ \ \ \L\ \\ \ \L\ \
 *	\ \_\ \_\ \_\\ \__/.\_\  \ \_\\ \_\ \_\          \ \__/.\_\ \ \ ,__/ \ \ ,__/
 *	 \/_/\/_/\/_/ \/__/\/_/   \/_/ \/_/\/_/  _______  \/__/\/_/  \ \ \/   \ \ \/ 
 *	                                        /\______\             \ \_\    \ \_\ 
 *	                                        \/______/              \/_/     \/_/ 
 */

import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

//@midasit-dev/moaui
import { GuideBox, Panel, Typography, ComponentsIconButtonWithName } from "@midasit-dev/moaui";

//Components
import CompApplyT3 from './Components/ApplyT3';
import CompAddButton from './Components/AddButton';
import CompTemperatureGradientChart from './Components/TemperatureGradientChart';
import CompGirderMaterial from './Components/GirderMaterial';
import CompImportSectionButton from './Components/ImportSectionButton';
import CompSelfEqStressesCharts from './Components/SelfEqStressesCharts';
import CompZone from './Components/Zone';
import CompGirderType from './Components/GirderType';
import CompSurface from './Components/Surface';

import CompTableMaterialStress from './Components/MaterialStressTables';

//Variables
import { 
	VarApplyT3, 
	VarApplyT3C, 
	VarApplyT3H, 
	VarImportSectionButton, 
	VarCalculationParseResult,
	VarGirderMaterial,
	VarZone,
	VarSurface,
	VarTemperatureGradientChart,
	VarSelfEqStressesTempHeatingChart,
	VarSelfEqStressesTempCoolingChart,
} from './Components/variables';

//pyscript util
import { dbRead } from './pyscript_utils';

const App = () => {
	const visible = false;

	//UI Values
	const importSectionValue = useRecoilValue(VarImportSectionButton);
	const zoneValue = useRecoilValue(VarZone);
	const surfaceValue = useRecoilValue(VarSurface);
	const girderMatlValue = useRecoilValue(VarGirderMaterial);
	const applyT3 = useRecoilValue(VarApplyT3);
	const applyT3H = useRecoilValue(VarApplyT3H);
	const applyT3C = useRecoilValue(VarApplyT3C);

	//Setters
	const setCalcValue = useSetRecoilState(VarCalculationParseResult);
	const setTempGradientChartValue = useSetRecoilState(VarTemperatureGradientChart);
	const setSelfEqStressLeftValue = useSetRecoilState(VarSelfEqStressesTempHeatingChart);
	const setSelfEqStressRightValue = useSetRecoilState(VarSelfEqStressesTempCoolingChart);

	React.useEffect(() => {
		if (importSectionValue.selected !== '') {
			executeMainFunction({
				importSectionValue,
				girderMatlValue,
				zoneValue,
				surfaceValue,
				applyT3,
				applyT3H,
				applyT3C,
				setCalcValue,
				setTempGradientChartValue,
				setSelfEqStressLeftValue,
				setSelfEqStressRightValue,
			});
		}
	},[zoneValue, surfaceValue, girderMatlValue, applyT3, applyT3C, applyT3H, importSectionValue.ids, importSectionValue.items, importSectionValue.selected, setCalcValue, setSelfEqStressLeftValue, setSelfEqStressRightValue, setTempGradientChartValue, importSectionValue]);

	return (
    <GuideBox show={visible} width={1100} padding={1} spacing={2}>
      {/** Top Panels */}
      <GuideBox show={visible} row spacing={2} center height={520}>
        <Panel variant="shadow2" height={505}>
          <GuideBox show={visible} fill="2">
            <GuideBox show={visible} width="100%" height={30} fill="3" verCenter>
              <Typography variant="h1">Girder Properties</Typography>
            </GuideBox>
            <GuideBox show={visible} width="100%" fill="3" spacing={1.5}>
              <CompGirderType />
              <CompZone />
              <CompSurface />
              <CompGirderMaterial />
              <CompApplyT3 />
            </GuideBox>
            <GuideBox show={visible} width="100%" fill="3" marginTop={2}>
							<CompTableMaterialStress />
            </GuideBox>
          </GuideBox>
        </Panel>
        <Panel variant="shadow2" height={505}>
          <GuideBox show={visible} fill="2" spacing={2}>
            <GuideBox show={visible} width="100%" height={30} fill="3" center>
              <Typography variant="h1">Temperature Gradient</Typography>
            </GuideBox>
            <GuideBox show={visible} width="100%" fill="3" center>
              	<CompTemperatureGradientChart />
            </GuideBox>
          </GuideBox>
        </Panel>
        <Panel variant="shadow2" height={505}>
          <GuideBox show={visible} fill="2" spacing={2}>
            <GuideBox show={visible} width="100%" height={30} fill="3" center>
              <Typography variant="h1">Self Equilibrating Stresses</Typography>
            </GuideBox>
            <GuideBox show={visible} width="100%" fill="3" center row>
              <CompSelfEqStressesCharts />
            </GuideBox>
          </GuideBox>
        </Panel>
      </GuideBox>

      {/** Bottom Buttons */}
      <GuideBox show={visible} row fill="2" center>
        <GuideBox show={visible} width="30%" height={30} fill="3" row spacing={2} verCenter>
					<ComponentsIconButtonWithName iconName="Help" />
          <CompImportSectionButton />
        </GuideBox>
        <GuideBox show={visible} width="69%" height={30} fill="4" row spacing={3} horRight verCenter>
          <Typography>
            The above Temperature Gradient Loads in MIDAS Civil Load Cases
          </Typography>
          <CompAddButton />
        </GuideBox>
      </GuideBox>
    </GuideBox>
  );
};

export default App;

const executeMainFunction = ({
	//UI Values
	importSectionValue,
	girderMatlValue,
	zoneValue,
	surfaceValue,
	applyT3,
	applyT3H,
	applyT3C,

	//Setters
	setCalcValue,
	setTempGradientChartValue,
	setSelfEqStressLeftValue,
	setSelfEqStressRightValue,
}: any) => {
	const section_Key = parseInt(importSectionValue.ids[importSectionValue.items.indexOf(importSectionValue.selected)]);
	const main_func = pyscript.interpreter.globals.get("main_calculation");
	const results = main_func(
		section_Key,
		girderMatlValue,
		zoneValue,
		surfaceValue,
		applyT3,
		parseFloat(applyT3H),
		parseFloat(applyT3C),
		JSON.stringify(dbRead('UNIT')),
		JSON.stringify(dbRead('SECT')),
		JSON.stringify(dbRead('MATL'))
	);
	const json_parse_results = JSON.parse(results);
	setCalcValue(json_parse_results);

	//Update Temperature Gradient Chart Values
	{
		let chart1HeightItem = [ { x: 0.0, y: 0.0 }, { x: 0.0, y: -json_parse_results["height"] }, ];

		let chart1HeatingItem = [];
		for (let i = 0; i < json_parse_results["inf_point"].length; i++) {
			chart1HeatingItem.push({ x: json_parse_results["inf_temp_h"][i], y: json_parse_results["inf_point"][i] });
		}

		let chart1CoolingItem = [];
		for (let i = 0; i < json_parse_results["inf_point"].length; i++) {
			chart1CoolingItem.push({ x: json_parse_results["inf_temp_c"][i], y: json_parse_results["inf_point"][i] });
		}

		setTempGradientChartValue([
			{ id: "TempHeating", 	color: "#f47560", data: chart1HeatingItem, },
			{ id: "TempCooling", 	color: "#1f78b4", data: chart1CoolingItem, },
			{ id: "Girder", 			color: "#333333", data: chart1HeightItem,  },
		]);
	}

	//Update Self Equilibrating Stresses Chart Values
	{
		const chart1HeightItem = [
			{ 'x': 0.0, 'y': 0.0 },
			{ 'x': 0.0, 'y': -json_parse_results["height"] }
		];

		const self_eq_stress = json_parse_results["self_eq_stress"];
		let x_outer_h_stress: any[] = self_eq_stress[0][0]["s"];
		let y_outer_h_stress: any[] = self_eq_stress[0][0]["z"];
		
		let sorted_indices_outer_h: number[] = y_outer_h_stress.map((v, i) => i).sort((a, b) => y_outer_h_stress[a] - y_outer_h_stress[b]);
		
		x_outer_h_stress = sorted_indices_outer_h.map(i => x_outer_h_stress[i]);
		y_outer_h_stress = sorted_indices_outer_h.map(i => y_outer_h_stress[i]);
		
		if (self_eq_stress[4].length > 0) {
			let x_slab_h_stress: any[] = self_eq_stress[4][0]["s"];
			let y_slab_h_stress: any[] = self_eq_stress[4][0]["z"];
		
			const sorted_indices_slab_h: number[] = y_slab_h_stress.map((v, i) => i).sort((a, b) => y_slab_h_stress[a] - y_slab_h_stress[b]);
		
			x_slab_h_stress = sorted_indices_slab_h.map(i => x_slab_h_stress[i]);
			y_slab_h_stress = sorted_indices_slab_h.map(i => y_slab_h_stress[i]);
			x_outer_h_stress = x_outer_h_stress.concat(x_slab_h_stress);
			y_outer_h_stress = y_outer_h_stress.concat(y_slab_h_stress);
		}
		
		let chart2HeatingItem:any = [];
		for (let i = 0; i < x_outer_h_stress.length; i++){
			chart2HeatingItem.push({ 'x': x_outer_h_stress[i], 'y': y_outer_h_stress[i] });
		}

		setSelfEqStressLeftValue([
			{ 'id': 'AASHTO_HeatingG', 	'color': '#f47560', 'data': chart2HeatingItem, 	},
			{ 'id': 'Girder', 					'color': '#333333', 'data': chart1HeightItem, 	},
		])

		let x_outer_c_stress: any[] = self_eq_stress[1][0]["s"];
		let y_outer_c_stress: any[] = self_eq_stress[1][0]["z"];
		
		const sorted_indices_outer_c: number[] = y_outer_c_stress.map((v, i) => i).sort((a, b) => y_outer_c_stress[a] - y_outer_c_stress[b]);
		
		x_outer_c_stress = sorted_indices_outer_c.map(i => x_outer_c_stress[i]);
		y_outer_c_stress = sorted_indices_outer_c.map(i => y_outer_c_stress[i]);
		
		if (self_eq_stress[5].length > 0) {
			let x_slab_c_stress: any[] = self_eq_stress[5][0]["s"];
			let y_slab_c_stress: any[] = self_eq_stress[5][0]["z"];
		
			const sorted_indices_slab_c: number[] = y_slab_c_stress.map((v, i) => i).sort((a, b) => y_slab_c_stress[a] - y_slab_c_stress[b]);
		
			x_slab_c_stress = sorted_indices_slab_c.map(i => x_slab_c_stress[i]);
			y_slab_c_stress = sorted_indices_slab_c.map(i => y_slab_c_stress[i]);
			x_outer_c_stress = x_outer_c_stress.concat(x_slab_c_stress);
			y_outer_c_stress = y_outer_c_stress.concat(y_slab_c_stress);
		}

		let chart2CoolingItem:any = [];
		for (let i = 0; i < x_outer_c_stress.length; i++){
			chart2CoolingItem.push({ 'x': x_outer_c_stress[i], 'y': y_outer_c_stress[i] });
		}

		setSelfEqStressRightValue([
			{ 'id': 'AASHTO_CoolingG', 	'color': '#1f78b4', 'data': chart2CoolingItem, 	},
			{ 'id': 'Girder', 					'color': '#333333', 'data': chart1HeightItem, 	},
		])
	}
}