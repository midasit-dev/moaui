import { styled } from '@mui/material/styles';

import MoaStyledComponent from "../../Style/MoaStyled";
import { Typography } from '../../';

import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';

export type StyledProps = {
	children?: React.ReactElement[],
	/**
	 * Value of the header text. If leave empty this field, header field will not show.
	 */
	text?: string,
};

const StyledComponent = styled((props: StyledProps) => {
	const { text, ...rest } = props;
	
	return (
		<FormControl>
			{text && <div style={{padding: '0.25rem'}}><Typography>{text}</Typography></div>}
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