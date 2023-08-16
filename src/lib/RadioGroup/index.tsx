import StyledComponent, { type StyledProps } from "./Styled";

MoaRadioGroup.defaultProps = {
	ariaLabel: "Radio Group",
};

/**
 * Wrapper for MoaUI Styled Radio Button.
 * 
 * @param props 
 * @returns React.ReactElement
 */
export default function MoaRadioGroup(props: StyledProps) { return (<StyledComponent {...props} />) };