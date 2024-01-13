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
import { useRecoilValue, useRecoilState } from "recoil";
import {
    VarDialogConcrete,
    VarConcreteAddInfo,
    VarConcGrade,
    VarConcGamma,
    VarTDaddTab,
    VarRowCreepValue,
    VarRowCreepTime,
    VarRowShrinkageValue,
    VarRowShrinkageTime,
    VarRowStrengthTime,
    VarTDResults,
    VarHumidity,
    VarNotionalSize,
    VarCementType,
    VarCodeType,
    VarDayShrinkage
} from "./variables";
import { useGridApiRef, GridColDef } from '@mui/x-data-grid';
import { GuideBox, Button, Dialog, Typography, Stack, DataGrid, TextField } from "@midasit-dev/moaui";
import { checkPyScriptReady } from '../pyscript_utils';
import { useValidationRange2 } from './ComponentUser';
import { useSnackbar } from 'notistack';

const CreateButton = () => {
    const [open, setOpen] = React.useState(false);
    const apiRef = useGridApiRef();

    //Snackbar
    const { enqueueSnackbar } = useSnackbar();

    // ******************************************************
    // Material Infomations
    // ******************************************************
    const [rowsMaterial, setRowsMaterial] = React.useState([
		{ id: 1, strength: 'C12/15' },
        { id: 2, strength: 'C16/20' },
        { id: 3, strength: 'C20/25' },
        { id: 4, strength: 'C25/30' },
        { id: 5, strength: 'C30/37' },
        { id: 6, strength: 'C35/45' },
        { id: 7, strength: 'C40/50' },
        { id: 8, strength: 'C45/55' },
        { id: 9, strength: 'C50/60' },
        { id: 10, strength: 'C55/67' },
        { id: 11, strength: 'C60/75' },
        { id: 12, strength: 'C70/85' },
        { id: 13, strength: 'C80/95' },
        { id: 14, strength: 'C90/105' }
	]);
	const columnsMaterial: GridColDef[] = [
		{ field: 'strength', headerName: 'Grade', type: 'string', width: 120, sortable: false },
	];

    const [value, setValue] = React.useState("1");
    const [error, setError] = React.useState(false);
    const [selectedRow, setSelectedRow] = React.useState<any>(null);
    const grade = useRecoilValue(VarConcGrade);
    const humidity = useRecoilValue(VarHumidity);
    const notionalSize = useRecoilValue(VarNotionalSize);
    const cementType = useRecoilValue(VarCementType);
    const codeType = useRecoilValue(VarCodeType);
    const dayShrinkage = useRecoilValue(VarDayShrinkage);
    
    useValidationRange2(value, setError, 1, 999999);

    React.useEffect(() => {
        checkPyScriptReady(() => {
            const matl = pyscript.interpreter.globals.get("get_material_ID");
            const res_matl = matl();
            const max_id = JSON.parse(res_matl);
            setValue(max_id);
        })
    }, [value]);

	const processRowUpdate = React.useCallback(
		async (newRow:any) => {
			const updatedRow = { ...newRow };
			setRowsMaterial(rowsMaterial.map((row) => (row.id === newRow.id ? updatedRow : row)));
			return updatedRow;
	},[rowsMaterial, setRowsMaterial]);

    function Create_Material() {
        checkPyScriptReady(() => {
            const jsonInput = {
                "ID": parseInt(value),
                "grade": grade,
                "humidity": humidity,
                "notionalSize": notionalSize,
                "cementType": cementType,
                "codeType": codeType,
                "dayShrinkage": dayShrinkage
            }
            console.log(selectedRow);
            // const properties = pyscript.interpreter.globals.get("addInfo_material");
            // const results = properties(jsonInput);
            // const parsed_results = JSON.parse(results);
            // if (parsed_results.hasOwnProperty("error")) {
            //     enqueueSnackbar(parsed_results.error, { variant: 'error' });
            //     return;
            // }
        })
    }

    const dialog_create = () => {
        return (
            <Dialog open={open} setOpen={setOpen} headerTitle="Create Material">
                <GuideBox column width={200}>
                    <GuideBox width="100%" column spacing={1} paddingTop={1}>
                        <GuideBox width="100%" row horSpaceBetween verCenter>
                            <Typography>
                                Start Material ID
                            </Typography>
                            <GuideBox row verCenter spacing={1}>
                                <TextField
                                    type="number"
                                    width={90}
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}
                                    error={error}
                                />
                            </GuideBox>
                        </GuideBox>
                        <Stack direction="row" height={250} width="100%">
                            <DataGrid
                                checkboxSelection
                                apiRef={apiRef}
                                rows={rowsMaterial}
                                columns={columnsMaterial}
                                disableColumnMenu={true}
                                columnHeaderHeight={50}
                                processRowUpdate={processRowUpdate}
                                hideFooter
                                onRowSelectionModelChange={(ids) => {
                                    const selectedIDs = new Set(ids);
                                    const selectedRowData = rowsMaterial.filter((row) =>
                                        selectedIDs.has(row.id));
                                        setSelectedRow(selectedRowData);
                                }}
                            />
                        </Stack>
                        <GuideBox width="100%" horRight spacing={1} paddingTop={1}>
                            <Button variant="contained" color="negative" onClick={Create_Material}> CREATE </Button>
                        </GuideBox>
                    </GuideBox>
                </GuideBox>
            </Dialog>
        );
    };

	return (
        <>
        <Button variant="contained" color="negative" onClick={() => setOpen(true)}> CREATE </Button>
        {dialog_create()}
        </>
	);
};

export default CreateButton;