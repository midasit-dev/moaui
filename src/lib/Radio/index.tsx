import StyledComponent, { type StyledProps } from "./Styled";

MoaRadioButton.defaultProps = {
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
export default function MoaRadioButton(props: StyledProps) { return (<StyledComponent {...props} />) };