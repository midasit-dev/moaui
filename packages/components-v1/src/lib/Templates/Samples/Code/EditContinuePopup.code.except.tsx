import { useState } from 'react';
import {
	Separator,
	Tooltip,
	Icon,
	Button,
	GuideBox,
	FloatingBox,
	Panel,
	Typography,
	TextField,
} from '@midasit-dev/moaui-components-v1';

// Main Component
const TemplatesSamplesEditContinuePopup = () => {
	// popup initial opend state. if it's true, open popups.
	const [openRight, setOpenRight] = useState(true);
	const [openBottom, setOpenBottom] = useState(true);

	return (
		<GuideBox {...canvasProps}>
			<Panel {...mainPanelProps}>
				<GuideBox {...mainGuideBoxProps}>
					<InputComponent />
					<InputComponent />
					<InputComponent />
					<ButtonComponent value='Apply' />

					<GuideBox {...mainPopupGuideBoxProps}>
						<Typography>Popup Toggle</Typography>
						<GuideBox row spacing={1}>
							<PopupButtonComponent direction="Right" open={openRight} setOpen={setOpenRight} />
							<Separator direction='vertical' />
							<PopupButtonComponent direction="Down" open={openBottom} setOpen={setOpenBottom} />
						</GuideBox>
					</GuideBox>
				</GuideBox>

				{openRight && <PopupComponent {...popupRightProps} closeHandler={() => setOpenRight(false)} />}
				{openBottom && <PopupComponent {...popupBottomProps} closeHandler={() => setOpenBottom(false)} />}
			</Panel>
		</GuideBox>
	)
}

export default TemplatesSamplesEditContinuePopup;

// Sub Components & Properties
const canvasProps = {
	show: true,
	border: '1px solid #d1d1d1',
	borderRadius: 1,
	fill: '#f5f5f7',
	spacing: 2,
	padding: 2,
}

const mainPanelProps = {
	width: 600,
	height: 500,
	padding: 2,
	relative: true,
}

const mainGuideBoxProps = {
	width: 300,
	spacing: 2,
}

const mainPopupGuideBoxProps = {
	show: false,
	fill: '1',
	row: true,
	border: '1px solid #e1e1e1',
	borderRadius: 1,
	padding: 1,
	spacing: 2,
}

const innerCompProps = {
	width: '100%',
	row: true,
	verCenter: true,
	spacing: 2,
}
const InputComponent = () => {
	return (
		<GuideBox {...innerCompProps} horSpaceBetween>
			<Typography variant="h1">title</Typography>
			<TextField placeholder="value" />
		</GuideBox>
	)
}
const ButtonComponent = (props: { value: string}) => {
	return (
		<GuideBox {...innerCompProps} horRight>
			<Button color='negative'>{props.value}</Button>
		</GuideBox>
	)
}

// Popup Component
const PopupButtonComponent = (props: any) => {
	return (
		<Tooltip title={`${props.direction} Popup Toggle`} placement='top'>
			<Icon iconName={`KeyboardDoubleArrow${props.direction}`} toButton onClick={() => props.setOpen(!props.open)} />
		</Tooltip>
	)
}

const popupRightProps = {
	show: true,
	fill: '1',
	x: 350,
	y: 0,
	width: 250,
	height: 500,
}
const popupBottomProps = {
	show: true,
	fill: '2',
	x: 0,
	y: 250,
	width: 600,
	height: 250,
}
const PopupComponent = (props: any) => {
	const { closeHandler, ...otherProps } = props;
	return (
		<FloatingBox {...otherProps}>
			<GuideBox width="100%" spacing={2} padding={2}>

				{/** Popup Title */}
				<GuideBox width="100%" row verCenter horSpaceBetween>
					<Typography variant='h1'>Popup Title</Typography>
					<Icon iconName='Close' toButton onClick={closeHandler}/>
				</GuideBox>
				
				{/** Popup Content */}
				<Typography variant='body1'>Content1</Typography>
				<Typography variant='body1'>Content2</Typography>
				<Typography variant='body1'>Content3</Typography>
				
			</GuideBox>
		</FloatingBox>
	)
}