import { styled } from '@mui/material/styles';
import Grid, { GridProps } from '@mui/material/Grid';

export interface StyledProps extends GridProps {
	sx? : never;
};

type InnerStyledProps = {
	theme: any;
};

const StyledComponent = styled((props: StyledProps) : React.ReactElement => {
	const {sx, ...rest} = props;
	return (
		<Grid {...rest} />
	)
})((props: InnerStyledProps) => ({}));

export default StyledComponent;