import React, { useState } from 'react';
import { Rnd } from 'react-rnd';
import '../VirtualLayer.css';
import { useRecoilState } from 'recoil';
import { defaultControllerState, ControllerState } from '../recoilState';

export const useController = () => {
	const [controllerState, setControllerState] = useRecoilState(ControllerState);

	const initialize = React.useCallback((inputs = defaultControllerState) => {
		setControllerState(inputs);
	}, [setControllerState]);

	const [showVirtualLayer, setShowVirtualLayer] = useState(true);

	const handleChangeX = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setControllerState((prev) => ({ ...prev, x: Number(e.target.value) }));
	}, [setControllerState]);

	const handleChangeY = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setControllerState((prev) => ({ ...prev, y: Number(e.target.value) }));
	}, [setControllerState]);

	const handleChangeWidth = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setControllerState((prev) => ({ ...prev, width: Number(e.target.value) }));
	}, [setControllerState]);

	const handleChangeHeight = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setControllerState((prev) => ({ ...prev, height: Number(e.target.value) }));
	}, [setControllerState]);

	const handleChangeSpacing = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setControllerState((prev) => ({ ...prev, spacing: Number(e.target.value) }));
	}, [setControllerState]);

	const getCurrentControllerInputs = React.useCallback(() => {
		return controllerState;
	}, [controllerState]);

	const VirtualLayer = React.useCallback(() => {
		if (!showVirtualLayer) return null;
		return (
			<Rnd
				className='virtual-layer'
				default={{
					x: controllerState.x,
					y: controllerState.y,
					width: controllerState.width,
					height: controllerState.height,
				}}
				bounds="parent"
				enableResizing={false}
				disableDragging={true}
			/>
		);
	}, [controllerState.height, controllerState.width, controllerState.x, controllerState.y, showVirtualLayer]);

	return {
		initialize,
		controllerState,
		handleChangeX,
		handleChangeY,
		handleChangeWidth,
		handleChangeHeight,
		handleChangeSpacing,
		getCurrentControllerInputs,
		showVirtualLayer, setShowVirtualLayer,
		VirtualLayer,
	};
};
