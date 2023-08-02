import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const MoaButton = styled(Button)(({theme}) => ({
	display: "inline-flex",
	height: "1.75rem",
	padding: "0.625rem 1.25rem",
	justifyContent: "center",
	alignItems: "center",
	gap: "0.25rem",
	flexShrink: 0,
	borderRadius: "0.25rem",
	border: "1px solid #C4C6C8",
	background: "#EEEEEE",
	"&:hover": {
		background: "#5F666B",
		color:"#FFFFFF"
	},
	":focus":{
		background: "#1E2429",
		color:"#FFFFFF"
	},
	//text
	color: "#1F2937",
	textAlign: "center",
	fontFeatureSettings: "'clig' off, 'liga' off",
	fontFamily: "Pretendard",
	fontSize: "0.75rem",
	fontStyle: "normal",
	fontWeight: 500,
	lineHeight: "0.875rem"
}))

export default MoaButton;