import StyledComponent, { type StyledProps } from "./Styled";

Radio.defaultProps = {
	disabled: false,
	value: "",
	ariaLabel: "Radio button",
} as StyledProps;

/**
 * MoaUI Styled Radio Button(Single)
 * 
 * @param props 
 * @returns React.ReactElement
 */
export default function Radio(props: StyledProps) { return (<StyledComponent {...props} />) };