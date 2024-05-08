import { ReactNode } from 'react';
import { ControllerInputs, type Layers } from '../../types';
import { atom } from 'recoil';
import { type Props as RndProps } from 'react-rnd';

export const LayersMenuState = atom<{
	canvas: RndProps;
	controller: RndProps;
	json: RndProps;
}>({
	key: 'LayersMenuState',
	default: {
		canvas: {
			default: { x: -300, y: 0, width: 300, height: 0, },
			enableResizing: false,
		},
		controller: {
			default: { x: -300, y: 172 + 16, width: 300, height: 0, },
			enableResizing: false,
		},
		json: {
			default: { x: -300, y: 172 + 16 + 394 + 16, width: 300, height: 0, },
			enableResizing: false,
		},
	}
});

export const CanvasState = atom({
	key: 'CanvasState',
	default: {
		width: 592,
		height: 512,
	}
});

export const defaultControllerState = {
	x: 0,
	y: 0,
	width: 160,
	height: 48,
	spacing: 0,
};

export const ControllerState = atom<ControllerInputs>({
	key: 'ControllerState',
	default: defaultControllerState,
});

export const LayerRenderingBoxesState = atom<{ id: string; element: ReactNode }[]>({
  key: 'LayerRenderingBoxesState',
	default: [],
});

export const LayersState = atom<Layers>({
	key: 'LayersState',
	default: [],
});

export const ComponentizedRenderingBoxesState = atom<{ id: string; element: ReactNode }[]>({
	key: 'ComponentizedRenderingBoxesState',
	default: [],
});