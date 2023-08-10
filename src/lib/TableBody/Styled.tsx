import { styled } from '@mui/material/styles';
import TableBody from '@mui/material/TableBody';

export type StyledProps = {
	/**
	 * The content of the component, normally `TableRow`.
	 */
	children?: React.ReactNode[],
};

type InnerStyledProps = {
	theme: any;
};

const StyledComponent = styled((props: StyledProps) : React.ReactElement => {
	return (
		<TableBody {...props} />
	)
})((props: InnerStyledProps) => ({}));

export default StyledComponent;