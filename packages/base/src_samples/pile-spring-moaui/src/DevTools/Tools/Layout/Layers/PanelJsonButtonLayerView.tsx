import React from 'react';
import { useRecoilValue } from "recoil";
import { LayerRenderingBoxesState, LayersState } from "../recoilState";
import {
	GuideBox,
	Dialog,
	Typography,
	IconButton,
	Icon,
} from "@midasit-dev/moaui";

const App = () => {
	const [openLayerJson, setOpenLayerJson] = React.useState<boolean>(false);

	const boxes = useRecoilValue(LayerRenderingBoxesState);
	const layers = useRecoilValue(LayersState);

	return (
		<GuideBox width="100%" row horSpaceBetween verCenter>
			<Typography>{`Layer Count: ${layers.length}`}</Typography>
			<IconButton transparent onClick={() => { setOpenLayerJson(true) }}>
				<Icon iconName='Face5' />
			</IconButton>
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