import { styled } from '@mui/material/styles';

export type StyledProps = {
	checked?: boolean | "inditerminate";
	disabled?: boolean,
	name?: string,
	ariaLabel?: string,
};

type InnerStyledProps = {
	theme: any;
};

const StyledComponent = styled((props: StyledProps) : React.ReactElement => {
	return (
		<div />
	)
})((props: InnerStyledProps) => ({}));

export default StyledComponent;