import React from 'react';
import { styled } from '@mui/material/styles';
import MoaStyledComponent from "../../Style/MoaStyled";
import {
  DataGrid,
  DataGridProps,
  GridCellParams,
  GridCellEditStartParams,
	GridCellEditStopParams,
	MuiBaseEvent,
	GridToolbar,
	type GridColumnVisibilityModel,
	GridToolbarContainer, 
	GridToolbarExport,
} from "@mui/x-data-grid";
import Color from "../../Style/Color";
import MoaCheck from '../Check';

export interface StyledProps extends DataGridProps {
	/**
	 * when cell is clicked, this event is called
	 */
	onCellClick?: (params: any) => void;
	/**
	 * when cell is keydown, this event is called
	 */
	onCellKeyDown?: (params: GridCellParams<any>, event: React.KeyboardEvent<HTMLElement>) => void;
	/**
	 * when cell is edit start, this event is called
	 */
	onCellEditStart? : (params: GridCellEditStartParams, event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) => void;
	/**
	 * when cell is edit stop, this event is called
	 */
	onCellEditStop?: (params: GridCellEditStopParams, event: MuiBaseEvent) => void;
	/**
	 * disableColumnMenu
	 * @default false
	 */
	columnMenu?: boolean;
	/**
	 * disableColumnFilter
	 * @default fasle
	 */
	columnSelector?: boolean;
	/**
	 * disableColumnFilter
	 * @default fasle
	 */
	columnFilter?: boolean;
	/**
	 * disableDensitySelector
	 * @default false
	 */
	densitySelector?: boolean;
	/**
	 * disableRowSelectionOnClick
	 * @default false
	 */
	disableRowSelectionOnClick?: boolean;
	/**
	 * override components
	 */
	slots?: any;
	/**
	 * cell Editable
	 * @default undefined
	 */
	isCellEditable?: any;
	/**
	 * column visibility model
	 * @default undefined
	 */
	columnVisibilityModel?: GridColumnVisibilityModel;
	/**
	 * not used
	 */
	sx?: never,
};

const StyledComponent = styled((props: StyledProps) : React.ReactElement => {	
	const { 
		onCellClick, 
		onCellKeyDown,
		onCellEditStart,
		onCellEditStop,
		columnMenu,
		columnSelector,
		columnFilter,
		densitySelector,
		disableRowSelectionOnClick,
		isCellEditable,
		columnVisibilityModel,
		slots,
		sx, 
		...rest 
	} = props;

	if (sx) console.error('The sx prop is not used in StyledComponent');
	
	return (
		<DataGrid
			density="compact"
			{...rest}
			disableColumnMenu={!columnMenu ?? true}
			disableColumnSelector={!columnSelector ?? true}
			disableColumnFilter={!columnFilter ?? true}
			disableDensitySelector={!densitySelector ?? true}
			disableRowSelectionOnClick={disableRowSelectionOnClick ?? false}
			slots={{
				baseCheckbox: MoaCheck,
				...slots,
			}}
			slotProps={{
				row: {
					rowHeight: 32,
				},
				cell: {
					align: "center",
					height: 32,
				},
			}}
			rowHeight={32}
			isCellEditable={isCellEditable ?? undefined}
			columnVisibilityModel={columnVisibilityModel ?? undefined}
			sx={{
				".MuiDataGrid-columnHeaders": {
					fontWeight: 500,
					backgroundColor: Color.component.gray_light,
				},
				".MuiDataGrid-columnSeparator": {
					color: Color.component.gray,
				},
				".MuiDataGrid-columnHeaderTitleContainer": {
					justifyContent: "center",
				},
				".MuiDataGrid-cell:focus": {
					outline: `solid ${Color.primary.focus} 1px`,
				},
				".MuiDataGrid-row.Mui-selected:hover": {
					backgroundColor: Color.component.gray_02,
				},
				".MuiDataGrid-row.Mui-selected": {
					backgroundColor: Color.component.gray_02,
				},
				".MuiDataGrid-toolbarContainer": {
					backgroundColor: Color.component.gray_light,
				},
				".MuiButtonBase-root": {
					color: Color.primary.hover,
					fontSize: '0.7rem',
					textTransform: 'none',
				},
				".MuiButtonBase-root:hover": {
					backgroundColor: Color.primary.hover,
					color: Color.primary.white,
				},
				".MuiButton-startIcon": {
					fontSize: '1rem',
				},
				".MuiSvgIcon-root": {
					fontSize: '1rem',
				},
			}}
			onCellClick={onCellClick}
			onCellKeyDown={onCellKeyDown}
			onCellEditStart={onCellEditStart}
			onCellEditStop={onCellEditStop}
		/>
	)
})(() => ({}));

const ThemedComponent = (props: StyledProps) => (
	<MoaStyledComponent>
		<StyledComponent {...props} />
	</MoaStyledComponent>
);
export default ThemedComponent;

export {
	GridToolbar,
	GridToolbarContainer,
	GridToolbarExport,
}