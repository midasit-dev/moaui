import StyledComponent, { type StyledProps } from "./Styled";
import { forwardRef } from "react";

/**
 * moaui Styled Check
 * 
 * @param props 
 * @returns React.ReactElement
*/
const Check = forwardRef((props: StyledProps, ref: any) => (<StyledComponent {...props} inputRef={ref} />));

Check.defaultProps = {
	disabled: false,
	ariaLabel: "CheckBox",
} as StyledProps;

export default Check;

export {
	type StyledProps,
}