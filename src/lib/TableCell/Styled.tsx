import { styled } from '@mui/material/styles';
import TableCell from '@mui/material/TableCell';

export type StyledProps = {
	/**
	 * Set the text-align on the table cell content.
	 * @default center
	 */
	align?: 'center',

	/**
	 * The content of the component.
	 */
	children?: React.ReactNode,

	/**
	 * Sets the padding applied to the cell.
	 * The prop defaults to the value inherited from the parent Table component.
	 * @default 'normal'
	 */
	padding?: 'checkbox' | 'none' | 'normal',
	
	/**
	 * Specify the size of the cell.
	 * @default 'medium'
	 */
	size?: 'medium',

	/**
	 * Set aria-sort direction.
	 */
	sortDirection?: 'asc' | 'desc' | false,

	/**
	 * Specify the cell type.
	 * @default 'body'
	 */
	variant?: 'head' | 'body' | 'footer',
};

type InnerStyledProps = {
	theme: any;
};

const StyledComponent = styled((props: StyledProps) : React.ReactElement => {
	return (
		<TableCell {...props} />
	)
})((props: InnerStyledProps) => ({}));

export default StyledComponent;