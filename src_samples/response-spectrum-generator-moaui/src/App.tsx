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
import { Color, GuideBox, Panel, Typography, IconButton, Icon, Button } from "@midasit-dev/moaui";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  VarDesignDuctilityFactor,
  VarDistanceFromNearestMajorFault,
  VarFuncName,
  VarHazardFactor,
  VarMaximumPeriod,
  VarReturnPeriodFactor,
  VarSiteSubSoilClass,
} from "./Components/variables";
import CompTypographyAndTextField from "./Components/TypographyAndTextField";
import CompDesignSpectrum from "./Components/DesignSpectrum";
import CompSubSoilClass from "./Components/SubSoilClass";
import CompDistanceFromNearestMajorFault from "./Components/DistanceFromNearestMajorFault";

const App = () => {
  const [func_name, setFunc_name] = useRecoilState(VarFuncName);
  const site_sub_soil_class = useRecoilValue(VarSiteSubSoilClass); 
	const [return_period_factor, setReturn_period_factor] = useRecoilState(VarReturnPeriodFactor);
  const [hazard_factor, setHazard_factor] = useRecoilState(VarHazardFactor);
  const distance_from_nearest_major_fault = useRecoilValue(VarDistanceFromNearestMajorFault);
  const [design_ductility_factor, setDesign_ductility_factor] = useRecoilState(VarDesignDuctilityFactor);
  const [maximum_period, setMaximum_period] = useRecoilState(VarMaximumPeriod);

  return (
    //You can modify the code here and test.
    <GuideBox width="100%" center>
      <GuideBox width={400} verCenter horSpaceBetween spacing={2} padding={2}>

        <CompTypographyAndTextField title="Function Name" state={func_name} setState={setFunc_name} blueTitle />
        <CompDesignSpectrum />

				<GuideBox row verCenter>
					<Typography flexItem textAlign="center" variant="h1" height={30} color={Color.secondary.main}>
						Seismic Data
					</Typography>
					<IconButton onClick={() => {}} transparent>
						<Icon iconName="InfoOutlined" />
					</IconButton>
				</GuideBox>
        <Panel variant="shadow2" width="100%">
          <GuideBox width="100%" spacing={2}>
            <CompSubSoilClass />
            <CompTypographyAndTextField title="Return Period Factor (R)" state={return_period_factor} setState={setReturn_period_factor} />
            <CompTypographyAndTextField title="Hazard Factor (Z)" state={hazard_factor} setState={setHazard_factor} />
						<CompDistanceFromNearestMajorFault />
            <CompTypographyAndTextField title="Design Ductility Factor" state={design_ductility_factor} setState={setDesign_ductility_factor} />
          </GuideBox>
        </Panel>

				<CompTypographyAndTextField title="Maximum Period (sec)" state={maximum_period} setState={setMaximum_period} blueTitle />

				<GuideBox row verCenter>
					<GuideBox row verCenter width="50%">
						<IconButton onClick={() => {}} transparent>
							<Icon iconName="Help" />
						</IconButton>
						<Button>Preview</Button>
					</GuideBox>
					<GuideBox horRight width="50%">
						<Button>OK</Button>
					</GuideBox>
				</GuideBox>
      </GuideBox>
    </GuideBox>
  );
};

export default App;
