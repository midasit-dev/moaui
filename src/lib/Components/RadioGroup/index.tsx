import StyledComponent, { type StyledProps } from "./Styled";

RadioGroup.defaultProps = {
	ariaLabel: "Radio Group",
} as StyledProps;

/**
 * moaui Styled Radio Button Group
 * 
 * @param props 
 * @returns React.ReactElement
 */
export default function RadioGroup(props: StyledProps) { return (<StyledComponent {...props} />) };