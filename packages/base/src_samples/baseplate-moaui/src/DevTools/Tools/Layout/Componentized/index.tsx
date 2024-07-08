import { useRecoilState } from 'recoil';
import {
	CanvasState,
	LayersState,
} from '../recoilState';
import {
	GuideBox,
	Panel,
	Separator,
} from '@midasit-dev/moaui';
import { Rnd } from 'react-rnd';
import { type Layer } from '../../../types';
import PanelSelectedLayerId from './PanelSelectedLayer';
import PanelOptionsAdd from './PanelOptionsAdd';
import PanelOptionsModifyDelete from './PanelOptionsModifyDelete';
import ToComponent from './ToComponent';
import '../SelectedLayer.css';

const App = () => {
	const [canvas,] = useRecoilState(CanvasState);
	const [layers,] = useRecoilState(LayersState);

	const canvasStyle = { relative: true, width: canvas.width, height: canvas.height, };

	return (
		<GuideBox row width="100%">

			<GuideBox width="100%" height='auto'>
				<Panel {...canvasStyle} variant='shadow2'>
					{layers.map((layer: Layer, index: number) => {
						return <ToComponent key={index} layer={layer} />;
					})}
				</Panel>
			</GuideBox>

			<GuideBox>
				<div style={{ position: 'relative', width: 'auto', height: 'auto' }}>
					<Rnd default={{ x: -400-16-350, y: 0, width: 350, height: 0, }}>
						<PanelSelectedLayerId />
					</Rnd>
					<Rnd default={{ x: -400, y: 0, width: 400, height: 0, }}>
						<Panel width={400} variant="shadow2" padding={2} border='1px solid #d1d1d1' backgroundColor='#fff'>
							<GuideBox width="100%" spacing={2}>
								<PanelOptionsAdd />
								<Separator />
								<PanelOptionsModifyDelete />
							</GuideBox>
						</Panel>
					</Rnd>
				</div>
			</GuideBox>

		</GuideBox>
	)
}

export default App;