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

//@midasit-dev/moaui
import {
  GuideBox,
  Panel,
  Typography,
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
import CompImportSectionButtonHelp from "./Components/ImportSectionButtonHelp";

const App = () => {
  const visible = false;

  return (
		<GuideBox show={visible} width={1450} padding={1} spacing={2}>
      {/** Top Panels */}
      <GuideBox show={visible} width='inherit' row spacing={2} center height={520}>
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
              <GuideBox row horSpaceBetween width="inherit">
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
      <GuideBox show={visible} width='inherit' row fill="2" center>
        <GuideBox
          show={visible}
          width="30%"
          height={30}
          fill="3"
          row
          spacing={2}
          verCenter
        >
					<CompImportSectionButtonHelp />
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
