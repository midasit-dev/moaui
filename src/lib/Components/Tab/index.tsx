import React from "react";
import StyledComponent, { type StyledProps } from "./Styled";
import { toUnionType } from "../../Common/UnionType";

/**
 * moaui Styled Tab
 * 
 * @param props
 * @returns React.Element
 */
const Tab = (props: StyledProps) => ( <StyledComponent {...props} /> );

Tab.defaultProps = {} as StyledProps;

const SampleProps = {
	value: "value",
	label: "Tab",
	onChange: () => {},
	disabled: false,
	selected: false,
	width: "auto",
	height: "auto",
	fontSize: toUnionType({ values: ["h1", "body1", "body2", "body3"] }),
	minWidth: "auto",
	minHeight: "auto",
};

export default Tab;

export {
	type StyledProps as TabProps,
	SampleProps as TabSample,
}