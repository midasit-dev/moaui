import { styled } from '@mui/material/styles';
import MoaStyledComponent from "../MoaStyled";
import IconButton, { type IconButtonProps} from '@mui/material/IconButton';
import Color from '../Color';

interface StyledProps extends IconButtonProps {

}

const StyledComponent = styled(IconButton)(({theme}) => ({
	display: "inline-flex",
	height: "1.75rem",
	padding: "0.625rem",
	justifyContent: "center",
	alignItems: "center",
	gap: "0.25rem",
	flexShrink: 0,
	borderRadius: "0.25rem",
	border: "1px solid #C4C6C8",
	background: Color.primary.main,
	"&:hover": {
		background: Color.primary.hover,
		color: Color.primary.white
	},
	":focus":{
		background: Color.primary.focus,
		color: Color.primary.white
	},
	//text
	color: Color.text.primary,
	textAlign: "center",
	fontFeatureSettings: "'clig' off, 'liga' off",
	fontFamily: "Pretendard",
	fontSize: "0.75rem",
	fontStyle: "normal",
	fontWeight: 500,
	lineHeight: "0.875rem",
	textTransform: "none",
}))

const ThemedComponent = (props: StyledProps) => (
	<MoaStyledComponent>
		<StyledComponent {...props} />
	</MoaStyledComponent>
);
export default ThemedComponent;