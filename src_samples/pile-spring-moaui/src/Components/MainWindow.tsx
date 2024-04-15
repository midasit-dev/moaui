import React, { useCallback, useState} from 'react';

import {GuideBox, 
    Tab,
	TabGroup,
    Button,
    TemplatesFunctionalComponentsDownloadButton as DownloadButton,
    TemplatesFunctionalComponentsUploadButton as UploadButton,
} from '@midasit-dev/moaui';
import PileProperties from './PileProperties/PileMainWindow';
import SoilProperties from './SoilProperties/SoilProperties';
import ExcelReport from './ExcelReport/ReportMain'
import {ProjectName, PileTableData, SoilData, TopLevel, GroundLevel, Waterlevel, GroupEffectValue, SlopeEffectState, FoundationWidth, SideLength, DownloadData, LiquefactionState, GroupEffectState, CalVsiState} from './variables'
import {useRecoilState, useRecoilValue, useSetRecoilState,} from 'recoil';
import UploadDownload from './UploadDownload';
import * as XLSX from 'xlsx';
import ImportSpring from './ImportSpring/ImportSpring';
import { useSnackbar } from 'notistack';

function MainWindow(){

    const [projectName, setProjectName] = useRecoilState(ProjectName);
    const [piletableData, setSetPileTableData] = useRecoilState(PileTableData);
    const [soilData, setSetSoilData] = useRecoilState(SoilData);
    const [topLevel, setTopLevel] = useRecoilState(TopLevel);
    const [groundLevel, setGroundLevel] = useRecoilState(GroundLevel);
    const [waterlevel, setWaterlevel] = useRecoilState(Waterlevel);
    const [groupEffectValue, setGroupEffectValue] = useRecoilState(GroupEffectValue);
    const [slopeEffectState, setSlopeEffectState] = useRecoilState(SlopeEffectState);
    const [foundationWidth, setFoundationWidth] = useRecoilState(FoundationWidth);
    const [sideLength, setSideLength] = useRecoilState(SideLength);
    const [liquefactionState, setLiquefactionState] = useRecoilState(LiquefactionState);
    const [groupEffectState, setGroupEffectState] = useRecoilState(GroupEffectState);
    const [calVsiState, setCalVsiState] = useRecoilState(CalVsiState);

    const [tabName,setTabName] = useState("Pile")
    
    const { enqueueSnackbar } = useSnackbar();

    const handelTabChange = (event:React.SyntheticEvent, newvalue: string)=>{
        setTabName(newvalue)
    }
    const downloadData = useRecoilValue(DownloadData)
    
    const uploadData = useCallback((data:any)=>{
        const {piletableData, soilData, topLevel, groundLevel, waterlevel, groupEffectValue, slopeEffectState, foundationWidth, sideLength, projectName, liquefactionState, groupEffectState, calVsiState} = data
        setSetPileTableData(piletableData)
        setSetSoilData(soilData)
        setTopLevel(topLevel)
        setGroundLevel(groundLevel)
        setWaterlevel(waterlevel)
        setGroupEffectValue(groupEffectValue)
        setSlopeEffectState(slopeEffectState)
        setFoundationWidth(foundationWidth)
        setSideLength(sideLength)
        setProjectName(projectName)
        setLiquefactionState(liquefactionState)
        setGroupEffectState(groupEffectState)
        setCalVsiState(calVsiState)
    }, [])
    // 엑셀 저장 시 실행
    const handleExcelReport = () => {
        ExcelReport(projectName, piletableData, soilData, topLevel, groundLevel, waterlevel, groupEffectValue, slopeEffectState, foundationWidth, sideLength)
        enqueueSnackbar('Download Calculation Sheet Success', {autoHideDuration: 3000})
    }

    const handleCivilImport = () => {
        ImportSpring(projectName, piletableData, soilData, topLevel, groundLevel, waterlevel, groupEffectValue, slopeEffectState, foundationWidth, sideLength)
        enqueueSnackbar('Import General Spring Success', {autoHideDuration: 3000})
    }

    return(
        <GuideBox width="auto">
            <GuideBox row width='100%'>
                <TabGroup
                    orientation='vertical'
                    value={tabName}
                    onChange={handelTabChange}
                >
                    <Tab value="Pile" label='말뚝 정보'/>
                    <Tab value="Soil" label='지반 정보'/>
                </TabGroup>
                {tabName === "Pile" && <PileProperties/>}
                {tabName === "Soil" && <SoilProperties/>}
                
            </GuideBox>
            <GuideBox width={900} row horRight spacing={1} marginBottom={1}>
                <DownloadButton 
                valueToDownload={downloadData}
                buttonProps={{
                    color : 'normal'
                }}            
                buttonName='다운로드'
                />
                <UploadButton
                    onAfterUpload={uploadData}
                    buttonProps={{
                        color : 'normal'
                    }}
                    buttonName='업로드'
                />
                <Button
                onClick={handleExcelReport}
                > 계산서 출력 </Button>
                <Button 
                onClick = {handleCivilImport}
                > Import General Spring </Button>
            </GuideBox>
        </GuideBox>
    );
};

export default MainWindow

