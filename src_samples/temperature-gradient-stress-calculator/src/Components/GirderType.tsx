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
import { useRecoilValue } from "recoil";
import { VarGirderType, VarImportSectionButton } from "./variables";
import { GuideBox, Typography } from "@midasit-dev/moaui";

const CompGirderType = () => {
  const girderType = useRecoilValue(VarGirderType);
  const importSectionValue = useRecoilValue(VarImportSectionButton);

  return (
    <GuideBox width="100%" row horSpaceBetween>
      <GuideBox row horSpaceBetween verCenter height={30}>
        <Typography>
          Girder Type
        </Typography>
        {importSectionValue.selected !== "" ? (
          <Typography flexItem textAlign="center">
            {girderType}
          </Typography>
        ) : (
          <Typography flexItem textAlign="center" color="red">
            There is no selected section.
          </Typography>
        )}
      </GuideBox>
			<GuideBox width={43} height={30} />
    </GuideBox>
  );
};

export default CompGirderType;
