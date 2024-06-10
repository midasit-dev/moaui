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
import { VarTHloadcase, VarTHloadCaseList, Language } from "./variables";
import { GuideBox, Typography, DropList, IconButton, Icon, Separator } from "@midasit-dev/moaui";
import { dbRead } from "../pyscript_utils";
import { useSnackbar } from "notistack";
import { useTranslation } from 'react-i18next';

const CompTimeHistory = () => {
	const { t:translate, i18n: internationalization} = useTranslation();
	const LanguageList: [string, string][] = [
		["en", "en"],
		["jp", "jp"],
	]
	const [language, setLanguage] = useRecoilState(Language);
	const handleLanguageChange = (e: any) => {
		setLanguage(e.target.value);
		internationalization.changeLanguage(e.target.value);
	}
	const { enqueueSnackbar } = useSnackbar();

	const [value, setValue] = useRecoilState(VarTHloadcase);
	const [list, setList] = useRecoilState(VarTHloadCaseList);

	const refreshThisData = React.useCallback(() => {
		const thisData = dbRead('THIS');
		if ("error" in thisData) {
			enqueueSnackbar(thisData.error, { variant: 'error' });
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [setList, setValue]);

	//데이터를 채워줍니다.
	React.useEffect(() => {
		refreshThisData();
	}, [refreshThisData]);

	return (
		<GuideBox width="100%" spacing={2}>

			<GuideBox width="100%" spacing={1}>
				<GuideBox width="100%" row horSpaceBetween verCenter>
					<Typography variant="h1">{translate("THLoadName_Title")}</Typography>
					<DropList
						width= {50}
						itemList={new Map<string, string>(LanguageList as [string, string][])}
						defaultValue={language}
						value={language}
						onChange={handleLanguageChange}
					/>
				</GuideBox>
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
				<IconButton transparent onClick={refreshThisData}>
					<Icon iconName="Refresh" />
				</IconButton>
			</GuideBox>

		</GuideBox>
	);
};

export default CompTimeHistory;
