import { styled } from '@mui/material/styles';
import MoaStyledComponent from "../../Style/MoaStyled";
import Color from "../../Style/Color";
import TableHead from '@mui/material/TableHead';

export type StyledProps = {
	/**
	 * The content of the component, normally `TableRow`.
	 */
	children?: React.ReactNode,

	/**
	 * `Not Used` The sx prop lets you style elements quickly using values from your theme.
	 * @defaultValue undefined
	 */
	sx?: never,
};

type InnerStyledProps = {
	theme: any;
};

const StyledComponent = styled((props: StyledProps) : React.ReactElement => {
	const { sx, ...rest } = props;
	return (
		<TableHead {...rest} sx={{
			backgroundColor: Color.component.gray_01,
		}} />
	)
})((props: InnerStyledProps) => ({}));

const ThemedComponent = (props: StyledProps) => (
	<MoaStyledComponent>
		<StyledComponent {...props} />
	</MoaStyledComponent>
);
export default ThemedComponent;