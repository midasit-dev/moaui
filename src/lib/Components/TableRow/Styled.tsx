import { styled } from '@mui/material/styles';
import MoaStyledComponent from "../../Style/MoaStyled";
import TableRow from '@mui/material/TableRow';

export type StyledProps = {
	/**
	 * Should be valid <tr> children such as `TableCell`.
	 */
	children?: React.ReactNode,

	/**
	 * If `true`, the table row will shade on hover.
	 * @defaultValue false
	 */
	hover?: boolean,

	/**
	 * If `true`, the table row will have the selected shading.
	 * @defaultValue false
	 */
	selected?: boolean,

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
		<TableRow {...rest} />
	)
})((props: InnerStyledProps) => ({}));

const ThemedComponent = (props: StyledProps) => (
	<MoaStyledComponent>
		<StyledComponent {...props} />
	</MoaStyledComponent>
);
export default ThemedComponent;