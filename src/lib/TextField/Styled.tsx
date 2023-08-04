import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Color from '../Color/index';

type Props = {
	value:string
}

const MoaTextField = styled((props:Props) => (
	<TextField defaultValue={props.value}
		sx={{
			'& .MuiOutlinedInput-root': {
				'& fieldset':{
					border: `1px solid ${Color.component.gray}`,
				},
				'&:hover fieldset': {
					border: `1px solid ${Color.component.gray_02}`,
				},
				'&.Mui-focused fieldset':{
					border: '1px solid #8F8F8F'
				}
			},
			'& .MuiInputBase-input':{
				padding:0
			},
			borderRadius: "0.25rem",
		}}
		InputProps={{
			sx:{
				width:"8.125rem",
				height:"1.75rem",
				padding: "0.375rem 0.375rem 0.375rem 0.625rem",
				alignItems: "center",
				flexShrink: 0,
				//text
				color: "#4B5563",
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
	inputProps:{
		background: "#FFFFFF",
		padding:0
	},

}))

export default MoaTextField;