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
const List = (props: StyledProps) => {
	const _props = { dense: true, disablePadding: false, ...props } as StyledProps;
  return <StyledComponent {..._props} />;
};

const SampleProps = {};

export default List;

export {
	type StyledProps as ListProps,
	SampleProps as ListSample,
}