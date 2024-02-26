import Stack, { StackProps } from '@mui/material/Stack';
import MoaStyledComponent from "../../Style/MoaStyled";
import { styled } from '@mui/material/styles';

export interface StyledProps extends StackProps {
	/**
	 * Defines the `flex-direction` style property.
	 * It is applied for all screen sizes.
	 * @default 'column'
	 */
	direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
	/**
	 * Not Used
	 */
	sx?: never;
};

const StyledComponent = styled((props: StyledProps) : React.ReactElement => {
	const { sx, ...rest } = props;
	if (sx) console.error('The sx prop is not used in StyledComponent');

	return (
		<Stack 
			direction={props.direction} 
			{...rest} 
		/>
	)
})(() => ({}));

const ThemedComponent = (props: StyledProps) => (
	<MoaStyledComponent>
		<StyledComponent {...props} />
	</MoaStyledComponent>
);
export default ThemedComponent;