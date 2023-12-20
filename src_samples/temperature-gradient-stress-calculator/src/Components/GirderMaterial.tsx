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
import { VarGirderMaterial, VarGirderMaterialList } from "./variables";
import { GuideBox, Typography, DropList, IconButton, Icon } from "@midasit-dev/moaui";
import { dbRead } from "../pyscript_utils";

const CompGirderMaterial = () => {
	const [value, setValue] = useRecoilState(VarGirderMaterial);
	const [list, setList] = useRecoilState(VarGirderMaterialList);

	const refreshMatlData = React.useCallback(() => {
		const matlData = dbRead('MATL');
		if (!matlData) {
			console.error('Failed to read MATL data from database.');
			return;
		}
		const items: [string, number][] = [];
		const ids = Object.keys(matlData);
		for (const id of ids) {
			const matlName = matlData[id].NAME;
			items.push([matlName, +id]);
		}

		setList(items);

		//첫번째 데이터를 선택합니다.
		if (items.length > 0) {
			setValue(items[0][1]);
		}
	}, [setList, setValue]);

	//데이터를 채워줍니다.
	React.useEffect(() => {
		refreshMatlData();
	}, [refreshMatlData]);

  return (
    <GuideBox width="100%" row horSpaceBetween>
      <GuideBox row horSpaceBetween verCenter height={30}>
        <Typography>
          Girder Material
        </Typography>
        <DropList
          width={100}
          itemList={new Map<string, number>(list as [string, number][])}
          defaultValue={value}
          value={value}
          onChange={(e: any) => setValue(e.target.value)}
        />
      </GuideBox>
      <IconButton transparent onClick={refreshMatlData}>
        <Icon iconName="Refresh" />
      </IconButton>
    </GuideBox>
  );
};

export default CompGirderMaterial;
