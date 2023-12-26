import { Children, useState, cloneElement, createElement, useEffect, useCallback, Fragment } from 'react';

import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';

import MoaStyledComponent from "../../Style/MoaStyled";
import { Color } from "../../";

export type StyledProps = {
	/**
	 * The tabs orientation (layout flow direction).
	 * @default "horizontal"
	 * @optional
	 * @type "horizontal" | "vertical"
	 * @example
	 * orientation="horizontal"
	 * orientation="vertical"
	 */
	orientation?: "horizontal" | "vertical";
	/**
	 * The tabs indicator orientation (layout flow direction).
	 * @default "right"
	 * @optional
	 * @type "right" | "left"
	 * @example
	 * indicator="right"
	 * indicator="left"
	 */
	indicator?: "right" | "left";	
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
		if (!child) return createElement(Fragment, { key: idx });
		return cloneElement(child, { onChange: props?.onChange, selected: value === child.props.value })
	});

	const locateIndicator = useCallback((props: StyledProps) => {
		if (props?.orientation === "vertical"){
			if (props?.indicator === "left") return { right: 'auto', left: 0 };
			else return { left: 'auto', right: 0 };
		} else return { };
	}, []);

	useEffect(() => {
		setValue(props?.value);
	}, [props?.value]);

	return (
		<Tabs
			orientation={props?.orientation}
			value={value}
			onChange={(e, v) => props?.onChange?.(e, v) || setValue(v)}
			aria-label={props?.['aria-label']}
			TabIndicatorProps={{
				style: {
					...locateIndicator(props),
					backgroundColor: Color.secondary.main
				}
			}}
		>
			{cloneArr}
		</Tabs>
	)
})(({theme}) => ({}));

const ThemedComponent = (props: StyledProps) => (
	<MoaStyledComponent>
		<StyledComponent {...props} />
	</MoaStyledComponent>
);
export default ThemedComponent;