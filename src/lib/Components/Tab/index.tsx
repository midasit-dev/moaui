import React from "react";
import StyledComponent, { type StyledProps } from "./Styled";

/**
 * moaui Styled Tab
 * 
 * @param props
 * @returns React.Element
 */
export default function Tab(props: StyledProps) : React.ReactElement { return ( <StyledComponent {...props} /> ) }	