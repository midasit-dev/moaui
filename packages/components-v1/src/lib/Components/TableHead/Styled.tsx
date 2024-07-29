import { styled } from '@mui/material/styles';
import MoaStyledComponent from "../../Style/MoaStyled";
import Color from "../../Style/Color";
import TableHead from '@mui/material/TableHead';

export type StyledProps = {
  /**
   * current element id
   * @defaultValue ""
   * @optional
   * @type string
   */
  id?: React.HtmlHTMLAttributes<HTMLDivElement>["id"];

  /**
   * The content of the component, normally `TableRow`.
   */
  children?: React.ReactNode;

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
		<TableHead id={id} {...rest} sx={{
			backgroundColor: Color.component.gray_01,
		}} />
	)
})(() => ({}));

const ThemedComponent = (props: StyledProps) => (
	<MoaStyledComponent>
		<StyledComponent {...props} />
	</MoaStyledComponent>
);
export default ThemedComponent;