import { styled } from '@mui/material/styles';
import { DataGrid, DataGridProps } from "@mui/x-data-grid";
import Color from '../Color';
import MoaCheck from '../Check';
import Font from '../Font';

export interface StyledProps extends DataGridProps {
	sx?: never,
};

type InnerStyledProps = {
	theme: any;
};

const StyledComponent = styled((props: StyledProps) : React.ReactElement => {	
	const { sx, ...rest } = props;
	
	return (
		<DataGrid
			density="compact"
			{...rest}
			disableColumnFilter
			disableColumnMenu
			slots={{
				baseCheckbox: MoaCheck
			}}
			showColumnVerticalBorder
			slotProps={{
				row: {
					rowHeight: 32,
				},
				cell: {
					align: "center",
					height: 32,
				},
			}}
			sx={{
				".MuiDataGrid-columnHeaders": {
					...Font.defaultFontSet,
					fontSize: "0.75rem",
					fontWeight: 500,
					backgroundColor: Color.component.gray_light,
				},
				".MuiDataGrid-columnSeperator": {
					color: Color.component.gray,
				},
				".MuiDataGrid-columnHeaderTitleContainer": {
					justifyContent: "center",
				},
				".MuiDataGrid-cellContent": {
					...Font.defaultFontSet,
					fontSize: "0.75rem",
					fontWeight: 400,
				},
				".MuiDataGrid-cell:focus": {
					outline: `solid ${Color.primary.focus} 1px`,
				},
				".MuiDataGrid-row.Mui-selected:hover": {
					backgroundColor: Color.component.gray_02,
				},
				".MuiDataGrid-row.Mui-selected": {
					backgroundColor: Color.component.gray_02,
				}
			}}
		/>
	)
})((props: InnerStyledProps) => ({}));

export default StyledComponent;