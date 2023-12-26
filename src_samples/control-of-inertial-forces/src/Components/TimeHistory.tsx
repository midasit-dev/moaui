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
import { VarTHloadcase, VarTHloadCaseList } from "./variables";
import { GuideBox, Typography, DropList, IconButton, Icon } from "@midasit-dev/moaui";
import { dbRead } from "../pyscript_utils";

const CompTimeHistory = () => {
	const [value, setValue] = useRecoilState(VarTHloadcase);
	const [list, setList] = useRecoilState(VarTHloadCaseList);

	const refreshThisData = React.useCallback(() => {
		const thisData = dbRead('THIS');
		if (!thisData) {
			console.error('Failed to read THIS data from database.');
			return;
		}
		const items: [string, number][] = [];
		const ids = Object.keys(thisData);
		for (const id of ids) {
			if (thisData[id]["COMMON"].iAMETHOD === 3) {
				const thisName = thisData[id]["COMMON"].NAME;
				items.push([thisName, +id]);	
			}
		}

		setList(items);

		//첫번째 데이터를 선택합니다.
		if (items.length > 0) {
			setValue(items[0][1]);
		}
	}, [setList, setValue]);

	//데이터를 채워줍니다.
	React.useEffect(() => {
		refreshThisData();
	}, [refreshThisData]);

	return (
		<GuideBox width="100%" column spacing={1} paddingBottom={2}>
			<Typography variant="h1">Time History Load Cases Name</Typography>
			<GuideBox width="100%" row horSpaceBetween>
				<GuideBox row horSpaceBetween verCenter paddingLeft={1}>
					<DropList
						width="100%"
						itemList={new Map<string, number>(list as [string, number][])}
						defaultValue={value}
						value={value}
						onChange={(e: any) => setValue(e.target.value)}
					/>
					<IconButton transparent onClick={refreshThisData}>
						<Icon iconName="Refresh" />
					</IconButton>
				</GuideBox>
			</GuideBox>
		</GuideBox>
	);
};

export default CompTimeHistory;
