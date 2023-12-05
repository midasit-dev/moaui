import { styled } from '@mui/material/styles';
import MoaStyledComponent from "../../Style/MoaStyled";
import { ListItemButton } from '@mui/material';
import { MarginProps, MarginTypes } from '../../Style/Margin';
import { PaddingProps, PaddingTypes } from '../../Style/Padding';

export interface StyledProps extends MarginTypes, PaddingTypes {
	/**
	 * Represent a text string in typography component
	 */
	children?: React.ReactNode;
}

const StyledComponent = styled((props: StyledProps) => {
	const { children, ...rest } = props;
	return (
		<ListItemButton
			sx={{
				...MarginProps(rest),
				...PaddingProps(rest),
			}}
		>
			{children}
		</ListItemButton>
	)
})(({theme}) => ({ }))

const ThemedComponent = (props: StyledProps) => (
	<MoaStyledComponent>
		<StyledComponent {...props} />
	</MoaStyledComponent>
);

export default ThemedComponent;