import { Children, useState, cloneElement, createElement, useEffect, useCallback, Fragment } from 'react';

import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';

import MoaStyledComponent from "../../Style/MoaStyled";
import { Color, type TabProps } from "../../";

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

	/**
	 * The width of the Tab Group.
	 */
	width?: string | number;
	/**
	 * The height of the Tab Group.
	 */
	height?: string | number;
	/**
	 * The fontSize of the Tab Group.
	 */
	fontSize?: string | number;
	/**
	 * The minWidth of the Tab Group.
	 */
	minWidth?: string | number;
	/**
	 * The minHeight of the Tab Group.
	 */
	minHeight?: string | number;

	/**
	 * The props of the inner `Tab` component. effect all included tabs
	 */
	tabProps?: {
		width?: TabProps["width"];
		height?: TabProps["height"];
		fontSize?: TabProps["fontSize"];
		minWidth?: TabProps["minWidth"];
		minHeight?: TabProps["minHeight"];
	}
}
const StyledComponent = styled((props: StyledProps) => {
	const { width, height, minWidth, minHeight, tabProps } = props;

	const [value, setValue] = useState(props?.value);
	const cloneArr = Children.map(props.children, (child, idx) => {
		if (!child) return createElement(Fragment, { key: idx });
		return cloneElement(child, { 
			onChange: props?.onChange, 
			selected: value === child.props.value,
			...tabProps,
		})
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
			sx={{
				width: width ?? undefined,
				height: height ?? undefined,
				minWidth: minWidth ?? undefined,
				minHeight: minHeight ?? undefined,
			}}
		>
			{cloneArr}
		</Tabs>
	)
})(() => ({}));

const ThemedComponent = (props: StyledProps) => (
	<MoaStyledComponent>
		<StyledComponent {...props} />
	</MoaStyledComponent>
);
export default ThemedComponent;