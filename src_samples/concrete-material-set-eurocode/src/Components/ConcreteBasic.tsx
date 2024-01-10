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
import { VarGeneralProperties, VarConcreteGrade, VarConcreteGamma, VarConcreteGammaError } from "./variables";
import { GuideBox, Typography, TextField, DropList, Stack, DataGrid, Panel } from "@midasit-dev/moaui";
import { useGridApiRef, GridColDef } from '@mui/x-data-grid';
import { checkPyScriptReady } from '../pyscript_utils';

const useValidationEffect = (value: any, setValueErr: any, minValue:any = null, maxValue:any = null) => {
    React.useEffect(() => {
        if (value === "" || value === undefined || value === null || isNaN(+value) || (minValue !== null && +value <= minValue) || (maxValue !== null && +value > maxValue)) {
            setValueErr(true);
        } else {
            setValueErr(false);
        }
    }, [value, minValue, maxValue, setValueErr]);
};

const ConcreteBasic = () => {
    const [gammaC, setGammaC] = useRecoilState(VarConcreteGamma);
    const [gammaCErr, setGammaCErr] = useRecoilState(VarConcreteGammaError);
    const [grade, setGrade] = useRecoilState(VarConcreteGrade);
    const [rows, setRows] = useRecoilState(VarGeneralProperties);

    //콘크리트 등급을 key로, 강도를 value로 하는 Map을 생성합니다.
    const gradeItems = new Map<string, number>([ 
		['C12/15', 12], 
		['C16/20', 16], 
		['C20/25', 20], 
		['C25/30', 25],
        ['C30/37', 30],
        ['C35/45', 35],
        ['C40/50', 40],
        ['C45/55', 45],
        ['C50/60', 50],
        ['C55/67', 55],
        ['C60/75', 60],
        ['C70/85', 70],
        ['C80/95', 80],
        ['C90/105', 90]
	]);

    React.useEffect(() => {
        checkPyScriptReady(() => {
            const properties = pyscript.interpreter.globals.get("concrete_properties");
            const results = properties(grade);
            const parsed_results = JSON.parse(results);
            setRows(parsed_results);
        })
    },[grade, setRows])

    //gammaC가 1보다 작으면 에러를 발생시킵니다.
    useValidationEffect(gammaC, setGammaCErr, 1);

    const apiRef = useGridApiRef();

    //valueFormatter:({value}) => value.toFixed(0)
	const columns: GridColDef[] = [
		{ field: 'desc', headerName: 'Discription', type: 'string', width: 260, sortable: false },
		{ field: 'value', headerName: 'Value', type: 'string', width: 130, align:"right", sortable: false },
		{ field: 'unit', headerName: 'Unit', type: 'string', width: 70, align:"left", sortable: false },
	];
    
	const processRowUpdate = React.useCallback(
		async (newRow: any) => {
			const updatedRow = { ...newRow };
			setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
			return updatedRow;
		}, [rows, setRows]);

	return (
        <GuideBox show={false} width={500} column spacing={1}>
            <Panel variant="shadow2" width="100%" height={380}>
                <GuideBox width="100%" column spacing={1}>
                    <GuideBox width="100%" row horSpaceBetween verCenter>
                        <Typography>
                            Concrete Grade
                        </Typography>
                        <DropList
                            itemList = {gradeItems}
                            width={120}
                            value={grade}
                            onChange={(e: any) => setGrade(e.target.value)}
                        />
                    </GuideBox>
                    <GuideBox width="100%" row horSpaceBetween verCenter>
                        <Typography>
                            Concrete partial material safety factor, γc
                        </Typography>
                        <TextField
                            type="number"
                            width={120}
                            value={gammaC.toString()}
                            onChange={(e: any) => setGammaC(e.target.value)}
                            error={gammaCErr}
                        />
                    </GuideBox>
                    <GuideBox width="100%" column spacing={1} paddingTop={1}>
                        <Typography>
                            General material properties for Reinforced Concrete
                        </Typography>
                        <Stack direction="row" height={229} width="100%">
                            <DataGrid
                                apiRef={apiRef}
                                rows={rows}
                                columns={columns}
                                disableColumnMenu={true}
                                columnHeaderHeight={50}
                                hideFooter
                                processRowUpdate={processRowUpdate}
                            />
                        </Stack>
                    </GuideBox>
                </GuideBox>
            </Panel>
        </GuideBox>
	);
};

export default ConcreteBasic;
