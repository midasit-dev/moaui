import MoaStyledComponent from "../../Style/MoaStyled";

import { styled } from '@mui/material/styles';
import TableCell from '@mui/material/TableCell';

export type StyledProps = {
  /**
   * current element id
   * @defaultValue ""
   * @optional
   * @type string
   */
  id?: React.HtmlHTMLAttributes<HTMLDivElement>["id"];
  /**
   * Set the text-align on the table cell content.
   * @defaultValue center
   */
  align?: "center";

  /**
   * The content of the component.
   */
  children?: React.ReactNode;

  /**
   * Sets the padding applied to the cell.
   * The prop defaults to the value inherited from the parent Table component.
   * @defaultValue 'normal'
   */
  padding?: "checkbox" | "none" | "normal";

  /**
   * Specify the size of the cell.
   * @defaultValue 'medium'
   */
  size?: "medium";

  /**
   * Set aria-sort direction.
   */
  sortDirection?: "asc" | "desc" | false;

  //below are custom props
  /**
   * Set view state of the checkbox.
   * @defaultValue false
   */
  showCheckbox?: boolean;

  /**
   * Set view state of the label.
   * @defaultValue true
   */
  hideLabel?: boolean;

  /**
   * Set view state of left icon.
   * @defaultValue false
   */
  showLeftIcon?: boolean;

  /**
   * Set view state of right icon.
   * @defaultValue false
   */
  showRightIcon?: boolean;

  /**
   * Set enabled state of the component.
   * @defaultValue true
   */
  enabled?: boolean;

  /**
   * `Not Used` The sx prop lets you style elements quickly using values from your theme.
   * @defaultValue undefined
   */
  sx?: never;
};

const StyledComponent = styled((props: StyledProps) : React.ReactElement => {
	const { id, showCheckbox, hideLabel, showLeftIcon, showRightIcon, enabled, sx, ...muiProps } = props;
	if (showCheckbox || hideLabel || showLeftIcon || showRightIcon || enabled) console.error('The showCheckbox, hideLabel, showLeftIcon, showRightIcon, enabled props are not used in StyledComponent');
	if (sx) console.error('The sx prop is not used in StyledComponent');
	
	return (
		<TableCell id={id} {...muiProps} sx={{
			padding: "0.75rem"
		}} />
	)
})(() => ({}));

const ThemedComponent = (props: StyledProps) => (
	<MoaStyledComponent>
		<StyledComponent {...props} />
	</MoaStyledComponent>
);
export default ThemedComponent;