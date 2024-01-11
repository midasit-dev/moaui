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
import { VarTHfunction, VarTHfunctionList, VarScaleFactor, VarScaleError } from "./variables";
// import { VarAngleHor, VarAngleError } from "./variables";
import { GuideBox, Typography, DropList, TextField ,IconButton, Icon, Separator } from "@midasit-dev/moaui";
import { dbRead } from "../pyscript_utils";
import { useSnackbar } from "notistack";

const CompTHfunction = () => {
	const { enqueueSnackbar } = useSnackbar();

	const [THfunc, setTHfunc] = useRecoilState(VarTHfunction);
	const [THfuncList, setTHfuncList] = useRecoilState(VarTHfunctionList);
	const [scale, setScale] = useRecoilState(VarScaleFactor);
	const [scaleErr, setScaleErr] = useRecoilState(VarScaleError);
	// const [angle, setAngle] = useRecoilState(VarAngleHor);
	// const [angleErr, setAngleErr] = useRecoilState(VarAngleError);

	const refreshThfcData = React.useCallback(() => {
		const thfcData = dbRead('THFC');
		if ('error' in thfcData) {
			enqueueSnackbar(thfcData.error, { variant: 'error' });
			return;
		}
		const items: [string, number][] = [];
		// Preset:Linear를 추가합니다.
		items.push(["Preset:Linear", 0]);

		const ids = Object.keys(thfcData);
		for (const id of ids) {
			if (thfcData[id].iTYPE === 5) {
				const thisName = thfcData[id].NAME;
				items.push([thisName, +id]);	
			}
		}

		setTHfuncList(items);

		//첫번째 데이터를 선택합니다.
		if (items.length > 0) {
			setTHfunc(items[0][1]);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [setTHfuncList, setTHfunc]);

	//데이터를 채워줍니다.
	React.useEffect(() => {
		refreshThfcData();
	}, [refreshThfcData]);

	//Scale Factor가 0보다 작거나 같으면 에러를 발생시킵니다.
	React.useEffect(() => {
		if (scale === "" || scale === undefined || scale === null || isNaN(+scale) || +scale <= 0) {
			setScaleErr(true);
		} else {
			setScaleErr(false);
		}
	}, [scale, setScaleErr]);

	//Angle of Horizontal Load가 숫자가 아니면 에러를 발생시킵니다.
	// React.useEffect(() => {
	// 	if (angle === "" || angle === undefined || angle === null || isNaN(+angle)) {
	// 		setAngleErr(true);
	// 	} else {
	// 		setAngleErr(false);
	// 	}
	// }, [angle, setAngleErr]);

	return (
		<GuideBox width="100%" spacing={2}>

			<GuideBox width="100%" spacing={1}>
				<Typography variant="h1">Function</Typography>
				<Separator />
			</GuideBox>

			<GuideBox width="100%" spacing={1}>
				<GuideBox width="100%" row horSpaceBetween verCenter>
					<GuideBox width={248} row horSpaceBetween verCenter height={30}>
						<Typography>Function Name</Typography>
						<DropList
						width={120}
							itemList={new Map<string, number>(THfuncList as [string, number][])}
							defaultValue={THfunc}
							value={THfunc}
							onChange={(e: any) => setTHfunc(e.target.value)}
						/>
					</GuideBox>

					<IconButton transparent onClick={refreshThfcData}>
						<Icon iconName="Refresh" />
					</IconButton>
				</GuideBox>

				<GuideBox width="100%" row horSpaceBetween verCenter>
					<GuideBox width={248} row horSpaceBetween verCenter height={30}>
						<Typography>Scale Factor</Typography>
						<TextField
							type="number"
							width={120}
							value={scale}
							onChange={(e: any) => setScale(e.target.value)}
							error={scaleErr}
						/>
					</GuideBox>

					<GuideBox width={36} height={28} />
				</GuideBox>
			</GuideBox>

			{/* <GuideBox width="100%" row horSpaceBetween verCenter spacing={1}>
				<GuideBox row horSpaceBetween verCenter height={30} paddingLeft={1}>
					<Typography>
						Angle of Horizontal Load
					</Typography>
						<TextField
							type="number"
							width={120}
							value={angle}
							onChange={(e: any) => setAngle(e.target.value)}
							error={angleErr}
						/>
				</GuideBox>
				<Typography>
					[deg]
				</Typography>
			</GuideBox> */}
		</GuideBox>
	);
};

export default CompTHfunction;