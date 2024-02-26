import React from "react";
import StyledComponent, { type StyledProps } from "./Styled";

Tab.defaultProps = {
	label: "Tab Label Text",
} as StyledProps;

/**
 * moaui Styled Tab
 * 
 * @param props
 * @returns React.Element
 */
export default function Tab(props: StyledProps) : React.ReactElement { return ( <StyledComponent {...props} /> ) }	

export {
	type StyledProps,
}