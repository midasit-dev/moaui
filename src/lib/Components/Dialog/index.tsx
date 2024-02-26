import StyledComponent, { type StyledProps } from "./Styled";

Dialog.defaultProps = {
} as StyledProps;

/**
 * moaui Styled Dialog
 * Demos:
 *
 * - [Dialog](https://dev--6556d17f924e868b000ddaf5.chromatic.com/?path=/story/components-dialog--help/)
 * 
 * @param props 
 * @returns React.ReactElement
 */
function Dialog(props: StyledProps) {	
	return <StyledComponent {...props} />
}

export default Dialog;