import { styled } from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';

export type StyledProps = {
	/**
	 * Should be valid <tr> children such as `TableCell`.
	 */
	children?: React.ReactNode[],

	/**
	 * If `true`, the table row will shade on hover.
	 * @default false
	 */
	hover?: boolean,

	/**
	 * If `true`, the table row will have the selected shading.
	 * @default false
	 */
	selected?: boolean,
};

type InnerStyledProps = {
	theme: any;
};

const StyledComponent = styled((props: StyledProps) : React.ReactElement => {
	return (
		<TableRow {...props} />
	)
})((props: InnerStyledProps) => ({}));

export default StyledComponent;