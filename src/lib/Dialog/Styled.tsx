import { styled } from '@mui/material/styles';
import MoaStyledComponent from "./../MoaStyled";
import Dialog, {DialogProps} from "@mui/material/Dialog";

export interface StyledProps extends DialogProps {
	/**
	 * `Not Used` The sx prop lets you style elements quickly using values from your theme.
	 * @defaultValue undefined
	 */
	sx?: never;
};

type InnerStyledProps = {
	theme: any;
};

const StyledComponent = styled((props: StyledProps) : React.ReactElement => {
	const {sx, ...rest} = props;
	return (
		<Dialog {...rest} />
	)
})((props: InnerStyledProps) => ({}));

const ThemedComponent = (props: StyledProps) => (
	<MoaStyledComponent>
		<StyledComponent {...props} />
	</MoaStyledComponent>
);
export default ThemedComponent;