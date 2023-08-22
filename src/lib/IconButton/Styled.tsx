import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Color from '../Color';

const MoaIconButton = styled(IconButton)(({theme}) => ({
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

export default MoaIconButton;