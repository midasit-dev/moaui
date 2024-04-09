import React, { useEffect, useState } from 'react';
import { 
	GuideBox, 
	Panel,
	Check,
	Typography,
	TabGroup,
	Tab,
  Button,
  DataGrid
} from '@midasit-dev/moaui';
import { useRecoilState, useRecoilValue } from 'recoil';
import TypoGraphyTextField from '../NewComponents/TypoGraphyTextField';
import {selectNodeList, setColumnInfo } from '.././utils_pyscript';
import { SelectedNodes, SelectedColumnList, SelectedColumnIndex_DBName, SelectedColumnIndex, HSectionDB, SelectedDBIndex, BasePlateName,
  HBeamH, HBeamB, HBeamtf, HBeamtw, HBeamr, BasePlateWidth, BasePlateHeight, Node_BP_Data, MinMaxCoordinates, ReactionResult
} from '../variables';
import PlanViewDrawing from '../Components/PlanViewDrawing';
import TypoGraphyDropList from '../NewComponents/TypoGraphyDropList';
import {dbReadItem }from '../utils_pyscript'
import { set } from 'lodash';




function Design() {

  const [tabName, setTabName] = React.useState('Column');  
  const [selectedColumnIndex, setSelectedColumnIndex] = useRecoilState(SelectedColumnIndex);
  const [hSectionDB, setHSectionDB] = useRecoilState(HSectionDB);
  const [selectedDBIndex, setSelectedDBIndex] = useRecoilState(SelectedDBIndex);
  const [columnIndex_DBName, setcolumnIndex_DBName] = useRecoilState(SelectedColumnIndex_DBName);
  const [selectedColumnList, setSelectedColumnList] = useRecoilState(SelectedColumnList);
  const [basePlateName, setBasePlateName] = useRecoilState(BasePlateName);

  const node_BP_Data = useRecoilValue(Node_BP_Data);
  const [hBeamH, setHBeamH] = useRecoilState(HBeamH);
	const [hBeamB, setHBeamB] = useRecoilState(HBeamB);
	const [hBeamtf, setHBeamtf] = useRecoilState(HBeamtf);
	const [hBeamtw, setHBeamtw] = useRecoilState(HBeamtw);
	const [hBeamr, setHBeamr] = useRecoilState(HBeamr);
  const [basePlateWidth, setBasePlateWidth] = useRecoilState(BasePlateWidth);
  const [basePlateHeight, setBasePlateHeight] = useRecoilState(BasePlateHeight);

  const [minMaxCoordinates, setMinMaxCoordinates] = useRecoilState(MinMaxCoordinates);
  const [reactionResult, setReactionResult] = useRecoilState(ReactionResult);
  
  const columns : any = [
    {field : 'ItemName', headerName : 'Check Item.', width : 100, editable : true, sortable : false},
    {field : 'Demand', headerName : 'Demand', width : 100, editable : true, sortable : false},
    {field : 'Capacity', headerName : 'Capacity', width : 100, editable : true, sortable : false},
    {field : 'Ratio', headerName : 'Ratio', width : 100, editable : true, sortable : false},

  ]
  
  let rows_ENV :any= [
    {id : 1, ItemName : 'Bearing Stress', Demand : '', Capacity : '', Ratio : ''},
    {id : 2, ItemName : 'Comp. (MPa)', Demand : '', Capacity : '', Ratio : ''},
    {id : 3, ItemName : 'Tens. (kN)', Demand : '', Capacity : '', Ratio : ''},
    {id : 4, ItemName : 'Baseplate', Demand : '', Capacity : '', Ratio : ''},
    {id : 5, ItemName : 'Mxx (kN.m/m)', Demand : '', Capacity : '', Ratio : ''},
    {id : 6, ItemName : 'Myy (kN.m/m)', Demand : '', Capacity : '', Ratio : ''},
    {id : 7, ItemName : 'Anchor Bolt', Demand : '', Capacity : '', Ratio : ''},
    {id : 8, ItemName : 'Vu (kN)', Demand : '', Capacity : '', Ratio : ''},
    {id : 9, ItemName : 'Tu (kN)', Demand : '', Capacity : '', Ratio : ''},
    {id : 10, ItemName : 'Length (mm)', Demand : '', Capacity : '', Ratio : ''},
  ];

  const [rows_ADD, setRows_ADD] = useState<any>([]);

  const ColumnSelected = (e:any) => {
    setSelectedColumnIndex(e.target.value)
    
  }
  
  return (
    <GuideBox row >
      <Panel height={550}>
        <GuideBox spacing={1}>
          <GuideBox marginTop={1} spacing={1}>
            <TypoGraphyDropList
              title = "Column :"
              width = {350}
              dropListwidth = {200}
              items = {selectedColumnList}
              defaultValue = {selectedColumnIndex}
              value = {selectedColumnIndex}
              onChange = {ColumnSelected}
            />

          </GuideBox>

          <Typography variant='h1'>Design Result</Typography>

          <div style={{height: 365, width: '100%'}}>
            <DataGrid
              columnHeaderHeight={60}
              rowHeight={80}
              hideFooter
              columns={columns}
              rows = {rows_ENV}
            ></DataGrid>
          </div>
          <GuideBox width={400} horRight>
            <Button 
              variant='outlined'
              
            >Design Check</Button>
          </GuideBox>
          
        </GuideBox>
      </Panel>
    </GuideBox>
  );
}

export default Design;