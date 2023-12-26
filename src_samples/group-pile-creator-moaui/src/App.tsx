import React from 'react';
import { Button, Check, GuideBox, Table, TableHead, TableRow, TableCell, TableBody, Typography, Stack, DropList, TextField, Panel } from "@midasit-dev/moaui";
import { TypographyWithTextField } from './TypographyWithTextField';

import { VerifyUtil } from '@midasit-dev/moaui';
import { setGlobalVariable } from './pyscript_g_variables';

const ComponentsTableWithTitle = ({
	title = "Table Title Text", 
  spacing = 2, 
  headers = [
    'Component', 'Longitudinal', 'Transverse'
  ], 
  rows = [
    [ 'Pile Array', <TextField width='50px' />, <TextField width='50px' /> ],
    [ 'Spacing (c-c)', <TextField width='50px' />, <TextField width='50px' /> ],
    [ 'Cap Edge', <TextField width='50px' />, <TextField width='50px' /> ],
  ], 
}) => {
  return (
		<Panel width={300}>
			<Stack spacing={spacing} display='flex' justifyContent='center'>
				<Panel flexItem width="100%">
					<Typography variant="h1">{title}</Typography>
				</Panel>
				<Table padding="normal" width={300}>
					<TableHead>
						<TableRow>
							{headers.map((header, index) => <TableCell key={index}><Typography textAlign='center'>{header}</Typography></TableCell>)}
						</TableRow>
					</TableHead>
					<TableBody>
							{rows.map((row, index) => {
								return (
									<TableRow key={index}>
										{row.map((cell, index) => <TableCell key={index}>{cell}</TableCell>)}
									</TableRow>
								);
							})}
					</TableBody>
				</Table>
			</Stack>
		</Panel>
  );
}; 

const TypographyWithDropList = ({
	key = "",
	width = 300,
	height = 30,
	title = 'Title',
	dropListwidth = 150,
	items = [ 
		['Korean', 	 0],
		['American', 1],
		['Asia', 		 2],
		['Midas', 	 3],
	],
	show = false,
	disabled = false,
	...optional
}) => {

	const [valueLocal, setValueLocal] = React.useState(optional?.defaultValue || 0);
	let onChangeLocal = React.useCallback((e: any) => {
		setValueLocal(e.target.value);
	}, []);

	const itemsMap = React.useMemo(() => new Map<string, number>(items as [string, number][]), [items]);
	const emptyMap = React.useMemo(() => new Map<string, number>([["disabled", 0]] as [string, number][]), []);
	return (
		<GuideBox show={show} width={width} height={height} row horSpaceBetween>
			<Typography flexItem textAlign='center' height={height}>{title}</Typography>
			{disabled && <DropList 
					itemList={emptyMap} 
					width={dropListwidth} 
					defaultValue={optional?.defaultValue}
					value={optional?.value || valueLocal}
					onChange={(e) => optional?.onChange(e, key) || onChangeLocal(e)}
				/>}
			{!disabled && 
				<DropList 
					itemList={itemsMap} 
					width={dropListwidth} 
					defaultValue={optional?.defaultValue}
					value={optional?.value || valueLocal}
					onChange={(e) => optional?.onChange(e, key) || onChangeLocal(e)}
				/>
			}
		</GuideBox>
	)
};

const ComponentsGuideBoxLayout2Sample = (props: any) => {
	const initValues = React.useMemo(() => ({BNGR: "", STGR: "", P_MATL: "", P_SECT: "", P_CAP_MATL: "", P_CAP_SECT: "", P_START_NODE: 0, P_CAP_START_NODE: 0, LENGTH_UNIT: "D", P_DIAMETER: 0, P_LENGTH: 0, P_CAP_HEIGHT: 0}), []);
	const [values, setValues] = React.useState(initValues);
	const [rawValues, setRawValues] = React.useState({});
	const [includePileCap, setIncludePileCap] = React.useState(false);
	const guideVisible = false;

	const handleOnChange = React.useCallback((e: any, name: any) => {
		setValues((prev) => ({...prev, [name]: e.target.value}));
	}, []);

	const handleRefresh = React.useCallback(() => {
		// console.log("handleRefresh", VerifyUtil.getMapiKey());
		// if (VerifyUtil.getMapiKey() === "") return;
		// const pfunc = pyscript.interpreter.globals.get("get_data");
		// const groupData = JSON.parse(pfunc("GRUP"));

		// setValues(initValues);
	}, [initValues]);
		
	// React.useEffect(() => {
	// 	// handleRefresh();
	// }, [handleRefresh]);	

	return (
		<GuideBox tag="Group Pile Creator" show={guideVisible} padding={1} spacing={1} fill='1'>
			<GuideBox tag="Content" show={guideVisible} row padding={1} spacing={1} fill='2'>
				{/* Content Left */}
				<GuideBox tag="Content Left" show={guideVisible} padding={1} spacing={1.5} fill='3'>
					<GuideBox tag="Title" show={guideVisible} width={300} height={30} center>
						<Typography variant="h1">Group Pile Option</Typography>
					</GuideBox>
					<GuideBox tag="DropList & TextField" show={guideVisible} spacing={2}>
						<TypographyWithDropList title="Structure Group" key="BNGR" value={values["BNGR"]} onChange={handleOnChange} />
						<TypographyWithDropList title="Boundary Group" key="STGR" value={values["STGR"]} onChange={handleOnChange} />
						<TypographyWithDropList title="Pile Material" key="P_MATL" value={values["P_MATL"]} onChange={handleOnChange} />
						<TypographyWithDropList title="Pile Section" key="P_SECT" value={values["P_SECT"]} onChange={handleOnChange} />
						<TypographyWithDropList title="Pile Cap Material" key="P_CAP_MATL" value={values["P_CAP_MATL"]} disabled={includePileCap} onChange={handleOnChange} />
						<TypographyWithDropList title="Pile Cap Section" key="P_CAP_SECT" value={values["P_CAP_SECT"]} disabled={includePileCap} onChange={handleOnChange} />
						<TypographyWithTextField title="Pile Start Node No." key="P_START_NODE" value={values["P_START_NODE"]} onChange={handleOnChange} />
						<TypographyWithTextField  title="Pile Cap Start Node No." key="P_CAP_START_NODE" value={values["P_CAP_START_NODE"]} disabled={includePileCap} onChange={handleOnChange} />
					</GuideBox>
				</GuideBox>

				{/* Content Right */}
				<GuideBox tag="Content Right" show={guideVisible} fill='3' spacing={1} padding={1}>
					<Panel variant="shadow">
						<GuideBox tag="Title" show={guideVisible} fill='4' width={300} center>
							<ComponentsTableWithTitle title="Group Pile & Cap Option" />
						</GuideBox>
					</Panel>
					<GuideBox tag="DropList & TextField" show={guideVisible} fill='4' width={320} horSpaceBetween spacing={1}>
						<TypographyWithDropList width={320} title="Length Unit" items={[["D", "D"], ["L", "L"]]} key={"LENGTH_UNIT"} value={values["LENGTH_UNIT"]} onChange={handleOnChange} />
						<TypographyWithTextField width={320} title="Pile Diameter" key="P_DIAMETER" value={values["P_DIAMETER"]} onChange={handleOnChange} />
						<TypographyWithTextField width={320} title="Pile Length" key="P_LENGTH" value={values["P_LENGTH"]} onChange={handleOnChange} />
						<TypographyWithTextField width={320} title="Pile Cap Height" key="P_CAP_HEIGHT" value={values["P_CAP_HEIGHT"]} onChange={handleOnChange} />
					</GuideBox>
				</GuideBox>
			</GuideBox>

			{/* Footer */}
			<GuideBox tag="Footer" show={guideVisible} row padding={1} spacing={0} fill='2'>
				<GuideBox tag="Footer Left" show={guideVisible} fill='3' width={304} height={30} padding={1}>
					<GuideBox tag="Refresh" show={guideVisible} fill='4' width={100} height={30} verCenter>
						<Button onClick={handleRefresh}>Refresh</Button>
					</GuideBox>
				</GuideBox>
				<GuideBox tag="Footer Right" show={guideVisible} fill='4' width={324} height={30} padding={1} row horSpaceBetween verCenter>
					<Check name='Create Pile Cap'  namePlacement='start' checked={includePileCap} onChange={(e, c) => setIncludePileCap(c)} />
					<Button color='negative'>Create</Button>
				</GuideBox>
			</GuideBox>
		</GuideBox>
	);
};

export default ComponentsGuideBoxLayout2Sample;