import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Color from '../Color/index';

type Position = "left" | "label" | "right";

export type MoaTextFieldProps = {
	title?:string,
	titlePosition?:Position,
	defaultValue:string
}

const MoaTextField = styled((props:MoaTextFieldProps) => (
	<TextField defaultValue={props.defaultValue}
		sx={{
			'& .MuiOutlinedInput-root': {
				'& fieldset':{
					border: `1px solid ${Color.component.gray}`,
				},
				'&:hover fieldset': {
					border: `1px solid ${Color.component.gray_02}`,
				},
				'&.Mui-focused fieldset':{
					border: `1px solid ${Color.component.gray_dark}`,
				}
			},
			'& .MuiInputBase-input':{
				padding:0
			},
			borderRadius: "0.25rem",
			background: Color.primary.white
		}}
		InputProps={{ // input component의 스타일 변경
			sx:{
				width:"8.125rem",
				height:"1.75rem",
				padding: "0.375rem 0.375rem 0.375rem 0.625rem",
				alignItems: "center",
				flexShrink: 0,
				//text
				color: Color.text.secondary,
				fontFeatureSettings: "'clig' off, 'liga' off",
				fontFamily: "Pretendard",
				fontSize: "0.75rem",
				fontStyle: "normal",
				fontWeight: 400,
				lineHeight: "0.875rem",
			}
		}} 
	/>
))(({theme}) => ({
	display:"flex",
	fullWidth: true,
}))

export default MoaTextField;