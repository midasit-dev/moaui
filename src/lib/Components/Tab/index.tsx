import React from "react";
import StyledComponent, { type StyledProps } from "./Styled";

/**
 * MoaUI Styled Tab (Single)
 * 
 * @param props
 * @returns React.Element
 */
export default function Tab(props: StyledProps) : React.ReactElement { return ( <StyledComponent {...props} /> ) }	