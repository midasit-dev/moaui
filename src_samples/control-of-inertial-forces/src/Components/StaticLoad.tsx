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
import { VarSTloadcase, VarSTloadCaseList } from "./variables";
import { GuideBox, Typography, DropList, IconButton, Icon } from "@midasit-dev/moaui";
import { dbRead } from "../pyscript_utils";

const CompStaticLoad = () => {
	const [value, setValue] = useRecoilState(VarSTloadcase);
	const [list, setList] = useRecoilState(VarSTloadCaseList);

	const refreshStldData = React.useCallback(() => {
		const stldData = dbRead('STLD');
		const cnldData = dbRead('CNLD');
		const nbofData = dbRead('NBOF');

		if (!stldData) {
			console.error('Failed to read data from database.');
			return;
		}
		
		const cnldStldName:string[] = [];
		for (const key in cnldData) {
			const element = cnldData[key].ITEMS;
			for (let i = 0; i < element.length; i++) {
				cnldStldName.push(element[i].LCNAME);
			}
		}
		const uniqueCnldStldName: string[] = Array.from(new Set(cnldStldName));

		const nbofStldName:string[] = [];
		for (const key in nbofData) {
			const element = nbofData[key];
			nbofStldName.push(element.LCNAME);
		}
		const uniqueNbofStldName: string[] = Array.from(new Set(nbofStldName));

		const uniqueStldName: string[] = [...uniqueCnldStldName, ...uniqueNbofStldName]

		const items: [string, number][] = [];
		const ids = Object.keys(stldData);
		for (const id of ids) {
			if (uniqueStldName.includes(stldData[id].NAME)) {
				const thisName = stldData[id].NAME;
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
		refreshStldData();
	}, [refreshStldData]);

	return (
		<GuideBox width="100%" column spacing={1} paddingBottom={2}>
			<Typography variant="h1">Staic Load</Typography>
			<GuideBox width="100%" row horSpaceBetween>
				<GuideBox row horSpaceBetween verCenter paddingLeft={1}>
					<DropList
						width="100%"
						itemList={new Map<string, number>(list as [string, number][])}
						defaultValue={value}
						value={value}
						onChange={(e: any) => setValue(e.target.value)}
					/>
					<IconButton transparent onClick={refreshStldData}>
						<Icon iconName="Refresh" />
					</IconButton>
				</GuideBox>
			</GuideBox>
		</GuideBox>
	);
};

export default CompStaticLoad;
