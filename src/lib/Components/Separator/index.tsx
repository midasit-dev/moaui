import React from "react";
import StyledComponent, {type StyledProps} from "./Styled";
import { toUnionType } from "../../Common/UnionType";

/**
 * moaui Styled Separator
 * 
 * @param {MoaSeparatorProps} props - direction
 * @example
 * <Separator
 * 	direction={"horizontal" || "vertical"}
 * />
 * @returns {React.ReactElement} MoaSeparator
 */
const Separator = (props:StyledProps) => (<StyledComponent {...props}/>);

Separator.defaultProps = {
	direction: "horizontal"
} as StyledProps;

const SampleProps = {
	direction: toUnionType({ values: ['horizontal', 'vertical'] }),
};

export default Separator;

export {
	type StyledProps as SeparatorProps,
	SampleProps as SeparatorSample,
}