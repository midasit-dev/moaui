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
import { useRecoilValue } from "recoil";
import {
    VarHumidity,
    VarNotionalSize,
    VarCementType,
    VarCodeType,
    VarDayShrinkage,
    VarSilica
} from "./variables";
import { useGridApiRef, GridColDef } from '@mui/x-data-grid';
import { GuideBox, Button, Dialog, Typography, Stack, DataGrid, TextField } from "@midasit-dev/moaui";
import { checkPyScriptReady } from '../utils_pyscript';
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
		{ field: 'strength', headerName: 'Grade', type: 'string', width: 180, sortable: false },
	];

    const [concID, setConcID] = React.useState("1");
    const [concIDErr, setConcIDErr] = React.useState(false);
    const [selectedRow, setSelectedRow] = React.useState<any>(null);
    const humidity = useRecoilValue(VarHumidity);
    const notionalSize = useRecoilValue(VarNotionalSize);
    const cementType = useRecoilValue(VarCementType);
    const codeType = useRecoilValue(VarCodeType);
    const dayShrinkage = useRecoilValue(VarDayShrinkage);
    const silica = useRecoilValue(VarSilica);
    
    useValidationRange2(concID, setConcIDErr, 1, 999999);

    React.useEffect(() => {
        checkPyScriptReady(() => {
            const matl = pyscript.interpreter.globals.get("get_material_ID");
            const res_matl = matl();
            const max_id = JSON.parse(res_matl);
            setConcID(max_id);
        })
    }, [concID, open]);

	const processRowUpdate = React.useCallback(
		async (newRow:any) => {
			const updatedRow = { ...newRow };
			setRowsMaterial(rowsMaterial.map((row) => (row.id === newRow.id ? updatedRow : row)));
			return updatedRow;
	},[rowsMaterial, setRowsMaterial]);

    function Create_Material() {
        checkPyScriptReady(() => {
            const material_input = {
                "ID": parseInt(concID),
                "selectedGrade": selectedRow,
                "humidity": humidity,
                "notionalSize": notionalSize,
                "cementType": cementType,
                "codeType": codeType,
                "silica": silica,
                "dayShrinkage": dayShrinkage,
            }
            const func_create_material = pyscript.interpreter.globals.get("Create_material");
            const results = func_create_material(JSON.stringify(material_input));
            const parsed_results = JSON.parse(results);
            if (parsed_results.hasOwnProperty("error")) {
                enqueueSnackbar(parsed_results.error, { variant: 'error' });
                return;
            } else if (parsed_results.hasOwnProperty("success")) {
				enqueueSnackbar(parsed_results["success"], { variant: "success", autoHideDuration: 1500 });
				return;
			}
        })
    }

    const dialog_create = () => {
        return (
            <Dialog open={open} setOpen={setOpen} headerTitle="Create Material">
                <GuideBox column width={250}>
                    <GuideBox width="100%" column spacing={1} paddingTop={1}>
                        <GuideBox width="100%" row horSpaceBetween verCenter>
                            <Typography>
                                Start Material ID
                            </Typography>
                            <GuideBox row verCenter spacing={1}>
                                <TextField
                                    type="number"
                                    width={90}
                                    value={concID}
                                    onChange={(e) => setConcID(e.target.value)}
                                    error={concIDErr}
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