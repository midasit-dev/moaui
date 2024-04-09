import StyledComponent, { type StyledProps } from "./Styled";

/**
 * moaui Styled Dialog
 * Demos:
 *
 * - [Dialog](https://dev--6556d17f924e868b000ddaf5.chromatic.com/?path=/story/components-dialog--help/)
 * 
 * @param props 
 * @returns React.ReactElement
 */
const Dialog = (props: StyledProps) => (<StyledComponent {...props} />);

Dialog.defaultProps = {
} as StyledProps;

const SampleProps = {}

export default Dialog;

export {
	type StyledProps as DialogProps,
	SampleProps as DialogSample,
}