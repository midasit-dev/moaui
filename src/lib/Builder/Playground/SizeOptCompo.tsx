import React from 'react';
import { DropList } from '../../index';
import { SelectChangeEvent } from '@mui/material/Select';
import { TemplateWidth, TemplateHeight } from './recoil/PlaygroundAtom';
import { useRecoilState } from 'recoil';
import Box from '@mui/material/Box';
import { Typography, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
const Size = ["400", "600", "800"];

export default function SizeOptCompo(): React.ReactElement {
	const [width, setWidth] = useRecoilState(TemplateWidth);
	const [height, setHeight] = useRecoilState(TemplateHeight);

	function onChangeWidthHandler(event:SelectChangeEvent){
		setWidth(event.target.value);
	}

	function onChangeHeightHandler(event:SelectChangeEvent){
		setHeight(event.target.value);
	}

	React.useEffect(() => {
		setWidth(Size[1]);
		setHeight(Size[2]);
	}, []);

	return (
		<Box sx={{width:"100%", height:"100%"}} display={"flex"} justifyContent={"center"} alignItems={"center"}>
			<Stack>
			<Typography variant="h5" sx={{mb:"1rem"}}>Select Plugin Template Size</Typography>
			<Box>
				<Stack direction={"row"}>
				<Stack>
					<Typography>Width</Typography>
					<DropList
						itemList={() => {
							let map = new Map<string, string | number>();
							Size.forEach((value) => { map.set(value.toString(), value); });
							return map;
						}}
						value={width} 
						width={"100px"} 
						onChange={onChangeWidthHandler} 
						defaultValue=""
					/>
				</Stack>
				<Typography sx={{mt:"1.6rem"}}>&nbsp;&nbsp;<CloseIcon/>&nbsp;&nbsp;</Typography>
				<Stack>
					<Typography>Height</Typography>
					<DropList
						itemList={() => {
							let map = new Map<string, string | number>();
							Size.forEach((value) => { map.set(value.toString(), value); });
							return map;
						}}
						value={height} 
						width={"100px"} 
						onChange={onChangeHeightHandler} 
						defaultValue=""
					/>
				</Stack>
				</Stack>
			</Box>
			</Stack>
		</Box>
	)
}