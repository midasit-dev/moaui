import StyledComponent, { type StyledProps } from "./Styled";

MoaRadio.defaultProps = {
	checked: false,
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
export default function MoaRadio(props: StyledProps) { return (<StyledComponent {...props} />) };