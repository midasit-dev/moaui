import { styled } from '@mui/material/styles';
import MoaStyledComponent from "../../Style/MoaStyled";
import MuiList from "@mui/material/List";

export interface StyledProps {
  /**
   * current element id
   * @defaultValue ""
   * @optional
   * @type string
   */
  id?: React.HtmlHTMLAttributes<HTMLDivElement>["id"];
  /**
   * Represent a text string in typography component
   */
  children?: React.ReactNode;
  /**
   * If `true`, compact vertical padding designed for keyboard and mouse input is used for
   * the list and list items.
   * The prop is available to descendant components as the `dense` context.
   * @default false
   */
  dense?: boolean;
  /**
   * If `true`, vertical padding is removed from the list.
   * @default false
   */
  disablePadding?: boolean;
}

const StyledComponent = styled((props: StyledProps) => {
	const { id, children, dense, disablePadding } = props;

	return (
		<MuiList
			id={id}
			dense={dense}
			disablePadding={disablePadding}
		>
			{children}
		</MuiList>
	)
})(() => ({ }))

const ThemedComponent = (props: StyledProps) => (
	<MoaStyledComponent>
		<StyledComponent {...props} />
	</MoaStyledComponent>
);

export default ThemedComponent;