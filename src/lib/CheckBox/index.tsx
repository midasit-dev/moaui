import StyledComponent, { type StyledProps } from "./Styled";

MoaCheckBox.defaultProps = {
	disabled: false,
	name: "",
	ariaLabel: "CheckBox",
} as StyledProps;

/**
 * MoaUI Styled Check Box(Single)
 * 
 * @param props 
 * @returns React.ReactElement
 */
export default function MoaCheckBox(props: StyledProps) { return (<StyledComponent {...props} />) };