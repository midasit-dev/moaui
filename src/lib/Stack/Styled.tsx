import Stack, { StackProps } from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

export interface StyledProps extends StackProps {
	sx?: never;
};

type InnerStyledProps = {
	theme: any;
};

const StyledComponent = styled((props: StyledProps) : React.ReactElement => {
	const { sx, ...rest } = props;

	return (
		<Stack {...rest} />
	)
})((props: InnerStyledProps) => ({}));

export default StyledComponent;