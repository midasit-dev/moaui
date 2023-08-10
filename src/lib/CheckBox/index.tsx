import StyledComponent, { type StyledProps } from "./Styled";

MoaCheckbox.defaultProps = {
	disabled: false,
	ariaLabel: "CheckBox",
} as StyledProps;

/**
 * MoaUI Styled Check Box(Single)
 * 
 * @param props 
 * @returns React.ReactElement
 */
export default function MoaCheckbox(props: StyledProps) { return (<StyledComponent {...props} />) };