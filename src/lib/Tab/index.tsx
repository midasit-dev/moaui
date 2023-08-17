import React from "react";
import StyledComponent, { type StyledProps } from "./Styled";

/**
 * Tab
 * @param props
 * @returns React.Element
 */
export default function MoaTab(props: StyledProps) : React.ReactElement { return ( <StyledComponent {...props} /> ) }	