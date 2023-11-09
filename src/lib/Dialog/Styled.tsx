import { styled } from '@mui/material/styles';
import MoaStyledComponent from "./../MoaStyled";
import Dialog, {DialogProps} from "@mui/material/Dialog";

export interface StyledProps extends DialogProps {
	/**
	 * `Not Used` The sx prop lets you style elements quickly using values from your theme.
	 * @defaultValue undefined
	 */
	sx?: never;

	/**
	 * If the value is `true`, the background of backdrop is blurred.
	 * @defaultValue false
	 * @optional
	 * @type boolean
	 */
	disableBackdropBlur?: boolean;
};

type InnerStyledProps = {
	theme: any;
};

const StyledComponent = styled((props: StyledProps) : React.ReactElement => {
	const {sx, disableBackdropBlur, ...rest} = props;
	return (
		<Dialog {...rest} sx={{
			backdropFilter: disableBackdropBlur ? "none" : "blur(5px)",
		}} />
	)
})((props: InnerStyledProps) => ({}));

const ThemedComponent = (props: StyledProps) => (
	<MoaStyledComponent>
		<StyledComponent {...props} />
	</MoaStyledComponent>
);
export default ThemedComponent;