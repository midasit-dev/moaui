import {
  GuideBox,
  DataGrid,
  DataGridToolbar,
  Button,
  Panel,
  Typography,
  Color
} from '@midasit-dev/moaui';
import React from 'react';
import {useRecoilState} from 'recoil';
import { RebarListData } from './variables';
import CompHelpDialog from './HelpDialog';

const TableList = () => {

  const [rebarListData, setRebarListData] = useRecoilState(RebarListData);


  const columnsDefault = [
    { field: "id", headerName: "ID", width: 30, sortable: false },
    { field: "BeforeRebarSize", headerName: "BeforeSize", width: 115, sortable: false, editable: true },
    { field: "BeforeRebarSpacing", headerName: "BeforeSpacing", width: 115, sortable: false, editable: true },
    { field: "AfterRebarSize", headerName: "AfterSize", width: 115, sortable: false, editable: true },
    { field: "AfterRebarSpacing", headerName: "AfterSpacing", width: 115, sortable: false, editable: true },
  ];


  const rowsDefault = [
    { id: 1, beforeRebarSize: "", beforeRebarSpacing: "", afterRebarSize: "", afterRebarSpacing: "" },
    { id: 2, beforeRebarSize: "", beforeRebarSpacing: "", afterRebarSize: "", afterRebarSpacing: "" },
    { id: 3, beforeRebarSize: "", beforeRebarSpacing: "", afterRebarSize: "", afterRebarSpacing: "" },
    { id: 4, beforeRebarSize: "", beforeRebarSpacing: "", afterRebarSize: "", afterRebarSpacing: "" },
  ];
  const clearTableData = () => {
    setRebarListData([]);
  };

  return (
    <>
     
    <GuideBox height={400} width="100%">
      
      <DataGrid
        columns={columnsDefault}
        rows={rebarListData || rowsDefault} 
        // densitySelector
        slots={{
          toolbar: DataGridToolbar,
        }}
        hideFooter
      />
    </GuideBox>
    <Panel variant="shadow2" padding={1} width="100%">
    <GuideBox width="100%" row horSpaceBetween>
      <CompHelpDialog/>
      <Button variant="contained" color="normal" onClick={clearTableData}>
    Clear
    </Button>
    </GuideBox>
    </Panel>
    </>
  )
}

export default TableList;



