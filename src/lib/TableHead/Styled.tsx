import { styled } from '@mui/material/styles';
import TableHead from '@mui/material/TableHead';

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
		<TableHead {...props} />
	)
})((props: InnerStyledProps) => ({}));

export default StyledComponent;