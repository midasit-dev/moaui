import StyledComponent, { type StyledProps } from "./Styled";

Radio.defaultProps = {
	disabled: false,
	value: "",
	ariaLabel: "Radio button",
} as StyledProps;

/**
 * moaui Styled Radio Button
 * 
 * @param props 
 * @returns React.ReactElement
 */
export default function Radio(props: StyledProps) { return (<StyledComponent {...props} />) };