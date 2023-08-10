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

	//below are custom props
	/**
	 * Set view state of the checkbox.
	 * @default false
	 */
	showCheckbox?: boolean,

	/**
	 * Set view state of the label.
	 * @default true
	 */
	hideLabel?: boolean,

	/**
	 * Set view state of left icon.
	 * @default false
	 */
	showLeftIcon?: boolean,

	/**
	 * Set view state of right icon.
	 * @default false
	 */
	showRightIcon?: boolean,

	/**
	 * Set enabled state of the component.
	 * @default true
	 */
	enabled? : boolean,
};

type InnerStyledProps = {
	theme: any;
};

const StyledComponent = styled((props: StyledProps) : React.ReactElement => {
	const { showCheckbox, hideLabel, showLeftIcon, showRightIcon, enabled, ...muiProps } = props;
	
	return (
		<TableCell {...muiProps} sx={{
			padding: "0.75rem"
		}} />
	)
})((props: InnerStyledProps) => ({}));

export default StyledComponent;