import { styled } from '@mui/material/styles';
import MoaStyledComponent from "../../Style/MoaStyled";
import TableRow from '@mui/material/TableRow';

export type StyledProps = {
  /**
   * current element id
   * @defaultValue ""
   * @optional
   * @type string
   */
  id?: React.HtmlHTMLAttributes<HTMLDivElement>["id"];

  /**
   * Should be valid <tr> children such as `TableCell`.
   */
  children?: React.ReactNode;

  /**
   * If `true`, the table row will shade on hover.
   * @defaultValue false
   */
  hover?: boolean;

  /**
   * If `true`, the table row will have the selected shading.
   * @defaultValue false
   */
  selected?: boolean;

  /**
   * `Not Used` The sx prop lets you style elements quickly using values from your theme.
   * @defaultValue undefined
   */
  sx?: never;
};

const StyledComponent = styled((props: StyledProps) : React.ReactElement => {
	const { id, sx, ...rest } = props;
	if (sx) console.error('The sx prop is not used in StyledComponent');
	return (
		<TableRow id={id} {...rest} />
	)
})(() => ({}));

const ThemedComponent = (props: StyledProps) => (
	<MoaStyledComponent>
		<StyledComponent {...props} />
	</MoaStyledComponent>
);
export default ThemedComponent;