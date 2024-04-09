import React from "react";
import StyledComponent, { type StyledProps } from "./Styled";
import { Icon } from "../../";
import { toUnionType } from "../../Common/UnionType";

/**
 * moaui Styled Icon Button
 * 
 * @param props 
 * @returns JSX.Element
 */

const IconButton = (props: StyledProps) => (<StyledComponent {...props} />);

IconButton.defaultProps = {
	onClick: () => {},
	border: false,
	transparent: false,
	padding: '0.625rem',
} as StyledProps;

const SampleProps = {
	disabled: false,
	color: toUnionType({ values: [ "normal", "negative" ]}),
	iconName: "Apple",
	width: "auto",
	height: "auto",
	onClick: () => {},
	transparent: false,
	transparentColor: "",
	border: true,
}

export default IconButton;

export {
	type StyledProps as IconButtonProps,
	SampleProps as IconButtonSample,
}