import { styled } from '@mui/material/styles';
import MoaStyledComponent from "../../Style/MoaStyled";
import MuiListItem from "@mui/material/ListItem";
import { Check } from "../..";
import { MarginProps, MarginTypes } from "../../Style/Margin";
import { PaddingProps, PaddingTypes } from "../../Style/Padding";

export interface StyledProps extends MarginTypes, PaddingTypes{
  /**
   * Represent a text string in typography component
   */
  children?: React.ReactNode;
  /**
   * If `true`, the left and right padding is removed.
   * @default false
   */
  disableGutters?: boolean;
  /**
   * The element to display at the end of ListItem.
   */
  secondaryAction?: React.ReactNode;
	/**
	 * The callback function that is fired when the button is clicked.
	 * @param {React.MouseEvent<HTMLButtonElement, MouseEvent>} event The event source of the callback.
	 * @defaultValue undefined
	 * @optional
	 * @type React.MouseEventHandler<HTMLButtonElement>
	 * @example
	 * onClick={(event) => {}}
	 * onClick={handleClick}
	 */
	onClick?: React.MouseEventHandler<any> | undefined;
}

const StyledComponent = styled((props: StyledProps) => {
	const { children, disableGutters, secondaryAction, onClick } = props;
	return (
    <MuiListItem
      sx={{
        ...MarginProps(props),
        ...PaddingProps(props),
      }}
      disableGutters={disableGutters}
      secondaryAction={secondaryAction}
			onClick={onClick}
    >
      {children}
    </MuiListItem>
  );
})(({theme}) => ({ }))

const ThemedComponent = (props: StyledProps) => (
	<MoaStyledComponent>
		<StyledComponent {...props} />
	</MoaStyledComponent>
);

export default ThemedComponent;