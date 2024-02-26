import { styled } from '@mui/material/styles';
import MoaStyledComponent from "../../Style/MoaStyled";
import Grid, { GridProps } from '@mui/material/Grid';

export interface StyledProps extends GridProps {
	sx? : never;
};

const StyledComponent = styled((props: StyledProps) : React.ReactElement => {
	const {sx, ...rest} = props;
	if (sx) console.error('The sx prop is not used in StyledComponent');

	return (
		<Grid {...rest} />
	)
})(() => ({}));

const ThemedComponent = (props: StyledProps) => (
	<MoaStyledComponent>
		<StyledComponent {...props} />
	</MoaStyledComponent>
);
export default ThemedComponent;