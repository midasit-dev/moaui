import React from 'react';
import {
	Button,
	TextFieldV2,
	GuideBox,
} from '@midasit-dev/moaui';
import { useRecoilState } from 'recoil';
import { CanvasState } from '../recoilState';

const App = () => {
	const [canvasState, setCanvasState] = useRecoilState(CanvasState);

	const [_canvasWidth, _setCanvasWidth] = React.useState<number>(canvasState.width);
	const [_canvasHeight, _setCanvasHeight] = React.useState<number>(canvasState.height);

	return (
		<GuideBox width='100%' spacing={2}>
			<GuideBox width='100%' spacing={1} horRight>
				<TextFieldV2
					title="width"
					onChange={(e: any) => _setCanvasWidth(Number(e.target.value))}
					numberOptions={{ onlyInteger: true, min: 0, step: 16 }}
					type="number"
					value={_canvasWidth.toString()}
				/>
				<TextFieldV2
					title="height"
					onChange={(e: any) => _setCanvasHeight(Number(e.target.value))}
					numberOptions={{ onlyInteger: true, min: 0, step: 16 }}
					type="number"
					value={_canvasHeight.toString()}
				/>
			</GuideBox>
			<GuideBox width="100%" horRight>
				<Button onClick={() => {
					setCanvasState({
						width: _canvasWidth,
						height: _canvasHeight,
					});
				}}>
					Apply
				</Button>
			</GuideBox>
		</GuideBox>
	)
}

export default App;