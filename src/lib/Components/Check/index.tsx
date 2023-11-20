import StyledComponent, { type StyledProps } from "./Styled";

Check.defaultProps = {
	disabled: false,
	ariaLabel: "CheckBox",
} as StyledProps;

/**
 * moaui Styled Check (Single)
 * 
 * @param props 
 * @returns React.ReactElement
 */
export default function Check(props: StyledProps) { return (<StyledComponent {...props} />) };