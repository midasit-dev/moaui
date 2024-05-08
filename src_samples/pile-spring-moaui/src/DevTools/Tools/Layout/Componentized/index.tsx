import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import {
	CanvasState,
	ComponentizedRenderingBoxesState,
	LayersState
} from '../recoilState';
import {
	FloatingBox,
	GuideBox,
	Panel,
	Typography,
} from '@midasit-dev/moaui';
import { Layer } from '../../../types';
import { Rnd } from 'react-rnd';

const Options = (props: {
	selectedLayerId: string | null;
}) => {
	const {
		selectedLayerId,
	} = props;

	return (
		<Rnd
			default={{
				x: -300,
				y: 0,
				width: 300,
				height: 0,
			}}
		>
			<Panel width={300} variant="shadow2" padding={2} border='1px solid #d1d1d1' backgroundColor='#fff'>
				<GuideBox spacing={2}>
					<GuideBox width="100%" row horSpaceBetween verCenter>
						<Typography variant='h1'>FloatingBox Options</Typography>
					</GuideBox>
					<GuideBox>
						<Typography variant='body1'>{`Selected Layer Id: ${selectedLayerId}`}</Typography>
					</GuideBox>
				</GuideBox>
			</Panel>
		</Rnd>
	)
}

const ToFloatingBox = (props: {
	layer: Layer;
	setSelectedLayerId: (id: string | null) => void;
}) => {
	const {
		layer,
		setSelectedLayerId,
	} = props;

	const [fill, setFill] = useState('1');
	const [opacity, setOpacity] = useState(1);

	const innnerProps = {
		key: layer.props.id,
		...layer.props,
		show: true,
		fill: fill,
		opacity: opacity,
		cursor: 'pointer',
		transition: 'opacity 0.4s ease',
		onMouseOver: () => setOpacity(0.7),
		onMouseLeave: () => setOpacity(1),
		onMouseDown: () => setFill('3'),
		onMouseUp: () => setFill('1'),
		onClick: () => setSelectedLayerId(layer.props.id),
	};

	return <FloatingBox {...innnerProps} />;
}

const ToComponent = (props: {
	layer: Layer;
	setSelectedLayerId: (id: string | null) => void;
}) => {
	const {
		layer,
		setSelectedLayerId,
	} = props;

	switch (layer.type) {
		case 'FloatingBox': return <ToFloatingBox layer={layer} setSelectedLayerId={setSelectedLayerId} />;
		default: {
			console.error('Unknown Layer Type:', layer.type);
			return null;
		}
	}
}

const App = () => {
	const [canvas,] = useRecoilState(CanvasState);
	const [layers, setLayers] = useRecoilState(LayersState);
	const [box, setBoxes] = useRecoilState(ComponentizedRenderingBoxesState);

	const canvasStyle = { relative: true, width: canvas.width, height: canvas.height, };

	const [selectedLayerId, setSelectedLayerId] = useState<string | null>(null);

	return (
		<GuideBox row width="100%">

			<GuideBox width="100%">
				<Panel variant='shadow2' {...canvasStyle}>
					{layers.map((layer: Layer) => {
						return <ToComponent layer={layer} setSelectedLayerId={setSelectedLayerId} />;
					})}
				</Panel>
			</GuideBox>

			<GuideBox>
				<div style={{ position: 'relative', width: 'auto', height: 'auto' }}>
					<Options selectedLayerId={selectedLayerId} />
				</div>
			</GuideBox>

		</GuideBox>
	)
}

export default App;