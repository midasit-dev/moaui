import { styled } from '@mui/material/styles';
import MoaStyledComponent from "../MoaStyled";
import DialogActions, {DialogActionsProps} from "@mui/material/DialogActions";

export interface StyledProps extends DialogActionsProps {
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
		<DialogActions {...rest} />
	)
})((props: InnerStyledProps) => ({}));

const ThemedComponent = (props: StyledProps) => (
	<MoaStyledComponent>
		<StyledComponent {...props} />
	</MoaStyledComponent>
);
export default ThemedComponent;