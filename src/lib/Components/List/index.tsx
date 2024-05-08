import React from "react";
import StyledComponent, { type StyledProps } from "./Styled";

/**
 * moaui Styled List
 * 
 * @param props - children, dense, disablePadding
 * @example
 * <List
 * 	dense={true || false}
 * 	disablePadding={true || false}
 * >
 * 	{children}
 * </List>
 * @returns React.ReactElement
 */
const List = (props: StyledProps) => (<StyledComponent {...props}/>);

List.defaultProps = {
	dense: true,
} as StyledProps;

const SampleProps = {};

export default List;

export {
	type StyledProps as ListProps,
	SampleProps as ListSample,
}