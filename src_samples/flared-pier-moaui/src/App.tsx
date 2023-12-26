import React from "react";
import {
  GuideBox,
  Panel,
	ComponentsTypographyBody1,
	Button,
	DropList,
	TextField,
	Table, TableHead, TableRow, TableCell, TableBody,
	Typography,
	Icon,
	IconButton,
} from "@midasit-dev/moaui";
import { useSnackbar } from 'notistack';
import InfoDialog from "./Components/InfoDialog";

import { setGlobalVariable, getGlobalVariable } from "./pyscript_g_variables";

const ComponentsGuideBoxLayout5 = () => {
	const { enqueueSnackbar } = useSnackbar();
  const visible = false;
	const headers = ["Component", "column", "Cap 1", "Cap 2"];
	const rows = [
		["Section", <DropList width={"100%"} />, <DropList width={"100%"} />, <DropList width={"100%"} />],
		["Material", <DropList width={"100%"} />, <DropList width={"100%"} />, <DropList width={"100%"} />],
		["Length(+Z)", <TextField width={"100%"} placeholder="12" textAlign="center"/>, <TextField width={"100%"} placeholder="1.2" textAlign="center"/>, <TextField width={"100%"} placeholder="0.15" textAlign="center"/>],
	]
	const [openInfo, setOpenInfo] = React.useState(false);

	React.useEffect(() => {
		function checkPyScriptReady(callback : any) {
			// PyScript가 준비될 때까지 재귀적으로 체크
			if (pyscript && pyscript.interpreter) {
				setGlobalVariable();
				callback();
			} else {
				// 아직 준비되지 않았다면, 100ms 후에 다시 체크
				setTimeout(() => checkPyScriptReady(callback), 100);
			}
		}

		async function get_StructuralGroup() {
			getGlobalVariable();
			const Gruplist = pyscript.interpreter.globals.get("get_grup");
			console.log(await Gruplist());
		}

		checkPyScriptReady(get_StructuralGroup);
	}, []);

	function onClickInfoButton() {
		setOpenInfo(true);
	}

	function onClickCreateButton() {
		enqueueSnackbar("Please check your all inputs", { variant: 'warning' });

		setGlobalVariable();
		const func = pyscript.interpreter.globals.get("main");
		func();
	}

	function onClickRefreshButton() {
	}

  return (
		<React.Fragment>
			<GuideBox
				tag="Outline"
				show={visible}
				fill="1"
				padding={1}
				spacing={0}
				width={430}
				height={430}
				center
			>
				<GuideBox show={visible} fill="2" width={"100%"} height={30} verCenter row>
					<Typography variant="h1">Pier Option</Typography>
					<IconButton transparent={true} marginLeft={"2px"} onClick={onClickInfoButton}><Icon iconName="ErrorOutline" /></IconButton>
				</GuideBox>
				<GuideBox show={visible} fill="2" width={"100%"} height={30} row horSpaceBetween verCenter>
					<Typography variant="body1">Structural Group</Typography>
					<DropList width={"30%"} />
				</GuideBox>
				<GuideBox show={visible} fill="2" width={"100%"} height={30} row horSpaceBetween verCenter>
					<Typography variant="body1">Boundary Group</Typography>
					<DropList width={"30%"} />
				</GuideBox>
				<GuideBox
					show={visible}
					tag="DropLists"
					fill="2"
					width={"100%"}
					height={30}
					row horSpaceBetween verCenter
				>
					<Typography variant="body1">Pier Start Nodes No.</Typography>
					<TextField width={"130px"} placeholder="TextField"/>
				</GuideBox>
				<GuideBox
					show={visible}
					tag="DropLists"
					fill="2"
					width={"100%"}
					height={30}
					row horSpaceBetween verCenter
				>
					<Typography variant="body1">Selected Reference Nodes</Typography>
					<TextField width={"130px"} placeholder="TextField"/>
				</GuideBox>
				<Panel variant="shadow" width={"96%"} marginTop={1}>
					<GuideBox
						show={visible}
						tag="DropLists"
						fill="2"
						width={"100%"}
						height={200}
					>
						<Table>
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
					</GuideBox>
				</Panel>
				<GuideBox
					show={visible}
					tag="DropLists"
					fill="2"
					width={"100%"}
					height={30}
					row horSpaceBetween verCenter
					marginTop={1}
				>
					<Button onClick={onClickRefreshButton}>Refresh</Button>
					<Button color="negative" variant="contained" onClick={onClickCreateButton}>Create</Button>
				</GuideBox>
			</GuideBox>
			{
				openInfo && <InfoDialog open={openInfo} setOpen={setOpenInfo}/>
			}
		</React.Fragment>
  );
};

export default ComponentsGuideBoxLayout5;