import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Color from "../Color";

const MoaButton = styled(Button)(({theme}) => ({
	display: "inline-flex",
	height: "1.75rem",
	padding: "0.625rem 1.25rem",
	justifyContent: "center",
	alignItems: "center",
	gap: "0.25rem",
	flexShrink: 0,
	borderRadius: "0.25rem",
	border: `1px solid ${Color.component.gray}`,
	background: Color.component.gray_light,
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
	lineHeight: "0.875rem"
}))

export default MoaButton;