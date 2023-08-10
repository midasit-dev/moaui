import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Color from '../Color';

export type MoaSeperatorProps = {

}

const MoaSeperator= styled((props:MoaSeperatorProps) => (
	<Divider sx={{
		paddingTop:"0.125rem", paddingBottom:"0.125rem"		
	}}/>
))(({theme}) => ({
	display:"flex", 
	alignSelf:"stretch",
	alignItems:"flex-start",
	flexDirection:"column"
}))

export default MoaSeperator;