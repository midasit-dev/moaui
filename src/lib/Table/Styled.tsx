import { styled } from '@mui/material/styles';
import Color from "../Color";
import Table from '@mui/material/Table';

export type StyledProps = {
	/**
	 * Override or extend the styles applied to the component.
	 */
	children?: React.ReactNode,

	/**
	 * Allow TableCells to inherit padding of the table.
	 * @default 'normal'
	 */
	padding?: 'checkbox' | 'none' | 'normal',

	/**
	 * Allow TableCells to inherit size of the Table
	 * @default 'medium'
	 */
	size?: 'medium',

	/**
	 * Set the header sticky.
	 * @default false
	 */
	stickyHeader?: boolean,
};

type InnerStyledProps = {
	theme: any;
};

const StyledComponent = styled((props: StyledProps) : React.ReactElement => {	
	return (
		<Table {...props} sx={{
			border: `1px solid ${Color.component.gray_01}}`
		}} />
	)
})((props: InnerStyledProps) => ({}));

export default StyledComponent;