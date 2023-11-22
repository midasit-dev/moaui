import * as React from 'react';
import MoaStack from '@midasit-dev/moaui/Stack';
import MoaDataGrid from '@midasit-dev/moaui/DataGrid';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

const columnPreset = {
  width: 80,
  sortable: false,
  type: 'number',
  headerAlign: 'center',
  headerHeight: 20
}

const columns = [
  { 
    field: 'index',
    headerName: 'Index',
    editable: false,
    ...columnPreset
  },
  {
    field: 'loads',
    headerName: 'Pn [kN]',
    editable: true,
    ...columnPreset
  },
  {
    field: 'dist',
    headerName: 'Dn [m]',
    editable: true,
    ...columnPreset
  }
];

let alignIdCounter = 0;

export default function DataGridAxle(axleLoads ,setAxleLoads) {

  function createRow() {
    alignIdCounter = axleLoads.length;
    alignIdCounter += 1;
    return {id: alignIdCounter, index: alignIdCounter, loads:1, dist:1}
  }
  function addRow() {
    setAxleLoads((prevRows) => [...prevRows, createRow()]);
  }
  function removeRow() {
    setAxleLoads((prevRows) => {
      const rowToDeleteIndex = prevRows.length - 1;
      return [
        ...axleLoads.slice(0, rowToDeleteIndex),
        ...axleLoads.slice(rowToDeleteIndex + 1),
      ]
    });
  }
  const processRowUpdate = React.useCallback(
    async (newRow) => {
      const updatedRow = { ...newRow };
      setAxleLoads(axleLoads.map((row) => (row.id === newRow.id ? updatedRow : row)));
      return updatedRow;
    },
    [axleLoads, setAxleLoads]
  );
  const handleProcessRowUpdateError = React.useCallback((error) => {
    console.log("Error!");
  }, []);

  return (
    <MoaStack spacing={1} justifyContent={"center"} alignItems={"flex-start"} direction="row">
		<MoaStack height={190} width={250}>
          <MoaDataGrid
            rows={axleLoads}
            columns={columns}
            disableColumnMenu={true}
            hideFooter={true}
            desity="compact"
            rowHeight={25}
            processRowUpdate={processRowUpdate}
            onProcessRowUpdateError={handleProcessRowUpdateError}
            columnHeaderHeight={25}
            showCellVerticalBorder
            showColumnVerticalBorder
          />
		</MoaStack>
		<MoaStack direction="column">
          <IconButton aria-label="add" color="primary" onClick={addRow}> 
            <AddCircleOutlineIcon></AddCircleOutlineIcon>
          </IconButton>
          <IconButton aria-label="delete" onClick={removeRow}> 
            <RemoveCircleOutlineIcon></RemoveCircleOutlineIcon>
          </IconButton>
		</MoaStack>
    </MoaStack>
  );
}