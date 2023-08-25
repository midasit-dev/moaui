import StyledComponent, { type StyledProps } from "./Styled";

MoaCheck.defaultProps = {
	disabled: false,
	ariaLabel: "CheckBox",
} as StyledProps;

/**
 * MoaUI Styled Check(Single)
 * 
 * @param props 
 * @returns React.ReactElement
 */
export default function MoaCheck(props: StyledProps) { return (<StyledComponent {...props} />) };