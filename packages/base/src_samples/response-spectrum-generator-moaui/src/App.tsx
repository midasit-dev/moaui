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
import { GuideBox, Panel } from "@midasit-dev/moaui";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  VarDesignSpectrum,
  VarFuncName,
  VarMaximumPeriod,
	VarValids,
} from "./Components/variables";
import CompTypographyAndTextField from "./Components/TypographyAndTextField";
import CompTypographyAndTextFieldNumOnly from "./Components/TypographyAndTextFieldNumOnly";
import CompDesignSpectrum from "./Components/DesignSpectrum";
import CompSeismicDataNZS117052004 from "./Components/SeismicData_NZS1170_5_2004";
import CompHelpDialog from "./Components/HelpDialog";
import CompUpdate from "./Components/Update";
import CompPreviewRight from "./Components/PreviewRight";

const App = () => {
	const valids = useRecoilValue(VarValids);

  const [func_name, setFunc_name] = useRecoilState(VarFuncName);
	const design_spectrum = useRecoilValue(VarDesignSpectrum);
  const [maximum_period, setMaximum_period] = useRecoilState(VarMaximumPeriod);

  return (
    //You can modify the code here and test.
    <GuideBox width="100%" center padding={2}>
			<GuideBox center spacing={2}>

				<GuideBox row spacing={2}>

					<Panel variant="shadow2" padding={2}>
						<GuideBox height={490} spacing={2} verSpaceBetween>
							<CompTypographyAndTextField title="Function Name" state={func_name} setState={setFunc_name} blueTitle placeholder="RS 01" error={!valids.VarFunctionName(func_name)} />
							<CompDesignSpectrum />
							{design_spectrum === 1 && <CompSeismicDataNZS117052004 />}
							{/** 기준이 추가되면 아래로 추가 */}
							<CompTypographyAndTextFieldNumOnly 
								title="Maximum Period (sec)" 
								state={maximum_period} 
								setState={setMaximum_period} 
								blueTitle error={!valids.VarMaximumPeriod(maximum_period)}
								textFieldProps={{
									width: 200, height: 30,
								}}
							/>
						</GuideBox>
					</Panel>

					<Panel variant="shadow2" padding={2}>
						<GuideBox height={490}>
							<CompPreviewRight />
						</GuideBox>
					</Panel>

				</GuideBox>

				<GuideBox width="100%" row horSpaceBetween>
					<CompHelpDialog />
					<CompUpdate />
				</GuideBox>

    	</GuideBox>
    </GuideBox>
  );
};

export default App;
