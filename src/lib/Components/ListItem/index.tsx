import React from "react";
import StyledComponent, { type StyledProps } from "./Styled";

/**
 * moaui Styled ListItem
 * 
 * @param props - children, disableGutters, secondaryAction, onClick
 * @example
 * <ListItem
 * 	disableGutters={false || true}
 * 	secondaryAction={React.ReactNode}
 * 	onClick={() => {}}
 * >
 * 	{children}
 * </ListItem>
 * @returns React.ReactElement
 */
const ListItem = (props: StyledProps) => {
	const _props = {
    paddingLeft: 0,
    disableGutters: false,
    ...props,
  } as StyledProps;
  return <StyledComponent {..._props} />;
};

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