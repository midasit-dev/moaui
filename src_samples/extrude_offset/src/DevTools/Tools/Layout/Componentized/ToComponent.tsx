import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import {
	SelectedLayerIdState
} from '../recoilState';
import {
	Button,
	FloatingBox,
	type FloatingBoxProps,
	Panel,
	DropList,
	TextField,
	TextFieldV2,
} from '@midasit-dev/moaui';
import { type Layer } from '../../../types';
import '../SelectedLayer.css';

const ToFloatingBox = (props: { layer: Layer; }) => {
	const { layer, } = props;

	const [fill, setFill] = useState('1');
	const [opacity, setOpacity] = useState(1);
	const [border, setBorder] = useState('none');

	const [selectedLayerId, setSelectedLayerId] = useRecoilState(SelectedLayerIdState);

	useEffect(() => {
		layer.id === selectedLayerId ? setFill('rgba(75, 154, 244, .7)') : setFill('1');
	}, [layer.id, selectedLayerId]);

	const innnerProps: FloatingBoxProps = {
		key: layer.id,
		...layer.props,
		show: true,
		fill: fill,
		opacity: opacity,
		cursor: 'pointer',
		transition: 'opacity 0.4s ease',
		border: border,
		onMouseOver: () => {
			setOpacity(0.7);
			setBorder('1px solid #b3b3b7');
		},
		onMouseLeave: () => {
			setOpacity(1);
			setBorder('none');
		},
		onMouseDown: () => layer.id === selectedLayerId ? setFill('rgba(75, 154, 244, 1)') : setFill('2'),
		onMouseUp: () => layer.id === selectedLayerId ? setFill('rgba(75, 154, 244, .7)') : setFill('1'),
		onClick: () => {
			if (layer.id !== selectedLayerId) {
				//처음으로 누른 경우 (선택)
				setSelectedLayerId(layer.id);
			} else {
				//이미 눌린 상태인데 한번 더 누른 경우 (해제)
				// setSelectedLayerId(null);
			}
		},
	};

	return (
		<FloatingBox {...innnerProps}>
			{layer.children && layer.children.map((child: Layer, index: number) => {
				return <ToComponent key={index} layer={child} />;
			})}
		</FloatingBox>
	);
}

const ToButton = (props: { layer: Layer; }) => {
	const { layer, } = props;
	return <Button {...JSON.parse(JSON.stringify(layer.props))} />;
}

const ToPanel = (props: { layer: Layer; }) => {
	const { layer, } = props;
	return (
		<Panel {...JSON.parse(JSON.stringify(layer.props))}>
			{/** children은 일단 skip */}
			{/* {layer.children && layer.children.map((child: Layer, index: number) => {
				return <ToComponent key={index} layer={child} />;
			})} */}
		</Panel>
	);
}

const ToDropList = (props: { layer: Layer; }) => {
	const { layer, } = props;
	return <DropList {...JSON.parse(JSON.stringify(layer.props))} />;
}

const ToTextField = (props: { layer: Layer; }) => {
	const { layer, } = props;
	return <TextField {...JSON.parse(JSON.stringify(layer.props))} />;
}

const ToTextFieldV2 = (props: { layer: Layer; }) => {
	const { layer, } = props;
	return <TextFieldV2 {...JSON.parse(JSON.stringify(layer.props))} />;
}

const ToComponent = (props: { layer: Layer; }) => {
	const { layer, } = props;

	switch (layer.type) {
		case 'FloatingBox': return <ToFloatingBox layer={layer} />;
		case 'Button': return <ToButton layer={layer} />;
		case 'Panel': return <ToPanel layer={layer} />;
		case 'DropList' : return <ToDropList layer={layer} />;
		case 'TextField': return <ToTextField layer={layer} />;
		case 'TextFieldV2': return <ToTextFieldV2 layer={layer} />;
		default: {
			console.error('Unknown Layer Type:', layer.type);
			return null;
		}
	}
}

export default ToComponent;