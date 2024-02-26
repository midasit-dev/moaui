/**
 *  ██████╗ ██████╗ ███╗   ███╗██████╗  ██████╗ ███╗   ██╗███████╗███╗   ██╗████████╗
 * ██╔════╝██╔═══██╗████╗ ████║██╔══██╗██╔═══██╗████╗  ██║██╔════╝████╗  ██║╚══██╔══╝
 * ██║     ██║   ██║██╔████╔██║██████╔╝██║   ██║██╔██╗ ██║█████╗  ██╔██╗ ██║   ██║   
 * ██║     ██║   ██║██║╚██╔╝██║██╔═══╝ ██║   ██║██║╚██╗██║██╔══╝  ██║╚██╗██║   ██║   
 * ╚██████╗╚██████╔╝██║ ╚═╝ ██║██║     ╚██████╔╝██║ ╚████║███████╗██║ ╚████║   ██║   
 *  ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚═╝      ╚═════╝ ╚═╝  ╚═══╝╚══════╝╚═╝  ╚═══╝   ╚═╝   
 */

import React from "react";
import { useRecoilState } from "recoil";
import { VarSTloadcase, VarSTloadCaseList } from "./variables";
import { GuideBox, Typography, DropList, IconButton, Icon, Separator } from "@midasit-dev/moaui";
import { dbRead } from "../pyscript_utils";
import { useSnackbar } from "notistack";

const CompStaticLoad = () => {
	const { enqueueSnackbar } = useSnackbar();

	const [value, setValue] = useRecoilState(VarSTloadcase);
	const [list, setList] = useRecoilState(VarSTloadCaseList);

	const refreshStldData = React.useCallback(() => {
		let uniqueCnldStldName: string[] = [];
		const cnldData = dbRead('CNLD');
		if ('error' in cnldData) {
			// enqueueSnackbar(cnldData.error, { variant: 'error' });
			console.error(cnldData.error);
		} else {
			const cnldStldName:string[] = [];
			for (const key in cnldData) {
				const element = cnldData[key].ITEMS;
				for (let i = 0; i < element.length; i++) {
					cnldStldName.push(element[i].LCNAME);
				}
			}
			uniqueCnldStldName = Array.from(new Set(cnldStldName));
		}

		let uniqueNbofStldName: string[] = [];
		const nbofData = dbRead('NBOF');
		if ('error' in nbofData) {
			// enqueueSnackbar(nbofData.error, { variant: 'error' });
			console.error(nbofData.error);
		} else {
			const nbofStldName:string[] = [];
			for (const key in nbofData) {
				const element = nbofData[key];
				nbofStldName.push(element.LCNAME);
			}
			uniqueNbofStldName = Array.from(new Set(nbofStldName));
		}

		const items: [string, number][] = [];
		const stldData = dbRead('STLD');
		if ('error' in stldData) {
			enqueueSnackbar(stldData.error, { variant: 'error' });
		} else {
			const uniqueStldName: string[] = [...uniqueCnldStldName, ...uniqueNbofStldName]
			const ids = Object.keys(stldData);
			for (const id of ids) {
				if (uniqueStldName.includes(stldData[id].NAME)) {
					const thisName = stldData[id].NAME;
					items.push([thisName, +id]);	
				}
			}
		}
		setList(items);

		//첫번째 데이터를 선택합니다.
		if (items.length > 0) {
			setValue(items[0][1]);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [setList, setValue]);

	//데이터를 채워줍니다.
	React.useEffect(() => {
		refreshStldData();
	}, [refreshStldData]);

	return (
		<GuideBox width="100%" spacing={2}>

			<GuideBox width="100%" spacing={1}>
				<Typography variant="h1">Static Load</Typography>
				<Separator />
			</GuideBox>

			<GuideBox width="100%" row horSpaceBetween verCenter>
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
	);
};

export default CompStaticLoad;
