import React from "react";
import StyledComponent, { type StyledProps } from "./Styled";

/**
 * moaui Styled ListItem
 * 
 * @param props 
 * @returns React.ReactElement
 */
const ListItem = (props: StyledProps) => (<StyledComponent {...props}/>);

ListItem.defaultProps = {
	paddingLeft: 0,
	disableGutters: false
} as StyledProps;

const SampleProps = {};

export default ListItem;

export {
	type StyledProps as ListItemProps,
	SampleProps as ListItemSample,
}