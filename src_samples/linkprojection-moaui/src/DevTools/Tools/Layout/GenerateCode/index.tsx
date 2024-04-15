import { useCallback, useState } from "react";
import { GuideBox, TextField, Tooltip, Typography } from "@midasit-dev/moaui";
import GenerateButton from "./GenerateButton";
import { getCurrentTime } from "../../Shared/GetCurrentTime";

const wrappedGuideBoxStyle = {
	show: true,
	fill: '#fff',
	border: '1px solid #d1d1d1',
	borderRadius: 1,
	row: true,
	verCenter: true,
	paddingY: 1,
	paddingX: 2,
	spacing: 2,
}

const GenerateCode = () => {
	const [fileName, setFileName] = useState<string>('');
	const onChangeHandler = useCallback((e: any) => setFileName(e.target.value), []);

	return (
		<GuideBox {...wrappedGuideBoxStyle}>
			<Typography variant="h1">CODE</Typography>
			<GuideBox row verCenter spacing={1}>
				<TextField
					width='200px'
					placeholder={getCurrentTime().sample('tsx')}
					value={fileName}
					onChange={onChangeHandler}
				/>
				<Tooltip title='Generate Code'>
					<GenerateButton fileName={fileName} />
				</Tooltip>
			</GuideBox>
		</GuideBox>
	)
}

export default GenerateCode;