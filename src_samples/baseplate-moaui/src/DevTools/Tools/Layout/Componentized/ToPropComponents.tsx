import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { Layer } from '../../../types';
import Moaui, {
	TextFieldV2,
	TextField,
	Switch,
	Typography,
	GuideBox,
} from '@midasit-dev/moaui';
import { PropComponentLayerAddValueState, PropComponentLayerModifyValueState } from '../recoilState';
import ToPropComponentArray from './ToPropComponentsArray';

export interface PropComponentProps<T> {
	type: string;
	name: string;
	value: T;
	hookType: 'Add' | 'Modify';
}

export const usePropComponent = (type: string, name: string, value: any, hookType: string) => {
	const [localValue, setLocalValue] = useState(value);
	useEffect(() => setLocalValue(value), [value]);

	const [, setAddValue] = useRecoilState(PropComponentLayerAddValueState);
	const [, setModifyValue] = useRecoilState(PropComponentLayerModifyValueState);

	let setValue: any = null;
	if (hookType === 'Add') setValue = setAddValue;
	else if (hookType === 'Modify') setValue = setModifyValue;
	else console.error('hookType is not valid');

	//변경 될 때 마다 Add State에 추가해둠.
	useEffect(() => {
		setValue((prev: Layer) => ({
			...prev, 
			props: {
				...prev.props,
				[name]: value,
			}
		}));
	}, [setValue, type, name, value]);

	return {
		localValue,
		setLocalValue,
		updateGlobalValue: setValue,
	};
}

const ToPropComponentMap = (props: PropComponentProps<Map<any, any>>): JSX.Element => {
	//추가하는 것 부터 조금 고민이 필요해보인다 =_=
	const { name, value } = props;
	// const callbackValue = useCallback(() => value, [value]);
	// const { localValue, } = usePropComponent(type, name, callbackValue);
	return (
		<GuideBox width="100%" row horSpaceBetween verCenter opacity={0.5}>
			<Typography variant='body1'>*Map {name}</Typography>
			<TextField 
				width="100px"
				value={value.toString()}
				disabled
			/>
		</GuideBox>
	);
}

const ToPropComponentFunction = (props: PropComponentProps<Function>): JSX.Element => {
	//추가하는 것 부터 조금 고민이 필요해보인다 =_=
	const { name, value } = props;
	// const { localValue, } = usePropComponent(type, name, value, hookType);
	return (
		<GuideBox width="100%" row horSpaceBetween verCenter opacity={0.5}>
			<Typography variant='body1'>{name}</Typography>
			<TextField 
				width="100px"
				value={value.toString()}
				disabled
			/>
		</GuideBox>
	);
}

const ToPropComponentNumber = (props: PropComponentProps<number>): JSX.Element => {
	const { type, name, value, hookType } = props;
	const { localValue, setLocalValue, updateGlobalValue } = usePropComponent(type, name, value, hookType);
	return (
		<GuideBox width="100%" row horSpaceBetween verCenter>
			<Typography variant='body1'>{name}</Typography>
			<TextFieldV2
				type='number'
				numberOptions={{
					onlyInteger: true,
					min: 0,
					step: 1,
				}}
				width="100px"
				value={localValue.toString()}
				titlePosition="left"
				onChange={(event) => {
					setLocalValue(Number(event.target.value));
					updateGlobalValue((prev: any) => ({ 
						...prev, 
						props: {
							...prev.props,
							[name]: Number(event.target.value),
						}
					}));
				}}
			/>
		</GuideBox>
	);
}

const ToPropComponentString = (props: PropComponentProps<string>): JSX.Element => {
	const { type, name, value, hookType } = props;
	const { localValue, setLocalValue, updateGlobalValue } = usePropComponent(type, name, value, hookType);

	return (
		<GuideBox width="100%" row horSpaceBetween verCenter>
			<Typography variant='body1'>{name}</Typography>
			<TextField 
				width="100px"
				value={localValue}
				titlePosition="left"
				onChange={(event) => {
					setLocalValue(event.target.value);
					updateGlobalValue((prev: any) => ({ 
						...prev, 
						props: {
							...prev.props,
							[name]: event.target.value,
						}
					}));
				}}
			/>
		</GuideBox>
	);
}

const ToPropComponentBoolean = (props: PropComponentProps<boolean>): JSX.Element => {
	const { type, name, value, hookType } = props;
	const { localValue, setLocalValue, updateGlobalValue } = usePropComponent(type, name, value, hookType);
	return (
		<GuideBox width="100%" row horSpaceBetween verCenter>
			<Typography variant='body1'>{name}</Typography>
			<Switch 
				checked={localValue}
				onChange={(event) => {
					setLocalValue(event.target.checked);
					updateGlobalValue((prev: any) => ({
						...prev,
						props: {
							...prev.props,
							[name]: event.target.checked,
						},
					 }));
				}}
			/>
		</GuideBox>
	);
}

const ToPropComponentObject = (props: PropComponentProps<object>): JSX.Element => {
	const { name, value } = props;
	// const { localValue, } = usePropComponent(type, name, value, hookType);
	return (
		<GuideBox width="100%" row horSpaceBetween verCenter opacity={0.5}>
			<Typography variant='body1'>*object {name}</Typography>
			<TextField 
				width="100px"
				value={JSON.stringify(value)}
				disabled
			/>
		</GuideBox>
	);
}

const ToPropComponentDefault = (props: PropComponentProps<any>): JSX.Element => {
	const { name, value } = props;
	return (
		<GuideBox width="100%" row horSpaceBetween verCenter opacity={0.5}>
			<Typography variant='body1'>*default {name}</Typography>
			<TextField 
				width="100px"
				value={JSON.stringify(value)}
				disabled
			/>
		</GuideBox>
	);
}

const ToPropComponent = (props: PropComponentProps<any>): JSX.Element => {
	const { type, name, value, hookType } = props;

	if (value instanceof Array) {
		return <ToPropComponentArray type={type} name={name} value={value} hookType={hookType} />;
	} else if (value instanceof Map) {
		return <ToPropComponentMap type={type} name={name} value={value} hookType={hookType} />;
	} else {
		//원시 타입
		switch (typeof value) {
			case 'function': 
				return <ToPropComponentFunction type={type} name={name} value={value} hookType={hookType} />;
			case 'string':
				return <ToPropComponentString type={type} name={name} value={value} hookType={hookType} />;
			case 'boolean':
				return <ToPropComponentBoolean type={type} name={name} value={value} hookType={hookType} />;
			case 'number':
				return <ToPropComponentNumber type={type} name={name} value={value} hookType={hookType} />;
			case 'object':
				return <ToPropComponentObject type={type} name={name} value={value} hookType={hookType} />;
			default:
				return <ToPropComponentDefault type={type} name={name} value={value} hookType={hookType} />;
		}
	}
}

interface ToPropComponentsProps {
	componentType: string;
	customProps?: any;
	customHookType: PropComponentProps<any>["hookType"];
}

const ToPropComponents = (props: ToPropComponentsProps): JSX.Element => {
	const { componentType, customProps, customHookType } = props;

	const [options, setOptions] = useState({});
	useEffect(() => {
		//지금은 아래 컴포넌트들만 sampleProps을 가지고 있음.
		//추후에 다른 컴포넌트들도 추가되면 아래 case 분기가 필요 없어짐.
		const enableSamplePropComp: EnableSamplePropComponent = componentType as EnableSamplePropComponent;
		if (!enableSamplePropComp) return;
		
		if (customProps) setOptions(customProps);
		else setOptions(Moaui[enableSamplePropComp].sampleProps);

	}, [componentType, customProps]);

	return (
		<GuideBox width="100%" horSpaceBetween verCenter spacing={0.5}>
			{Object.entries(options).map(([name, value], index: number) => {
				return <ToPropComponent key={index} type={componentType} name={name} value={value} hookType={customHookType} />;
			})}
		</GuideBox>
	)
}

export default ToPropComponents;

export type EnableSamplePropComponent = 
	'Button'
	| 'Panel'
	| 'DropList'
	| 'TextField'
	| 'TextFieldV2'
	//추가되면 여기에;