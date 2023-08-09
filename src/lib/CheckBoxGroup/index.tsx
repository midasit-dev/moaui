import StyledComponent, { type StyledProps } from "./Styled";

MoaCheckBoxGroup.defaultProps = {
	checked: false,
	disabled: false,
	value: "",
	name: "",
	ariaLabel: "Check Button",
} as StyledProps;

/**
 * MoaUI Styled Check Box(Multi)
 * 
 * @param props 
 * @returns React.ReactElement
 */
export default function MoaCheckBoxGroup(props: StyledProps) { return (<StyledComponent {...props} />) };