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
    VarTabGroupMain,
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
    VarConcGammaErr,
    VarHumidityErr,
    VarNotionalSizeErr,
    VarTemperatureErr,
    VarDayCreepErr,
    VarDayShrinkErr,
    VarDayLastErr
} from "./variables";
import { useGridApiRef, GridColDef } from '@mui/x-data-grid';
import { GuideBox, Button, Dialog, Typography, Stack, DataGrid, TabGroup, Tab } from "@midasit-dev/moaui";
import { checkPyScriptReady } from '../pyscript_utils';
import { useSnackbar } from 'notistack';

const DialogButton = () => {
    const [open, setOpen] = useRecoilState(VarDialogConcrete);
    const tabMain = useRecoilValue(VarTabGroupMain);
    const grade = useRecoilValue(VarConcGrade);
    const ConcGamma = useRecoilValue(VarConcGamma);
    const apiRef = useGridApiRef();

    //Snackbar
    const { enqueueSnackbar } = useSnackbar();

    // Check Error
    const ConcGammaErr = useRecoilValue(VarConcGammaErr);
    const humidityErr = useRecoilValue(VarHumidityErr);
    const notionalSizeErr = useRecoilValue(VarNotionalSizeErr);
    const temperatureErr = useRecoilValue(VarTemperatureErr);
    const dayCreepErr = useRecoilValue(VarDayCreepErr);
    const dayShrinkErr= useRecoilValue(VarDayShrinkErr);
    const dayLastErr = useRecoilValue(VarDayLastErr);

    function infor_open_check_material() {
        if (ConcGammaErr) {
            enqueueSnackbar('Please check the input value', { variant: 'error' });
            setOpen(false);
        } else {
            setOpen(true);
        }
    };

    function infor_open_check_timedependent() {
        if (humidityErr || notionalSizeErr || temperatureErr || dayCreepErr || dayShrinkErr || dayLastErr) {
            enqueueSnackbar('Please check the input value', { variant: 'error' });
            setOpen(false);
        } else {
            setOpen(true);
        }
    };

    // Common Components
    const ComponentsDataGrids = (rows:any, columns:any) => {
        return (
            <DataGrid
            apiRef={apiRef}
            rows={rows}
            columns={columns}
            disableColumnMenu={true}
            columnHeaderHeight={50}
            hideFooter
        />
        )
    }
    // ******************************************************
    // Material Infomations
    // ******************************************************
    const [rowsMaterial, setRowsMaterial] = useRecoilState(VarConcreteAddInfo);

	const columnsMaterial: GridColDef[] = [
		{ field: 'descStrength', headerName: 'Discription', type: 'string', width: 140, sortable: false },
		{ field: 'valueStrength', headerName: 'Value', type: 'string', width: 85, sortable: false },
		{ field: 'descStrain', headerName: 'Discription', type: 'string', width: 140, sortable: false },
        { field: 'valueStrain', headerName: 'Value', type: 'string', width: 85, sortable: false },
	];

    React.useEffect(() => {
        checkPyScriptReady(() => {
            const properties = pyscript.interpreter.globals.get("addInfo_material");
            const results = properties(grade, parseFloat(ConcGamma));
            const parsed_results = JSON.parse(results);
            if (parsed_results.hasOwnProperty("error")) {
				return;
            }
            setRowsMaterial(parsed_results)
        })
    },[grade, ConcGamma, setRowsMaterial]);

    const dialog_material = () => {
        return (
            <Dialog open={open} setOpen={setOpen} headerTitle="Additional Material Informations">
                <GuideBox column width={470}>
                    <GuideBox width="100%" column spacing={1} paddingTop={1}>
                        <Typography>
                            Unit: MPa
                        </Typography>
                        <Stack direction="row" height={260} width="100%">
                            {ComponentsDataGrids(rowsMaterial, columnsMaterial)}
                        </Stack>
                    </GuideBox>
                </GuideBox>
            </Dialog>
        );
    };

    // ******************************************************
    // Time-Dependent Infomations
    // ******************************************************
    const [tdTab, setTDTab] = useRecoilState(VarTDaddTab)
    const tdResults = useRecoilValue(VarTDResults);
    
    // CREEP
    const [rowsCreepValue, setRowsCreepValue] = useRecoilState(VarRowCreepValue);
	const columnsCreepValue: GridColDef[] = [
		{ field: 'desc', headerName: 'Symbol', type: 'string', width: 100, sortable: false },
		{ field: 'value', headerName: 'Value', type: 'string', width: 75, sortable: false },
	];

    React.useEffect(() => {
        if (!tdResults) return;

        const CreepValue = tdResults.Creep.Value;
        setRowsCreepValue(() => {
            return [
                { id: 1, desc: 'φ0',        value: CreepValue.phi_0.toFixed(3) },
                { id: 2, desc: 'φRH',       value: CreepValue.phi_RH.toFixed(3) },
                { id: 3, desc: 'β(fcm)',    value: CreepValue.beta_fcm.toFixed(3) },
                { id: 4, desc: 'β(t0)',     value: CreepValue.beta_t0.toFixed(3) },
                { id: 5, desc: 'βH',        value: CreepValue.beta_H.toFixed(1) },
                { id: 6, desc: 'α1',        value: CreepValue.alpha_1.toFixed(3) },
                { id: 7, desc: 'α2',        value: CreepValue.alpha_2.toFixed(3) },
                { id: 8, desc: 'α3',        value: CreepValue.alpha_3.toFixed(3) },
                { id: 9, desc: 't0_adjust', value: CreepValue.t0_adjust.toFixed(3) },
                { id: 10, desc: 'tT',       value: CreepValue.tT.toFixed(3) },
                { id: 11, desc: 'α',        value: CreepValue.alpha.toFixed(0) }
            ]
        });
    },[tdResults, setRowsCreepValue]);

    const [rowsCreepTime, setRowsCreepTime] = useRecoilState(VarRowCreepTime);
	const columnsCreepTime: GridColDef[] = [
		{ field: 'time', headerName: 'Time(day)', type: 'string', width: 80, sortable: false },
		{ field: 'value1', headerName: 'βc(t,t0)', type: 'string', width: 75, sortable: false },
        { field: 'value2', headerName: 'φ(t,t0)', type: 'string', width: 75, sortable: false },
	];

    React.useEffect(() => {
        if (!tdResults) return;

        const { t_c, beta_c_t_t0, phi_t_t0 }:any = tdResults.Creep.TimeDependent;
        const creepTime = t_c.map((item:any, index:any) => ({
            id: index + 1,
            time: item.toFixed(1),
            value1: beta_c_t_t0[index].toFixed(3),
            value2: phi_t_t0[index].toFixed(3),
        }));

        setRowsCreepTime(creepTime);
        
    },[tdResults, setRowsCreepTime]);

    // SHRINKAGE
    const [rowsShrinkageValue, setRowsShrinkageValue] = useRecoilState(VarRowShrinkageValue);
	const columnsShrinkageValue: GridColDef[] = [
		{ field: 'desc', headerName: 'Symbol', type: 'string', width: 100, sortable: false },
		{ field: 'value', headerName: 'Value', type: 'string', width: 75, sortable: false },
	];

    React.useEffect(() => {
        if (!tdResults) return;

        const ShrinkageValue = tdResults.Shrinkage.Value;
        setRowsShrinkageValue(() => {
            return [
                { id: 1, desc: 'εcs(∞)',    value: ShrinkageValue.epsilon_cs_inf.toExponential(3) },
                { id: 2, desc: 'εcd(∞)',    value: ShrinkageValue.epsilon_cd_inf.toExponential(3) },
                { id: 3, desc: 'εca(∞)',    value: ShrinkageValue.epsilon_ca_inf.toExponential(3) },
                { id: 4, desc: 'kh',        value: ShrinkageValue.kh.toFixed(3) },
                { id: 5, desc: 'εcd,0',     value: ShrinkageValue.epsilon_cd_0.toExponential(3) },
                { id: 6, desc: 'βRH',       value: ShrinkageValue.beta_RH.toFixed(3) },
                { id: 7, desc: 'αds1',      value: ShrinkageValue.alpha_ds1.toFixed(0) },
                { id: 8, desc: 'αds2',      value: ShrinkageValue.alpha_ds2.toFixed(2) },
            ]
        });
    },[tdResults, setRowsShrinkageValue]);

    const [rowsShrinkageTime, setRowsShrinkageTime] = useRecoilState(VarRowShrinkageTime);
    const columnsShrinkageTime: GridColDef[] = [
        { field: 'time', headerName: 'Time(day)', type: 'string', width: 80, sortable: false },
		{ field: 'value1', headerName: 'βds(t,ts)', type: 'string', width: 75, sortable: false },
        { field: 'value2', headerName: 'βas(t)', type: 'string', width: 75, sortable: false },
        { field: 'value3', headerName: 'εcd(t)', type: 'string', width: 75, sortable: false },
        { field: 'value4', headerName: 'εca(t)', type: 'string', width: 75, sortable: false },
        { field: 'value5', headerName: 'εcs(t)', type: 'string', width: 75, sortable: false },
	];

    React.useEffect(() => {
        if (!tdResults) return;

        const { t_s, beta_ds_t_ts, beta_as_t, epsilon_ca_t, epsilon_cd_t, epsilon_cs_t }:any = tdResults.Shrinkage.TimeDependent;
        const ShrinkageTime = t_s.map((item:any, index:any) => ({
            id: index + 1,
            time: item.toFixed(1),
            value1: beta_ds_t_ts[index].toFixed(3),
            value2: beta_as_t[index].toFixed(3),
            value3: epsilon_cd_t[index].toExponential(3),
            value4: epsilon_ca_t[index].toExponential(3),
            value5: epsilon_cs_t[index].toExponential(3),
        }));

        setRowsShrinkageTime(ShrinkageTime);
        
    },[tdResults, setRowsShrinkageTime]);

    // STRENGTH
    const [rowsStrengthTime, setRowsStrengthTime] = useRecoilState(VarRowStrengthTime);
	const columnsStrengthTime: GridColDef[] = [
        { field: 'time', headerName: 'Time', type: 'string', width: 80, sortable: false },
		{ field: 'value1', headerName: 'βcc(t)', type: 'string', width: 85, sortable: false },
        { field: 'value2', headerName: 'fcm(t)', type: 'string', width: 85, sortable: false },
        { field: 'value3', headerName: 'fctm(t)', type: 'string', width: 85, sortable: false },
        { field: 'value4', headerName: 'Ecm(t)', type: 'string', width: 85, sortable: false },
	];

    React.useEffect(() => {
        if (!tdResults) return;

        const { t_sm, beta_cc_t, fcm_t, fctm_t, Ecm_t }:any = tdResults.Strength.TimeDependent;
        const StrengthTime = t_sm.map((item:any, index:any) => ({
            id: index + 2,
            time: item.toFixed(1),
            value1: beta_cc_t[index].toFixed(3),
            value2: fcm_t[index].toFixed(3),
            value3: fctm_t[index].toFixed(3),
            value4: Ecm_t[index].toFixed(3)
        }));
        StrengthTime.unshift({ id: 1, time: '[day]', value1: '-', value2: '[MPa]', value3: '[MPa]', value4: '[GPa]' });
        setRowsStrengthTime(StrengthTime);
        
    },[tdResults, setRowsStrengthTime]);

    // Compoment for Time-Dependent
    const ComponentsCreep = () => {
        return(
            <GuideBox row width='100%' spacing={1}>
                <Stack direction="row" height={330} width={195}>
                    {ComponentsDataGrids(rowsCreepValue, columnsCreepValue)}
                </Stack>
                <Stack direction="row" height={330} width={250}>
                    {ComponentsDataGrids(rowsCreepTime, columnsCreepTime)}
                </Stack>
            </GuideBox>
        );
    };

    const ComponentsShrinkage = () => {
        return(
            <GuideBox row width='100%' spacing={1}>
                <Stack direction="row" height={330} width={195}>
                    {ComponentsDataGrids(rowsShrinkageValue, columnsShrinkageValue)}
                </Stack>
                <Stack direction="row" height={330} width={250}>
                    {ComponentsDataGrids(rowsShrinkageTime, columnsShrinkageTime)}
                </Stack>
            </GuideBox>
        );
    }

    const ComponentsStrength = () => {
        return(
            <GuideBox row width='100%' spacing={1}>
                <Stack direction="row" height={330} width={452}>
                    {ComponentsDataGrids(rowsStrengthTime, columnsStrengthTime)}
                </Stack>
            </GuideBox>
        );
    }

    const Dialog_timedependent = () => {
        return (
            <Dialog open={open} setOpen={setOpen} headerTitle="Additional Time-Dependent Informations">
                <GuideBox row show={false} width='100%' spacing={1}>
                    <GuideBox width={100}>
                    <TabGroup
                        orientation="vertical"
                        value={tdTab}
                        onChange={(event: React.SyntheticEvent, newValue: string) => setTDTab(newValue)}
                    >
                        <Tab value="Creep" label="Creep" />
                        <Tab value="Shrinkage" label="Shrinkage" />
                        <Tab value="Strength" label="Strength" />
                    </TabGroup>
                    </GuideBox>
                    {tdTab === "Creep" && ComponentsCreep()}
                    {tdTab === "Shrinkage" && ComponentsShrinkage()}
                    {tdTab === "Strength" && ComponentsStrength()}
                </GuideBox>
            </Dialog>
        );
    };

	return (
        <>
        <Button variant="contained" onClick={tabMain==="Material"? infor_open_check_material:infor_open_check_timedependent}> ADDTIONAL INFO. </Button>
        {tabMain==="Material"? dialog_material():Dialog_timedependent()}
        </>
	);
};

export default DialogButton;