import React from 'react';
import { DraggableResizableBox } from './DraggableResizableBox';
import { ControllerInputs } from '../../../types';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { LayerRenderingBoxesState, LayersState } from '../recoilState';
import { v4 as uuid4 } from 'uuid';

interface useBoxesProps {
	initializeInputs: any;
}

export const useBoxes = (props: useBoxesProps) => {
	const [boxes, setBoxes] = useRecoilState(LayerRenderingBoxesState);
	const setLayers = useSetRecoilState(LayersState);

	const {
		initializeInputs,
	} = props;

	const handleClickDelete = React.useCallback((id: string) => {
		setBoxes((prevBoxes) => prevBoxes.filter((box) => box.id !== id));
		setLayers((prevBoxSchemas) => prevBoxSchemas.filter((box) => box.id !== id));
	}, [setBoxes, setLayers]);

	const handleClickPrevDelete = React.useCallback(() => {
		let prevId = '';
		if (boxes.length > 0) {
			const temp = boxes.map((box) => box.id);
			prevId = temp.pop() || '';
			setBoxes((prevBoxes) => prevBoxes.filter((box) => box.id !== prevId));
		}
		handleClickDelete(prevId);
	}, [boxes, handleClickDelete, setBoxes]);

	const handleClickDelAllBoxes = React.useCallback(() => {
		setBoxes([]);
		setLayers([]);
		initializeInputs();
	}, [initializeInputs, setBoxes, setLayers]);

	const createNewBox = React.useCallback((id: string, inputs: ControllerInputs) => {
		return {
			id: id,
			element: (
				<DraggableResizableBox
					key={id}
					id={id}
					defaultX={inputs.x}
					defaultY={inputs.y}
					defaultWidth={inputs.width}
					defaultHeight={inputs.height}
					bounds=".wrapper-box"
					dragGrid={[8, 8]}
					resizeGrid={[8, 8]}
					spacing={0}
					onDelete={handleClickDelete}
					onSendStyleToController={initializeInputs}
				/>
			),
		};
	}, [handleClickDelete, initializeInputs]);

	const handleClickAddBox = React.useCallback((
		type: 'default' | 'left' | 'right' | 'top' | 'bottom' = 'default',
		inputs: ControllerInputs
	) => {
		//생성 시점 UUID 기록
		const addUUID = uuid4().slice(0, 8);
		const newId = `${boxes.length + 1}-FloatingBox-${addUUID}`; //id 생성

		let modifiedX = inputs.x;
		if (boxes.length > 0) {
			if (type === 'left') modifiedX -= (inputs.width + inputs.spacing);
			if (type === 'right') modifiedX += (inputs.width + inputs.spacing);
		}

		let modifiedY = inputs.y;
		if (boxes.length > 0) {
			if (type === 'top') modifiedY -= (inputs.height + inputs.spacing);
			if (type === 'bottom') modifiedY += (inputs.height + inputs.spacing);
		}

		const newInputs = {
			x: modifiedX,
			y: modifiedY,
			width: inputs.width,
			height: inputs.height,
			spacing: inputs.spacing,
		}

		//input 최신화
		initializeInputs(newInputs);

		//새로운 box 생성
		setBoxes(prevBoxes => {
			const newBox = createNewBox(newId, newInputs);
			return [...prevBoxes, newBox];
		});
		setLayers((prevBoxSchemas) => [
			...prevBoxSchemas,
			{
				id: newId,
				type: 'FloatingBox',
				props: {
					x: modifiedX,
					y: modifiedY,
					width: inputs.width,
					height: inputs.height,
				},
				children: [],
			},
		]);
	}, [boxes.length, createNewBox, initializeInputs, setBoxes, setLayers]);

	return {
		handleClickDelete,
		handleClickPrevDelete,
		handleClickDelAllBoxes,
		handleClickAddBox,
		createNewBox,
	};
};
