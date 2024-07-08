import {
	IconButton,
	Icon,
	Tooltip,
	TextFieldV2,
	GuideBox
} from '@midasit-dev/moaui';
import { useController } from './useController';
import { useBoxes } from './useBoxes';

const App = () => {
	const {
		initialize: initializeInputs,
		controllerState,
		handleChangeSpacing,
		getCurrentControllerInputs,
	} = useController();

	const {
		handleClickPrevDelete,
		handleClickDelAllBoxes,
		handleClickAddBox,
	} = useBoxes({initializeInputs});

	return (
		<GuideBox show fill='#f5f5f7' width="100%" borderRadius={1} padding={1} border='1px solid #ddd' spacing={1}>
			<GuideBox width='100%' row horSpaceBetween verCenter>
				<GuideBox>
					<GuideBox row>
						<div style={{ opacity: 0 }}>
							<IconButton transparent disabled>
								<Icon iconName="ExpandMore" />
							</IconButton>
						</div>
						<Tooltip title="add top Ctrl + Up">
							<IconButton transparent onClick={() => handleClickAddBox('top', getCurrentControllerInputs())} color="negative">
								<Icon iconName="ExpandLess" />
							</IconButton>
						</Tooltip>
						<div style={{ opacity: 0 }}>
							<IconButton transparent disabled>
								<Icon iconName="ExpandMore" />
							</IconButton>
						</div>
					</GuideBox>
					<GuideBox row>
						<Tooltip title="add left Ctrl + Left">
							<IconButton transparent onClick={() => handleClickAddBox('left', getCurrentControllerInputs())} color="negative">
								<Icon iconName="NavigateBefore" />
							</IconButton>
						</Tooltip>
						<Tooltip title="add bottom Ctrl + Bottom">
							<IconButton transparent onClick={() => handleClickAddBox('bottom', getCurrentControllerInputs())} color="negative">
								<Icon iconName="ExpandMore" />
							</IconButton>
						</Tooltip>
						<Tooltip title="add right Ctrl + Right">
							<IconButton transparent onClick={() => handleClickAddBox('right', getCurrentControllerInputs())} color="negative">
								<Icon iconName="NavigateNext" />
							</IconButton>
						</Tooltip>
					</GuideBox>
				</GuideBox>
				<GuideBox row>
					<Tooltip title="add Ctrl + Enter">
						<IconButton transparent onClick={() => handleClickAddBox('default', getCurrentControllerInputs())} color='negative'>
							<Icon iconName='Add' />
						</IconButton>
					</Tooltip>
					<Tooltip title="del Ctrl + Backspace">
						<IconButton transparent onClick={handleClickPrevDelete}>
							<Icon iconName="Clear" />
						</IconButton>
					</Tooltip>
					<Tooltip title="del all Ctrl + Delete">
						<IconButton transparent onClick={handleClickDelAllBoxes}>
							<Icon iconName="ClearAll" />
						</IconButton>
					</Tooltip>
				</GuideBox>
			</GuideBox>
			<GuideBox show width="100%" fill='#e8e8e8' padding={1} border='1px solid #ddd'>
				<TextFieldV2 title="spacing" onChange={handleChangeSpacing} numberOptions={{ onlyInteger: true, min: 0 }} type="number" value={controllerState.spacing.toString()} />
			</GuideBox>
		</GuideBox>
	)
}

export default App;