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

import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

//@midasit-dev/moaui
import {
  GuideBox,
  Panel,
  Typography,
  ComponentsIconButtonWithName,
} from "@midasit-dev/moaui";

//Components
import CompApplyT3 from "./Components/ApplyT3";
import CompAssignLoadButton from "./Components/AssignLoadButton";
import CompTemperatureGradientChart from "./Components/TemperatureGradientChart";
import CompGirderMaterial from "./Components/GirderMaterial";
import CompImportSectionButton from "./Components/ImportSectionButton";
import CompSelfEqStressesCharts from "./Components/SelfEqStressesCharts";
import CompZone from "./Components/Zone";
import CompGirderType from "./Components/GirderType";
import CompSurface from "./Components/Surface";
import CompUnitNotation from "./Components/UnitNotation";

import CompTableMaterialStress from "./Components/MaterialStressTables";

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
} from "./Components/variables";
import { parseId } from "./utils";
import { checkPyScriptReady } from "./pyscript_utils";
import { useSnackbar } from "notistack";

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
  const setTempGradientChartValue = useSetRecoilState(
    VarTemperatureGradientChart
  );
  const setSelfEqStressLeftValue = useSetRecoilState(
    VarSelfEqStressesTempHeatingChart
  );
  const setSelfEqStressRightValue = useSetRecoilState(
    VarSelfEqStressesTempCoolingChart
  );

  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(() => {
    if (importSectionValue.selected !== "") {
      checkPyScriptReady(() => {
        const section_Key = parseId(importSectionValue.selected);
        const main_func =
          pyscript.interpreter.globals.get("stress_calculation");
        const results = main_func(
          section_Key,
          girderMatlValue,
          zoneValue,
          surfaceValue,
          applyT3,
          parseFloat(applyT3H),
          parseFloat(applyT3C)
        );
        const paringResults = JSON.parse(results);
        if (paringResults.hasOwnProperty("error")) {
          enqueueSnackbar(paringResults["error"], { variant: "error" });
          return;
        }

        setCalcValue(paringResults);

        setTempGradientChartValue([
          {
            id: "TempHeating",
            color: "#f47560",
            data: paringResults["chart_temp_h"],
          },
          {
            id: "TempCooling",
            color: "#1f78b4",
            data: paringResults["chart_temp_c"],
          },
          {
            id: "Girder",
            color: "#333333",
            data: paringResults["chart_girder"],
          },
        ]);

        //Update Self Equilibrating Stresses Chart Values
        setSelfEqStressLeftValue([
          {
            id: "AASHTO_HeatingG",
            color: "#f47560",
            data: paringResults["chart_heating"],
          },
          {
            id: "Girder",
            color: "#333333",
            data: paringResults["chart_girder"],
          },
        ]);

        setSelfEqStressRightValue([
          {
            id: "AASHTO_CoolingG",
            color: "#1f78b4",
            data: paringResults["chart_cooling"],
          },
          {
            id: "Girder",
            color: "#333333",
            data: paringResults["chart_girder"],
          },
        ]);
      });
    }
  }, [
    zoneValue,
    surfaceValue,
    girderMatlValue,
    applyT3,
    applyT3C,
    applyT3H,
    importSectionValue.ids,
    importSectionValue.items,
    importSectionValue.selected,
    setCalcValue,
    setSelfEqStressLeftValue,
    setSelfEqStressRightValue,
    setTempGradientChartValue,
    importSectionValue,
    enqueueSnackbar,
  ]);

  return (
    <GuideBox show={visible} width={1450} padding={1} spacing={2}>
      {/** Top Panels */}
      <GuideBox show={visible} row spacing={2} center height={520}>
        <Panel variant="shadow2" height={505}>
          <GuideBox show={visible} fill="2">
            <GuideBox
              show={visible}
              width="100%"
              height={30}
              fill="5"
              verCenter
              row
              horSpaceBetween
            >
              <GuideBox row horSpaceBetween>
                <Typography variant="h1">Girder Properties</Typography>
                <CompUnitNotation />
              </GuideBox>
              <GuideBox width={43} height={30} />
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
        <GuideBox
          show={visible}
          width="30%"
          height={30}
          fill="3"
          row
          spacing={2}
          verCenter
        >
          <ComponentsIconButtonWithName iconName="Help" />
          <CompImportSectionButton />
        </GuideBox>
        <GuideBox
          show={visible}
          width="70%"
          height={30}
          fill="4"
          row
          spacing={3}
          horRight
          verCenter
        >
          <Typography>
            The above Temperature Gradient Loads in MIDAS Civil Load Cases
          </Typography>
          <CompAssignLoadButton />
        </GuideBox>
      </GuideBox>
    </GuideBox>
  );
};

export default App;
