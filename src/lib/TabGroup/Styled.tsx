import React from 'react';
import { Children, useState, cloneElement } from 'react';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Color from "../Color";

export type StyledProps = {
	/**
	 * The content of the component.
	 */
	children?: React.ReactElement<any, string | React.JSXElementConstructor<any>>[];
	/**
	 * The value of the currently selected `Tab`.
	 * If you don't want any selected `Tab`, you can set this prop to `false`.
	 */
	value?: any;
	/**
	 * Callback fired when the value changes.
	 *
	 * @param {React.SyntheticEvent} event The event source of the callback. **Warning**: This is a generic event not a change event.
	 * @param {any} value We default to the index of the child (number)
	 */
	onChange?: (event: React.SyntheticEvent, value: any) => void;
	/**
	 * The label for the Tab Group as a string.
	 */
	'aria-label'?: string;
}
const StyledComponent = styled((props: StyledProps) => {
	const [value, setValue] = useState(props?.value);
	const cloneArr = Children.map(props.children, (child, idx) => {
		if (!child) return React.createElement(React.Fragment, { key: idx });
		return cloneElement(child, { setValue: setValue })
	});

	return (
		<Tabs
			value={value}
			onChange={props?.onChange}
			aria-label={props?.['aria-label']}
			TabIndicatorProps={{
				style: {
					backgroundColor: Color.secondary.main
				}
			}}
		>
			{cloneArr}
		</Tabs>
	)
})(({theme}) => ({}));

export default StyledComponent;