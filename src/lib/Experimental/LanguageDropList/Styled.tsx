import { useState, useEffect, useCallback } from 'react';
import MoaStyledComponent from '../../Style/MoaStyled';
import { DropList, type DropListProps } from '../../';

type LanguageType = {
	name: string;
	path: string;
};

export type StyledProps = {
	languages?: LanguageType[],

	dropListProps?: { //Style과 관련된 친구들만 살려둡니다.
		width?: DropListProps['width'];
		disabled?: DropListProps['disabled'];
		backgroundColor?: DropListProps['backgroundColor'];
		listWidth?: DropListProps['listWidth'];
		placeholder?: DropListProps['placeholder'];
		maxLength?: DropListProps['maxLength'];
	},

	/**
	 * in storybook, prop for test
	 * @default false
	 */
	storybook?: boolean;
};

const StyledComponent = (props: StyledProps) => {
	const { 
		languages,
		dropListProps,
		storybook,
	} = props;

	const [data, setData] = useState<Map<number, LanguageType>>(new Map()); // value, { itemName, path }
	const [items, setItems] = useState<any>([]); // [ itemName, path ]
	const [value, setValue] = useState<any>(undefined);

	useEffect(() => {
		if (languages !== undefined) {
			setData(new Map(languages.map((language: LanguageType, index: number) => {
				return [index + 1, language]; // 1부터 시작
			})));
		} else {
			setData(new Map([
				[1, { name: 'Korean', path: 'ko' }],
				[2, { name: 'English', path: 'en' }],
				[3, { name: 'Japanese', path: 'ja' }],
			]))
		}
	}, [languages]);

	useEffect(() => {
		if (data.size === 0) return;
		setItems(Array.from(data.keys()).map((key: number) => {
			return [data.get(key)?.name, key];
		}));

		const curPathName = window.location.pathname;
		for (const [key, value] of data) {
			if (value.path === curPathName) {
				setValue(key);
				break;
			}
		}
	}, [data]);

	useEffect(() => {
		if (items.length > 0 && items[0][1] !== undefined) {
			setValue(items[0][1]); // default value
		}
	}, [items]);

	const onChangeHandler = useCallback((e: any) => {
		const curValue = e.target.value;
		setValue(curValue);

		if (storybook) {
			//storybook에서는 경고창만 띄워준다.
			alert(`Add to '/${data.get(curValue)?.path}' in urlPath`);
		} else {
			//url path 변경 동작
			if (data.get(curValue) && data.get(curValue)?.path) {
				window.location.pathname = '/' + data.get(curValue)?.path;
			}
		}
	}, [data, storybook]);

	return (
		<DropList
			itemList={items}
			defaultValue={'NONE'}
			value={value}
			onChange={onChangeHandler}
			width={'100px'}

			{...dropListProps}
		/>
	)
}

const ThemedComponent = (props: StyledProps) => (
	<MoaStyledComponent>
		<StyledComponent {...props} />
	</MoaStyledComponent>
);
export default ThemedComponent;
