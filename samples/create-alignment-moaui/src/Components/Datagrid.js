import * as React from 'react';
import MoaStack from "@midasit-dev/moaui/Stack";
import MoaDataGrid from '@midasit-dev/moaui/DataGrid';
import MoaIconButton from '@midasit-dev/moaui/IconButton';
import { useGridApiContext  } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import HelpIcon from '@mui/icons-material/Help';
import DropList from '@midasit-dev/moaui/DropList';

//Select for Line Type in Alignments Data Grid
function SelectEditInputCell(props) {
  const { id, value, field } = props;
  const apiRef = useGridApiContext();

  const handleChange = async (event) => {
    await apiRef.current.setEditCellValue({ id, field, value: event.target.value });
    apiRef.current.stopCellEditMode({ id, field });
  };

  return (
	<React.Fragment>
	<DropList itemList={
			() => new Map([["Straight", "Straight"], ["Arc", "Arc"], ["Clothoid", "Clothoid"], ["Cubic Parabola","Cubic Parabola"]])
		}
		value={value}
		onChange={handleChange}
	/>
	</React.Fragment>
  );
}

const renderSelectEditInputCell = (params) => {
  return <SelectEditInputCell {...params} />;
};

//Column Preset
const columnPreset = {
  sortable: false,
  editable: true,
  headerAlign: 'center',
  headerHeight: 20
}

// Column setting for Alignment Data Grid
const columnWidthAlign = {
  width: 115,
}

const columnsAlign = [
  { 
    field: 'linetype',
    headerName: 'Line Types',
    renderEditCell: renderSelectEditInputCell,
    align:'center',
    ...columnPreset,
    ...columnWidthAlign
  },
  {
    field: 'linelength',
    headerName: 'Length',
    type: 'number',
    ...columnPreset,
    ...columnWidthAlign
  },
  {
    field: 'linerads',
    headerName: 'Radius Start',
    type: 'number',
    ...columnPreset,
    ...columnWidthAlign
  },
  {
    field: 'linerade',
    headerName: 'Radius End',
    type: 'number',
    ...columnPreset,
    ...columnWidthAlign
  }
];

// Column setting for Segment Data Grid
const columnWidthSegm = {
  width: 92,
}
const columnsSegm = [
  { 
    field: 'seglength',
    headerName: 'Length',
    type: 'number',
    ...columnPreset,
    ...columnWidthSegm
  },
  {
    field: 'segNumber',
    headerName: 'Nb',
    type: 'number',
    ...columnPreset,
    ...columnWidthSegm
  },
  {
    field: 'strgroup',
    headerName: 'Str. Group',
    type: 'string',
    ...columnPreset,
    ...columnWidthSegm
  },
  {
    field: 'matlid',
    headerName: 'Material ID',
    type: 'number',
    ...columnPreset,
    ...columnWidthSegm
  },
  {
    field: 'sectid',
    headerName: 'Section ID',
    type: 'number',
    ...columnPreset,
    ...columnWidthSegm
  }
];

// DataGrid ID Counter
let alignIdCounter = 0;
let segmIdCounter = 0;

const IconButtonSet = ({ addRow = () => {}, removeRow = () => {}, helpModal = () => {}}) => {
	return (
		<React.Fragment>
			<MoaIconButton aria-label="Add" onClick={addRow} width={36}>
					<AddIcon sx={{width: "16px", height: "16px"}} />
			</MoaIconButton>
			<MoaIconButton aria-label="Delete" onClick={removeRow} width={36}>
				<RemoveIcon sx={{width: "16px", height: "16px"}} />
			</MoaIconButton>
			<MoaIconButton aria-label="Help" onClick={helpModal} width={36}>
				<HelpIcon sx={{width: "16px", height: "16px"}} />
			</MoaIconButton>
		</React.Fragment>
	)
}

//Data Grid for Alignment
export function DataGridAlign(alignGrid, setAlignGrid, AlignHelpModal) {
  function createRow() {
    alignIdCounter = alignGrid.length;
    alignIdCounter += 1;
    return {id: alignIdCounter, linetype: "Straight", linelength:30, linerads:0, linerade:0}
  }
  function addRow() {
    setAlignGrid((prevRows) => [...prevRows, createRow()]);
  }
  function removeRow() {
    setAlignGrid((prevRows) => {
      const rowToDeleteIndex = prevRows.length - 1;
      return [
        ...alignGrid.slice(0, rowToDeleteIndex),
        ...alignGrid.slice(rowToDeleteIndex + 1),
      ]
    });
  }
  const processRowUpdate = React.useCallback(
    async (newRow) => {
      const updatedRow = { ...newRow };
      setAlignGrid(alignGrid.map((row) => (row.id === newRow.id ? updatedRow : row)));
      return updatedRow;
    },
    [alignGrid, setAlignGrid]
  );
  const handleProcessRowUpdateError = React.useCallback((error) => {
    console.log("Error!");
  }, []);

  return (
		<MoaStack direction="column" spacing={0} width="100%" height="100%">
			<MoaStack direction="row" spacing={1} justifyContent="flex-end" marginY={.5}>
				<IconButtonSet addRow={addRow} removeRow={removeRow} helpModal={AlignHelpModal} />
			</MoaStack>
			<MoaStack marginLeft={1} height="251px" width="500px">
				<MoaDataGrid
					rows={alignGrid}
					columns={columnsAlign}
					disableColumnMenu={true}
					hideFooter
					processRowUpdate={processRowUpdate}
					onProcessRowUpdateError={handleProcessRowUpdateError}
				/>
			</MoaStack>
		</MoaStack>
	);
}

//Data Grid for Segment
export function DataGridSegm(segmGrid ,setSegmGrid, SegmHelpModal) {

  function createRow() {
    segmIdCounter = segmGrid.length;
    segmIdCounter += 1;
    return {id: segmIdCounter, seglength: 1, segNumber:30, strgroup:"Seg"+segmIdCounter, matlid:1, sectid:1}
  }
  function addRow() {
    setSegmGrid((prevRows) => [...prevRows, createRow()]);
  }
  function removeRow() {
    setSegmGrid((prevRows) => {
      const rowToDeleteIndex = prevRows.length - 1;
      return [
        ...segmGrid.slice(0, rowToDeleteIndex),
        ...segmGrid.slice(rowToDeleteIndex + 1),
      ]
    });
  }
  const processRowUpdate = React.useCallback(
    async (newRow) => {
      const updatedRow = { ...newRow };
      setSegmGrid(segmGrid.map((row) => (row.id === newRow.id ? updatedRow : row)));
      return updatedRow;
    },
    [segmGrid, setSegmGrid]
  );
  const handleProcessRowUpdateError = React.useCallback((error) => {
    console.log("Error!");
  }, []);
  
  return (
      <MoaStack direction="column" spacing={0} >
        <MoaStack direction="row" spacing={1} justifyContent="flex-end" marginY={.5}>
			<IconButtonSet addRow={addRow} removeRow={removeRow} helpModal={SegmHelpModal} />
        </MoaStack>
		<MoaStack marginLeft={1} height="251px" width="500px">
			<MoaDataGrid
				rows={segmGrid}
				columns={columnsSegm}
				disableColumnMenu={true}
				hideFooter
				processRowUpdate={processRowUpdate}
				onProcessRowUpdateError={handleProcessRowUpdateError}
			/>
		</MoaStack>
      </MoaStack>
  );
}