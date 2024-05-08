import MoaStyledComponent from "../../Style/MoaStyled";

import { styled } from '@mui/material/styles';
import TableBody from '@mui/material/TableBody';

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
		<TableBody id={id} {...rest} />
	)
})(() => ({}));

const ThemedComponent = (props: StyledProps) => (
	<MoaStyledComponent>
		<StyledComponent {...props} />
	</MoaStyledComponent>
);
export default ThemedComponent;