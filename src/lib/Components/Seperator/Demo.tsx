import Seperator from '.';
import Typography from '../Typography/index';
import Box from '@mui/material/Box';

function Demo() {
	return (
		<Box display={"flex"} flexDirection={"column"} width={"100%"} alignItems={"flex-start"}>
			<Typography variant='h1' color='primary'>h1 테스트!</Typography>
				<Seperator direction='horizontal' />
			<Typography variant='body3' color='disable'>body3</Typography>
		</Box>
	);
}

export default Demo;