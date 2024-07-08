import React from 'react';
import { useRecoilValue } from "recoil";
import { LayerRenderingBoxesState, LayersState } from "../recoilState";
import {
	GuideBox,
	Dialog,
	Typography,
	IconButton,
	Icon,
	Tooltip,
} from "@midasit-dev/moaui";

const App = () => {
	const [openLayerJson, setOpenLayerJson] = React.useState<boolean>(false);

	const boxes = useRecoilValue(LayerRenderingBoxesState);
	const layers = useRecoilValue(LayersState);

	return (
		<GuideBox row horSpaceBetween verCenter spacing={2}>
			<Typography>{`${layers.length}`}</Typography>
			<Tooltip title='View Layer Json'>
				<IconButton color='negative' onClick={() => { setOpenLayerJson(true) }}>
					<Icon iconName='ViewDay' />
				</IconButton>
			</Tooltip>

			<Dialog
				open={openLayerJson}
				setOpen={setOpenLayerJson}
				onClose={() => setOpenLayerJson(false)}
				headerTitle='layer json'
			>
				<GuideBox row spacing={2}>
					<pre style={{ fontSize: '12px' }}>{JSON.stringify(boxes, null, 2)}</pre>
					<pre style={{ fontSize: '12px' }}>{JSON.stringify(layers, null, 2)}</pre>
				</GuideBox>
			</Dialog>
		</GuideBox>
	);
}

export default App;