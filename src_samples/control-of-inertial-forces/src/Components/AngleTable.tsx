/**
 *  ██████╗ ██████╗ ███╗   ███╗██████╗  ██████╗ ███╗   ██╗███████╗███╗   ██╗████████╗
 * ██╔════╝██╔═══██╗████╗ ████║██╔══██╗██╔═══██╗████╗  ██║██╔════╝████╗  ██║╚══██╔══╝
 * ██║     ██║   ██║██╔████╔██║██████╔╝██║   ██║██╔██╗ ██║█████╗  ██╔██╗ ██║   ██║   
 * ██║     ██║   ██║██║╚██╔╝██║██╔═══╝ ██║   ██║██║╚██╗██║██╔══╝  ██║╚██╗██║   ██║   
 * ╚██████╗╚██████╔╝██║ ╚═╝ ██║██║     ╚██████╔╝██║ ╚████║███████╗██║ ╚████║   ██║   
 *  ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚═╝      ╚═════╝ ╚═╝  ╚═══╝╚══════╝╚═╝  ╚═══╝   ╚═╝   
 */

import React from "react";
import { useRecoilState } from "recoil";
import { VarRowData } from "./variables";
import { GuideBox, Typography, IconButton, Icon, DataGrid, Separator, Panel } from "@midasit-dev/moaui";
import { useGridApiRef, GridColDef } from '@mui/x-data-grid';

const CompAngleTable = () => {
	const [rows, setRows] = useRecoilState(VarRowData);

	const columns: GridColDef[] = [
		{
			field: 'index',
			headerName: 'Index',
			type: 'number',
			align: 'left',
			headerAlign: 'left',
			width: 100,
			sortable: false
		},
		{
			field: 'angle',
			headerName: 'Angle [deg]',
			type: 'number',
			width: 180,
			editable: true,
			sortable: false,
			renderCell: (params) => (
				<div
					style={{
						// backgroundColor: isDuplicate(params.value) ? '#d47483' : 'inherit',
						color: isDuplicate(params.value) ? '#d47483' : 'inherit',
					}}
				>
				{params.value}
				</div>
			),
		}
	];

	const isDuplicate = (value: number) => rows.filter((row) => row.angle === value).length > 1;

	let idCounter:number = 0;
	const createRow = () => {
		const rowIds = apiRef.current.getAllRowIds();
		if (rowIds.length === 0) {
			idCounter = -1;
		} else {
			const maxids = rowIds[rowIds.length-1];
			idCounter = Number(maxids);
		}
		idCounter += 1;
		return { id: idCounter, index: idCounter+1, angle: 0 };
	};
	
	const apiRef = useGridApiRef();

	const handleDeleteRow = () => {
		const rowIds = apiRef.current.getAllRowIds();
		const maxids = rowIds[rowIds.length-1];
		apiRef.current.updateRows([{ id: maxids, _action: 'delete' }]);
		setRows(rows.filter((row) => row.id !== maxids));
	};

	const handleAddRow = () => {
		const addRow = createRow();
		apiRef.current.updateRows([addRow]);
		setRows([...rows, addRow]);
	};

	const processRowUpdate = React.useCallback(
		async (newRow:any) => {
			const updatedRow = { ...newRow };
			setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
			return updatedRow;
	},[rows, setRows]);

	return (
		<GuideBox width="100%" spacing={2}>
			<GuideBox width="100%" spacing={1}>
				<GuideBox width="100%" row verCenter horSpaceBetween>
					<Typography variant="h1">Angle of Horizontal Load</Typography>
					<GuideBox row horRight>
						<IconButton transparent onClick={handleAddRow}>
							<Icon iconName="Add" />
						</IconButton>
						<IconButton transparent onClick={handleDeleteRow}>
							<Icon iconName="Remove" />
						</IconButton>
					</GuideBox>
				</GuideBox>
				<Separator />
			</GuideBox>

			<GuideBox width="100%">
				<Panel variant='box' width="100%" height={135}>
					<DataGrid
						apiRef={apiRef}
						rows={rows}
						columns={columns}
						disableColumnMenu={true}
						columnHeaderHeight={50}
						hideFooter
						processRowUpdate={processRowUpdate}
					/>
				</Panel>
			</GuideBox>
		</GuideBox>

	);
};

export default CompAngleTable;
