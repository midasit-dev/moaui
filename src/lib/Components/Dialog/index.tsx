import StyledComponent, { type StyledProps } from "./Styled";

Dialog.defaultProps = {
} as StyledProps;

/**
 * moaui Styled Dialog
 * 
 * @param props 
 * @returns React.ReactElement
 */
function Dialog(props: StyledProps) {	
	return <StyledComponent {...props} />
}

export default Dialog;