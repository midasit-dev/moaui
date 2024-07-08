import { useRecoilState, useRecoilValue } from 'recoil';
import {
	Color,
	GuideBox,
	type GuideBoxProps,
	Panel,
	Separator,
	Switch,
	TextFieldV2,
	Typography,
	CodeBlock,
	Button,
} from '@midasit-dev/moaui';
import { LayersState, OpacityBySelectedLayerIdState, SelectedLayerGuideBoxPropsState, SelectedLayerIdState, SelectedLayerState } from '../recoilState';
import { useCallback, useEffect, useState } from 'react';
import { Layer, Layers } from '../../../types';
import ShowHideButton from '../../Shared/ShowHideButton';

const TextFieldV2Component = (props: { 
	title: string; 
	propKey: 
		'spacing'
}) => {
	const { title, propKey } = props;
	const [guideBoxProps, setGuideBoxProps] = useRecoilState(SelectedLayerGuideBoxPropsState);
	const [value, setValue] = useState((guideBoxProps && guideBoxProps[propKey] ? guideBoxProps[propKey] : 0)?.toString());

	useEffect(() => {
		if (guideBoxProps && guideBoxProps[propKey] !== undefined) {
			const numberValue = guideBoxProps[propKey];
			if (numberValue !== undefined) {
				setValue(numberValue.toString());
			} else {
				setValue('0');
			}
		} else {
			setValue('0');
		}
	}, [guideBoxProps, propKey, title]);

	return (
		<GuideBox width="100%" row horSpaceBetween verCenter>
			<Typography variant='body1'>{title}</Typography>
			<TextFieldV2
				width={100}
				value={value}
				onChange={(e: any) => {
					setValue(e.target.value);
					setGuideBoxProps((prev: any) => {
						let result = { ...prev };
						if (e.target.value === '' || e.target.value === '0') {
							if (result[propKey]) delete result[propKey];
						} else {
							result = { ...result, [propKey]: Number(e.target.value) };
						}
						return result;
					});
				}}
				type='number'
				numberOptions={{ 
					min: 0, max: 10, step: 1, onlyInteger: true,
				}}
			/>
		</GuideBox>
	);
}

const ParentSizeInheritComponent = (props: {
	guideBoxPropsState: [GuideBoxProps | null, React.Dispatch<React.SetStateAction<GuideBoxProps | null>>];
}) => {
	const { guideBoxPropsState } = props;
	const [guideBoxProps, setGuideBoxProps] = guideBoxPropsState;
	const [value, setValue] = useState((guideBoxProps && guideBoxProps.width === 'inherit' && guideBoxProps.height === 'inherit') || false);

	useEffect(() => {
		if (guideBoxProps && guideBoxProps.width === 'inherit' && guideBoxProps.height === 'inherit') {
			setValue(true);
		} else {
			setValue(false);
		}
	}, [guideBoxProps]);

	return (
		<GuideBox width="100%" row horSpaceBetween verCenter>
			<Typography variant='body1'>parent size inherit</Typography>
			<Switch checked={value} onChange={() => {
				setValue(!value);
				setGuideBoxProps((prev: any) => {
					let result = { ...prev };
					if (!value) {
						result = { ...result, width: 'inherit', height: 'inherit', };
					} else {
						if (result.width) delete result.width;
						if (result.height) delete result.height;
					}
					return result;
				});
			}} />
		</GuideBox>
	);
}

const SwitchComponent = (props: { 
	guideBoxPropsState: [GuideBoxProps | null, React.Dispatch<React.SetStateAction<GuideBoxProps | null>>];
	title: string; 
	propKey: 
		'row' 
		| 'rowReverse' 
		| 'columnReverse'
		| 'center'
		| 'horLeft' 
		| 'horCenter'
		| 'horRight' 
		| 'horSpaceBetween'
		| 'verTop'
		| 'verCenter'
		| 'verBottom'
		| 'verSpaceBetween';
}) => {
	const { guideBoxPropsState, title, propKey } = props;
	const [guideBoxProps, setGuideBoxProps] = guideBoxPropsState;
	const [value, setValue] = useState(guideBoxProps && guideBoxProps[propKey] ? guideBoxProps[propKey] : false);

	useEffect(() => {
		if (guideBoxProps && guideBoxProps[propKey] !== undefined) {
			setValue(guideBoxProps[propKey]);
		} else {
			setValue(false);
		}
	}, [guideBoxProps, propKey, title]);

	return (
		<GuideBox width="100%" row horSpaceBetween verCenter>
			<Typography variant='body1'>{title}</Typography>
			<Switch checked={value} onChange={() => {
				setValue(!value);
				setGuideBoxProps((prev: any) => {
					let result = { ...prev };
					if (propKey) {
						if (!value) {
							result = { ...result, [propKey]: !value };
						} else {
							if (result[propKey]) delete result[propKey];
						}
					}
					return result;
				});
			}} />
		</GuideBox>
	);
}

const GuideBoxOptions = (props: {
	guideBoxProps: GuideBoxProps | null;
	setGuideBoxProps: React.Dispatch<React.SetStateAction<GuideBoxProps | null>>;
}) => {
	const { guideBoxProps, setGuideBoxProps } = props;
	const guideBoxPropsState: {
		guideBoxPropsState: [GuideBoxProps | null, React.Dispatch<React.SetStateAction<GuideBoxProps | null>>];
	} = { guideBoxPropsState: [guideBoxProps, setGuideBoxProps] };

	const [showDirection, setShowDirection] = useState(false);
	const [showPosition, setShowPosition] = useState(false);
	const [showJson, setShowJson] = useState(false);

	return (
		<GuideBox width="100%" spacing={1}>
			{/** GuideBoxProps을 Sampling해서 그대로 들고와야할까? */}
			<GuideBox width='100%' spacing={1}>
				<ParentSizeInheritComponent {...guideBoxPropsState} />
				<TextFieldV2Component title='spacing' propKey="spacing" />
			</GuideBox>

			<GuideBox width="100%" spacing={1}>
				<GuideBox width="100%" row horSpaceBetween verCenter>
					<Typography variant='h1'>Direction</Typography>
					<ShowHideButton state={[showDirection, setShowDirection]} />
				</GuideBox>
					{showDirection &&
						<GuideBox width="100%">
							<SwitchComponent {...guideBoxPropsState} title='row' propKey="row" />
							<SwitchComponent {...guideBoxPropsState} title='row reverse' propKey="rowReverse" />
							<SwitchComponent {...guideBoxPropsState} title='column reverse' propKey="columnReverse" />
						</GuideBox>
					}
			</GuideBox>

			<GuideBox width="100%" spacing={1}>
				<GuideBox width="100%" row horSpaceBetween verCenter>
					<Typography variant='h1'>Position</Typography>
					<ShowHideButton state={[showPosition, setShowPosition]} />
				</GuideBox>
				{showPosition &&
					<GuideBox width="100%">
						<SwitchComponent {...guideBoxPropsState} title='center'   				propKey="center" />
						<SwitchComponent {...guideBoxPropsState} title='horizontal left'  propKey="horLeft" />
						<SwitchComponent {...guideBoxPropsState} title='horizontal center'propKey="horCenter" />
						<SwitchComponent {...guideBoxPropsState} title='horizontal right' propKey="horRight" />
						<SwitchComponent {...guideBoxPropsState} title='horizontal space between' propKey="horSpaceBetween" />
						<SwitchComponent {...guideBoxPropsState} title='vertical top' propKey="verTop" />
						<SwitchComponent {...guideBoxPropsState} title='vertical center' propKey="verCenter" />
						<SwitchComponent {...guideBoxPropsState} title='vertical bottom' propKey="verBottom" />
						<SwitchComponent {...guideBoxPropsState} title='vertical space between' propKey="verSpaceBetween" />
					</GuideBox>	
				}
			</GuideBox>

			{guideBoxProps &&
				<GuideBox width="100%" spacing={1}>
					<GuideBox width="100%" row horSpaceBetween verCenter>
						<Typography variant='h1'>json</Typography>
						<ShowHideButton state={[showJson, setShowJson]} />
					</GuideBox>
					{showJson &&
						<CodeBlock language='json' title='properties' radius={4} children={JSON.stringify(guideBoxProps, null, 2)} />
					}
				</GuideBox>	
			}
		</GuideBox>
	);
}

/* Main Component */
const App = () => {
	const [selectedLayerId, setSelectedLayerId] = useRecoilState(SelectedLayerIdState);
	const selectedLayer = useRecoilValue(SelectedLayerState);
	const opacityBySelectedLayerId = useRecoilValue(OpacityBySelectedLayerIdState);
	
	const getSelectedLayerIdColor = useCallback((selectedLayerId: string | null) => {
		return selectedLayerId ? Color.secondary.main : undefined;
	}, []);

	// const [guideBoxProps, setGuideBoxProps] = useState<any>(null);
	const [guideBoxProps, setGuideBoxProps] = useRecoilState(SelectedLayerGuideBoxPropsState);
	//selected layer ID가 변경되면 guideBoxProps를 초기화
	useEffect(() => {
		if (selectedLayerId === null) setGuideBoxProps(null);
		setGuideBoxProps(selectedLayer ? selectedLayer.props.guideBoxProps : null);
		// eslint-disable-next-line
	}, [selectedLayerId]);

	//guideBoxProps이 변경되면, Layer에 실시간 적용한다.
	const [, setLayers] = useRecoilState(LayersState);
	useEffect(() => {
		if (!guideBoxProps) return;
		setLayers((prev: Layers) => {
			return prev.map((layer: Layer) => {
				if (layer.id === selectedLayerId) {
					return {
						...layer,
						props: {
							...layer.props,
							guideBoxProps: guideBoxProps,
						}
					};
				}
				return layer;
			});
		});
		// eslint-disable-next-line
	}, [guideBoxProps]);

	return (
		<Panel width={350} variant="shadow2" padding={2} border={`1px solid ${selectedLayerId ? Color.secondary.main : '#d1d1d1'}`} backgroundColor='#fff'>
			<GuideBox width="100%" spacing={2} opacity={opacityBySelectedLayerId}>
				<GuideBox width="100%" row horSpaceBetween verCenter>
					<Typography variant='h1'>Selected Layer</Typography>
					<Button color='negative' onClick={() => setSelectedLayerId(null)}>Reset</Button>
				</GuideBox>
				<GuideBox width="100%" row horSpaceBetween verCenter>
					<Typography variant='body1'>Selected Layer Id:</Typography>
					<Typography variant='body1' color={getSelectedLayerIdColor(selectedLayerId)}>{`${selectedLayerId}`}</Typography>
				</GuideBox>
				<Separator />
				<GuideBoxOptions guideBoxProps={guideBoxProps} setGuideBoxProps={setGuideBoxProps} />
			</GuideBox>
		</Panel>
	)
}

export default App;
