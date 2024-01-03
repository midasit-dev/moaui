import { styled } from '@mui/material/styles';
import MoaStyledComponent from "../../Style/MoaStyled";
import { DataGrid, DataGridProps } from "@mui/x-data-grid";
import Color from '../../Style/Color';
import MoaCheck from '../Check';

export interface StyledProps extends DataGridProps {
	/**
	 * not used
	 */
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
				}
			}}
		/>
	)
})((props: InnerStyledProps) => ({}));

const ThemedComponent = (props: StyledProps) => (
	<MoaStyledComponent>
		<StyledComponent {...props} />
	</MoaStyledComponent>
);
export default ThemedComponent;