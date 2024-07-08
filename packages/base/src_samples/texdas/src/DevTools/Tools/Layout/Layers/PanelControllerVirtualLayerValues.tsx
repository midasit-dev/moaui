import {
	GuideBox,
	IconButton,
	Icon,
	TextFieldV2,
	Tooltip,
} from '@midasit-dev/moaui';
import { useController } from './useController';

const App = () => {
  const {
    initialize: initializeInputs,
		controllerState,
    handleChangeX,
    handleChangeY,
    handleChangeWidth,
    handleChangeHeight,
  } = useController();

	return (
		<GuideBox width="100%">
			<GuideBox width='100%' spacing={1}>
				<TextFieldV2
					title="x"
					onChange={handleChangeX}
					numberOptions={{ onlyInteger: true, min: 0 }}
					type="number"
					value={controllerState.x.toString()}
				/>
				<TextFieldV2
					title="y"
					onChange={handleChangeY}
					numberOptions={{ onlyInteger: true, min: 0 }}
					type="number"
					value={controllerState.y.toString()}
				/>
				<TextFieldV2
					title="width"
					onChange={handleChangeWidth}
					numberOptions={{ onlyInteger: true, min: 0 }}
					type="number"
					value={controllerState.width.toString()}
				/>
				<TextFieldV2
					title="height"
					onChange={handleChangeHeight}
					numberOptions={{ onlyInteger: true, min: 0 }}
					type="number"
					value={controllerState.height.toString()}
				/>
				<GuideBox width="100%" horRight borderRadius={1}>
					<Tooltip title="refresh Ctrl + i">
						<IconButton color='negative' onClick={() => initializeInputs()}>
							<Icon iconName='Refresh' />
						</IconButton>
					</Tooltip>
				</GuideBox>
			</GuideBox>
		</GuideBox>
	)
}

export default App;