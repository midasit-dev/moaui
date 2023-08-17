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
	 * @defaultValue 'normal'
	 */
	padding?: 'checkbox' | 'none' | 'normal',

	/**
	 * Allow TableCells to inherit size of the Table
	 * @defaultValue 'medium'
	 */
	size?: 'medium',

	/**
	 * Set the header sticky.
	 * @defaultValue false
	 */
	stickyHeader?: boolean,

	/**
	 * `Not Used` The sx prop lets you style elements quickly using values from your theme.
	 * @defaultValue undefined
	 */
	sx?: never,
};

type InnerStyledProps = {
	theme: any;
};

const StyledComponent = styled((props: StyledProps) : React.ReactElement => {	
	const { sx, ...rest } = props;

	return (
		<Table {...rest} sx={{
			border: `1px solid ${Color.component.gray_01}}`
		}} />
	)
})((props: InnerStyledProps) => ({}));

export default StyledComponent;