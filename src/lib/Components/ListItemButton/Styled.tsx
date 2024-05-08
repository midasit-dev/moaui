import { styled } from '@mui/material/styles';
import MoaStyledComponent from "../../Style/MoaStyled";
import ListItemButton, { type ListItemButtonProps} from '@mui/material/ListItemButton';
import { MarginProps, MarginTypes } from '../../Style/Margin';
import { PaddingProps, PaddingTypes } from '../../Style/Padding';

export type StyledProps = {
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
} & ListItemButtonProps &
  MarginTypes &
  PaddingTypes;

const StyledComponent = styled((props: StyledProps) => {
	const { id, children, ...rest } = props;
	return (
		<ListItemButton
			id={id}
			sx={{
				...MarginProps(rest),
				...PaddingProps(rest),
			}}
			{...rest}
		>
			{children}
		</ListItemButton>
	)
})(() => ({ }))

const ThemedComponent = (props: StyledProps) => (
	<MoaStyledComponent>
		<StyledComponent {...props} />
	</MoaStyledComponent>
);

export default ThemedComponent;