import React, { useState, useEffect, useRef } from 'react';
import { 
	Color, 
	TextField, 
	Dialog, Icon, 
	IconButton, 
	Typography, 
	GuideBox, 
	DataGrid, 
	Button,
	Tooltip,
} from "@midasit-dev/moaui";

interface Column {
	field: string;
	headerName: string;
	width: number;
	sortable: boolean;
}

interface ColumnSetting {
	headerName: string;
	width: number;
}

interface Row {
	id: number;
	[key: string]: any;
}

interface TemplatesProps {
  columns?: Column[];
  setColumns?: any;
  rows?: Row[];
  setRows?: any;
	initMode?: 'edit' | 'clipboard';

	//for DataGrid
	dataGridPageSize?: number;
	dataGridHeight?: string | number;
}

const TemplatesFunctionalComponentsDataGridWithClipboardOption: React.FC<TemplatesProps> = ({
  columns: externalColumns = [],
  setColumns: externalSetColumns,
  rows: externalRows = [],
  setRows: externalSetRows,
	initMode: externalInitMode = 'clipboard',
	dataGridPageSize: externalDataGridPageSize,
	dataGridHeight: externalDataGridHeight,
}) => {
  const [internalColumns, internalSetColumns] = useState<Column[]>(columnsDefault);
  const [internalRows, internalSetRows] = useState(rowsDefault);

	// If there is a function passed in from the outside, use that function.
	// Otherwise, use the function created internally.
	const columns = externalColumns.length > 0 ? externalColumns : internalColumns;
	const setColumns = externalSetColumns || internalSetColumns;

	const rows = externalRows.length > 0 ? externalRows : internalRows;
	const setRows = externalSetRows || internalSetRows;

	//for Columns - Modify Dialog Open State
	const [open, setOpen] = useState<boolean>(false);
	//Clipboard Option
	const [enableClipboardOption, setEnableClipboardOption] = useState(externalInitMode === 'clipboard');

	//for DataGrid
	const dataGridPageSize = externalDataGridPageSize || 10;
	const dataGridHeight = externalDataGridHeight || 414;

  return (
    <GuideBox 
			width='100%' 
			padding={2} 
			borderRadius={1} 
			border={enableClipboardOption ? `1px solid ${Color.secondary.main}` : '1px solid #eee'}
		>
      <GuideBox spacing={2} center>
				{/** clipboardOption Controller */}
				<CompClipboardController 
					enableClipboardOption={enableClipboardOption}
					setEnableClipboardOption={setEnableClipboardOption}
					columns={columns}
					setColumns={setColumns}
					rows={rows}
					setRows={setRows}
					setOpen={setOpen}
				/>

				{/** DataGrid */}
				<CompDataGrid
					rows={rows}
					setRows={setRows}
					columns={columns}
					enableClipboardOption={enableClipboardOption}
					dataGrid={{
						pageSize: dataGridPageSize,
						height: dataGridHeight,
					}}
				/>
			</GuideBox>

			{/** Column Settings Dialog */}
			<CompColumnSettingsDialog 
				open={open}
				setOpen={setOpen}
				columns={columns}
				setColumns={setColumns}
				rows={rows}
				setRows={setRows}
			/>
    </GuideBox>
  );
};

export default TemplatesFunctionalComponentsDataGridWithClipboardOption;

//     _______. __    __  .______       _______  __    __  .__   __.   ______      _______.
//    /       ||  |  |  | |   _  \     |   ____||  |  |  | |  \ |  |  /      |    /       |
//   |   (----`|  |  |  | |  |_)  |    |  |__   |  |  |  | |   \|  | |  ,----'   |   (----`
//    \   \    |  |  |  | |   _  <     |   __|  |  |  |  | |  . `  | |  |         \   \    
//.----)   |   |  `--'  | |  |_)  |    |  |     |  `--'  | |  |\   | |  `----..----)   |   
//|_______/     \______/  |______/     |__|      \______/  |__| \__|  \______||_______/    
///////////////////////////////////////////////////////////////////////////////////////////

const toggleEnableClipboardOption = (columns: any, setColumns: any, b: boolean) => {
	const temp = columns.map((elem: any) => {
		return { ...elem, editable: b }
	});
	setColumns(temp);
}

const createRowsToUpdate = (clipboardText: string, columns: any[], currentField: any): any[] => {
  const lines = clipboardText.split('\n').filter(item => item !== '');

  const startIndex = columns.findIndex(col => col.field === currentField);
  const targetColumns = columns.slice(startIndex);

  const parsedData = lines.map(line => {
    const values = line.split('\t');

    const rowData: any = {};
    targetColumns.forEach((col, index) => {
      if (values[index]) {
        rowData[col.field] = values[index]
      }
    });

    return rowData;
  });

  return parsedData;
};

const isPasteKeyDown = (e: any) => {
	return e.ctrlKey && e.key === 'v';
}

const isClipboardTextParsable = (clipboardText: string) => {
  return (clipboardText.includes('\n') || clipboardText.includes('\t'));
};

const updatedRows = (preRows: any, rowsToUpdate: any, selectedRowId: number) => {
  let raw_rows_idx = 0;
  return preRows.map((row: Row) => {
    if (row.id >= selectedRowId) {
      return { ...row, ...(rowsToUpdate[raw_rows_idx++] || {}) }
    }
		return row;
  });
}

/**
 * new column and row functions
 */
const getNewColumn = (name: string, width: number, cols: any) => {
	const nextIdx = Array.from(cols).length + 1;
  return { field: `${name}${nextIdx}`, headerName: `${name}${nextIdx}`, width: width, sortable: false };
}

const getNewRow = (cols: any, rows: any) => {
	const nextRowId = (rows: any) => {
		const lastRow = rows.length !== 0 ? rows[rows.length - 1] : undefined;
		return lastRow ? lastRow.id + 1 : 1;
	}
	
  const colFieldValues = cols.reduce((result: any, col: any) => {
    result[col.field] = '';
    return result;
  }, {});

  return { id: nextRowId(rows), ...colFieldValues };
}

/**
 * columns and rows default values
 */
const columnsDefault = [
	{ field: "Col1", headerName: "Col1", width: 115, sortable: false },
	{ field: "Col2", headerName: "Col2", width: 115, sortable: false },
	{ field: "Col3", headerName: "Col3", width: 115, sortable: false },
];

const rowsDefault = [
	{ id: 1, Col1: "", Col2: "", Col3: "" },
	{ id: 2, Col1: "", Col2: "", Col3: "" },
	{ id: 3, Col1: "", Col2: "", Col3: "" },
];

//	     _______. __    __  .______        ______   ______   .___  ___. .______        _______.
//	    /       ||  |  |  | |   _  \      /      | /  __  \  |   \/   | |   _  \      /       |
//	   |   (----`|  |  |  | |  |_)  |    |  ,----'|  |  |  | |  \  /  | |  |_)  |    |   (----`
//	    \   \    |  |  |  | |   _  <     |  |     |  |  |  | |  |\/|  | |   ___/      \   \    
//	.----)   |   |  `--'  | |  |_)  |    |  `----.|  `--'  | |  |  |  | |  |      .----)   |   
//	|_______/     \______/  |______/      \______| \______/  |__|  |__| | _|      |_______/    
///////////////////////////////////////////////////////////////////////////////////////////////

const CompClipboardController = (props: any) => {
	const {
		enableClipboardOption,
		setEnableClipboardOption,
		columns,
		setColumns,
		rows,
		setRows,
		setOpen,
	} = props;
	return (
		<GuideBox show width={350} borderRadius='4px'>
			<GuideBox paddingX={2} paddingY={3} width='100%' height={30} verCenter horSpaceBetween borderRadius={1} row spacing={2}>
				{!enableClipboardOption ?
					<IconButton
						onClick={() => {
							toggleEnableClipboardOption(columns, setColumns, false);
							setEnableClipboardOption(true);
						}}
					>
						<Icon iconName="ToggleOffSharp" />
					</IconButton> :
						<IconButton
							color='negative'
							onClick={() => {
								toggleEnableClipboardOption(columns, setColumns, true);
								setEnableClipboardOption(false);
							}}
						>
							<Icon iconName="ToggleOnSharp" />
						</IconButton>
				}
				{!enableClipboardOption ?
					<Typography variant='h1' color='#777'>Edit Mode</Typography> :
						<Typography variant='h1'>Clipboard Mode</Typography>
				}
			</GuideBox>
			<GuideBox paddingX={2} paddingY={1} show row spacing={0} width='100%' horSpaceBetween borderRadius='0px 0px 4px 4px'>
				<GuideBox show fill='2' row spacing={0} center borderRadius='6px'>
					<Tooltip title='Reset'>
						<IconButton 
							disabled={!enableClipboardOption} 
							onClick={() => {
								setRows(rowsDefault);
								setColumns(columnsDefault);
							}}
							transparent
						>
							<Icon iconName="RestartAlt" />
						</IconButton>
					</Tooltip>
					<Tooltip title='Clear All'>
						<IconButton 
							disabled={!enableClipboardOption} 
							onClick={() => {
								setRows(rows.map((row: Row) => {
									const initializedRow: { [key: string]: any } = { id: row.id };
									Object.keys(row).forEach((key) => {
										if (key !== 'id') initializedRow[key] = "";
									});
									return initializedRow;
								}));
							}}
							transparent
						>
							<Icon iconName="ClearAll" />
						</IconButton>
					</Tooltip>
					<Tooltip title='Copy All'>
						<IconButton
							disabled={!enableClipboardOption}
							onClick={async () => {
								const orderedColNames: string[] = columns.map((col: Column) => {
									return col.headerName;
								});

								const filter_rows_mapArr = Array.from(rows).map((row: any) => {
									const { id, ...rest } = row;
									if (id) {}
									const restKeys = Object.keys(rest);
									let result = new Map();
									orderedColNames.forEach((headerName: string) => {
										restKeys.forEach((key: string) => {
											if (headerName === key) {
												result.set(key, rest[key]);
											}
										});
									});
									return result;
								});

								if (filter_rows_mapArr.length === 0) return;
								const s_header = Array.from(filter_rows_mapArr[0].keys()).join('\t');
								let s_rows = '';
								filter_rows_mapArr.forEach((map: Map<any, any>) => {
									const valArr: any[] = [];
									map.forEach((value: any) => valArr.push(value));
									s_rows += valArr.join('\t');
									s_rows += '\n';
								});
								const clipboardText = `${s_header}\n${s_rows}`;
								await window.navigator.clipboard.writeText(clipboardText);
							}}
							transparent
						>
							<Icon iconName='ContentCopy' />
						</IconButton>
					</Tooltip>
				</GuideBox>
				<GuideBox show fill='2' row spacing={0} center borderRadius='6px'>
					<Tooltip title='Add Row'>
						<IconButton 
							disabled={!enableClipboardOption} 
							onClick={() => setRows((pre: any) => pre.concat(getNewRow(columns, pre)))}
							transparent
						>
							<Icon iconName='ArrowDownward' />
						</IconButton>
					</Tooltip>
					<Tooltip title='Delete Row'>
						<IconButton disabled={!enableClipboardOption} onClick={() => {
							setRows((pre: any) => {
								const temp = Array.from(pre);
								if (temp.length !== 0) temp.splice(temp.length - 1, 1);
								return temp;
							})}}
							transparent
						>
							<Icon iconName='ArrowUpward' />
						</IconButton>
					</Tooltip>
					<Tooltip title='Add Column'>
						<IconButton
							disabled={!enableClipboardOption}
							onClick={() => {
								setColumns((pre: any) => pre.concat(getNewColumn('Col', 115, columns)));
							}}
							transparent
						>
							<Icon iconName="ArrowForward" />
						</IconButton>
					</Tooltip>
					<Tooltip title='Delete Column'>
						<IconButton disabled={!enableClipboardOption} onClick={() => {
							setColumns((pre: Column[]) => {
								const temp = Array.from(pre);
								if (temp.length !== 0) temp.splice(temp.length - 1, 1);
								return temp;
							})}}
							transparent
						>
							<Icon iconName="ArrowBack" />
						</IconButton>
					</Tooltip>
				</GuideBox>
				<GuideBox show fill='2' row spacing={0} center borderRadius='6px'>
					<Tooltip title='Column Settings'>
						<IconButton
							disabled={!enableClipboardOption}
							onClick={() => setOpen(true)}
							transparent
						>
							<Icon iconName="ViewWeek" />
						</IconButton>
					</Tooltip>
				</GuideBox>
			</GuideBox>
		</GuideBox>
	)
}

const CompDataGrid = (props: any) => {
	const {
		rows,
		setRows,
		columns,
		enableClipboardOption,
	} = props;

	return (
		<GuideBox width="100%" height={414} center>
			<DataGrid
				rows={rows}
				columns={columns}
				initialState={{
					pagination: {
						paginationModel: {
							pageSize: 10,
						},
					},
				}}
				onCellKeyDown={async (selectedCell: any, e: any) => {
					if (enableClipboardOption && isPasteKeyDown(e)) {
						const clipboard = await window.navigator.clipboard.readText();
						if (isClipboardTextParsable(clipboard)) {
							const rowsToUpdate = createRowsToUpdate(clipboard, columns, selectedCell.field);
							if (rowsToUpdate.length === 0) return;
							setRows(updatedRows(rows, rowsToUpdate, selectedCell.id));
						}
					}

				}}
				editMode='row'
				processRowUpdate={(newRow: Row) => {
					const updatedRow = { ...newRow };
					setRows(rows.map((row: Row) => (row.id === newRow.id ? updatedRow : row)));
					return updatedRow;
				}}
			/>
		</GuideBox>
	)
}

const CompColumnSettingsDialog = (props: any) => {
	const {
		open,
		setOpen,
		columns,
		setColumns,
		rows,
		setRows,
	} = props;

	//for Columns - Modify Dialog Values
	const [columnSettings, setColumnSettings] = useState<ColumnSetting[]>([]);
	const initColumnNames = useRef<any>({ value: null });
	useEffect(() => {
		if (open) {
			setColumnSettings(columns.map((col: Column) => {
				return { headerName: col.headerName, width: col.width };
			}));

			initColumnNames.current.value = columns.map((col: Column) => col.headerName);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [open]);
	
	const [updateNewRows, setUpdateNewRows] = useState(false);
	useEffect(() => {
		if (updateNewRows) {
			// update Rows Values
			// deepCopy
			const preColumnNames = initColumnNames.current.value;
			setRows(rows.map((row: Row) => {
				const modifiedRow = row;
				for (let idx = 0; idx < columnSettings.length; ++idx) {
					const preHeaderName = preColumnNames[idx];
					const curHeaderName = columnSettings[idx].headerName;
					if (preHeaderName !== curHeaderName) {
						// update [new key]: [pre value]
						modifiedRow[curHeaderName] = row[preHeaderName];
						// delete [pre key]: [pre value]
						delete modifiedRow[preHeaderName];
					}
				}
				return modifiedRow;
			}));
			setUpdateNewRows(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [updateNewRows]);

	return (
			<Dialog
				open={open}
				setOpen={setOpen}
				headerTitle="Column Settings"
			>
				<GuideBox spacing={2} width={300}>
					{columnSettings.map((columnSetting: ColumnSetting, index: number) => (
						<GuideBox key={index} width='100%' row verCenter horSpaceBetween>
							<Typography>Name</Typography>
							<TextField
								value={columnSetting.headerName}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
									setColumnSettings((pre: any) => {
										const newValues = [...pre];
										newValues[index].headerName = e.target.value;
										return newValues;
									})
								}}
								width={100}
							/>
							<Typography>Size</Typography>
							<TextField
								value={columnSetting.width.toString()}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
									setColumnSettings((pre: any) => {
										const newValues = [...pre];
										newValues[index].width = +(e.target.value);
										return newValues;
									})
								}}
								width={100}
							/>
						</GuideBox>
					))}
					<Button
						color='negative'
						width='100%'
						onClick={() => {
							// update Columns UI
							setColumns(
								columnSettings.map((colSetting: ColumnSetting, index: number) => {
									let curColumn = columns[index];
									curColumn.field = colSetting.headerName;
									curColumn.headerName = colSetting.headerName;
									curColumn.width = colSetting.width;
									return curColumn;
							}));

							setUpdateNewRows(true);
							setOpen(false);
						}}
					>
						Apply Changes
					</Button>
				</GuideBox>
			</Dialog>
	);
}