import { styled } from '@mui/material/styles';
import { DataGrid, DataGridProps } from "@mui/x-data-grid";
import Color from '../Color';

export interface StyledProps extends DataGridProps {
	sx: never,
};

type InnerStyledProps = {
	theme: any;
};

const StyledComponent = styled((props: StyledProps) : React.ReactElement => {	
	const { sx, ...rest } = props;
	return (
		<DataGrid
			autoHeight
			density="compact"
			columnVisibilityModel={{
				defaultValue: true,
				
			}}
			{...rest}
			sx={{
				".MuiDataGrid-columnHeaders": {
					backgroundColor: Color.component.gray_01,
				}
			}}
		/>
	)
})((props: InnerStyledProps) => ({}));

export default StyledComponent;