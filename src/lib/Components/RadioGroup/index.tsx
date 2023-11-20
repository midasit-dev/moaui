import StyledComponent, { type StyledProps } from "./Styled";

RadioGroup.defaultProps = {
	ariaLabel: "Radio Group",
};

/**
 * Wrapper for MoaUI Styled Radio Button.
 * 
 * @param props 
 * @returns React.ReactElement
 */
export default function RadioGroup(props: StyledProps) { return (<StyledComponent {...props} />) };