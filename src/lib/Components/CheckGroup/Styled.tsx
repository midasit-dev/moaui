import { styled } from '@mui/material/styles';
import MoaStyledComponent from "../../Style/MoaStyled";
import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import MoaTypography from '../Typography';

export type StyledProps = {
	children?: React.ReactElement[],
	/**
	 * Value of the header text. If leave empty this field, header field will not show.
	 */
	text?: string,

	/**
	 * `Not Used` The sx prop lets you style elements quickly using values from your theme.
	 * @defaultValue undefined
	 */
	sx?: never,
};

const StyledComponent = styled((props: StyledProps) => {
	const { text, sx, ...rest } = props;
	
	return (
		<FormControl>
			{text && <div style={{padding: '0.25rem'}}><MoaTypography>{text}</MoaTypography></div>}
			<FormGroup {...rest} style={{paddingLeft: text ? '0.5rem' : '0rem'}} />
		</FormControl>
	)

})(({theme}) => ({}));

const ThemedComponent = (props: StyledProps) => (
	<MoaStyledComponent>
		<StyledComponent {...props} />
	</MoaStyledComponent>
);
export default ThemedComponent;