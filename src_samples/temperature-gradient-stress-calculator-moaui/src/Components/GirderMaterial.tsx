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
import { useRecoilState, useSetRecoilState } from "recoil";
import { VarGirderMaterial, VarGirderMaterialList, VarForceCalcStress } from "./variables";
import { GuideBox, Typography, DropList, IconButton, Icon } from "@midasit-dev/moaui";
import { dbRead } from "../pyscript_utils";
import { useSnackbar } from "notistack";

const CompGirderMaterial = () => {
	const { enqueueSnackbar } = useSnackbar();

	const [value, setValue] = useRecoilState(VarGirderMaterial);
	const [list, setList] = useRecoilState(VarGirderMaterialList);

	const refreshMatlData = React.useCallback(() => {
		const matlData = dbRead('MATL');
		if (matlData.hasOwnProperty('error')) {
			enqueueSnackbar(matlData.error, { variant: 'error' });
			return;
		}
		const items: [string, number][] = [];
		const ids = Object.keys(matlData);
		for (const id of ids) {
			if (matlData[id].TYPE === 'CONC' || matlData[id].TYPE === 'STEEL') {
				const matlName = matlData[id].NAME;
				items.push([`${id}: ${matlName}`, +id]);
			}
		}

		setList(items);

		//첫번째 데이터를 선택합니다.
		if (items.length > 0) {
			setValue(items[0][1]);
		}

		enqueueSnackbar('Material data is updated.', { variant: 'success', autoHideDuration: 1500 });
	}, [enqueueSnackbar, setList, setValue]);

	//데이터를 채워줍니다.
	React.useEffect(() => {
		refreshMatlData();
	}, [refreshMatlData]);

	//계산 실행 여부를 저장합니다.
	const setForceCalcStress = useSetRecoilState(VarForceCalcStress);

  return (
    <GuideBox width="100%" row horSpaceBetween>
      <GuideBox width="inherit" row horSpaceBetween verCenter height={30}>
        <Typography>
          Girder Material
        </Typography>
        <DropList
          width={100}
          itemList={() => {

						return new Map<string, number>(list as [string, number][]);
					}}
          value={value}
          onChange={(e: any) => {
						setValue(e.target.value);
						setForceCalcStress(true);
					}}
        />
      </GuideBox>
      <IconButton transparent onClick={refreshMatlData}>
        <Icon iconName="Refresh" />
      </IconButton>
    </GuideBox>
  );
};

export default CompGirderMaterial;
