import { styled } from '@mui/material/styles';
import Color from "../Color";
import TableHead from '@mui/material/TableHead';

export type StyledProps = {
	/**
	 * The content of the component, normally `TableRow`.
	 */
	children?: React.ReactNode,
};

type InnerStyledProps = {
	theme: any;
};

const StyledComponent = styled((props: StyledProps) : React.ReactElement => {
	return (
		<TableHead {...props} sx={{
			backgroundColor: Color.component.gray_01,
		}} />
	)
})((props: InnerStyledProps) => ({}));

export default StyledComponent;