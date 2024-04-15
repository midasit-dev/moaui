import React from "react";
import StyledComponent, { type StyledProps } from "./Styled";

/**
 * moaui Styled ListItemButton
 * 
 * @param props - children
 * @example
 * <ListItemButton>
 * 	{children}
 * </ListItemButton>
 * @returns React.ReactElement
 */
const ListItemButton = (props: StyledProps) => (<StyledComponent {...props}/>);

ListItemButton.defaultProps = {} as StyledProps;

const SampleProps = {};

export default ListItemButton;

export {
	type StyledProps as ListItemButtonProps,
	SampleProps as ListItemButtonSample,
}