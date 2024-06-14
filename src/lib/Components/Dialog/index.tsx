import StyledComponent, { type StyledProps } from "./Styled";

/**
 * moaui Styled Dialog
 * Demos:
 *
 * - [Dialog](https://dev--6556d17f924e868b000ddaf5.chromatic.com/?path=/story/components-dialog--help/)
 * 
 * @param props - children, open, setOpen, json, headerIcon, headerTitle, onClose, hiddenClose, justPreview
 * @example
 * <Dialog headerTitle="Dialog Title" open={true} setOpen={setOpen} onClose={onClose}>
 *  {children}
 * </Dialog>
 * @returns React.ReactElement
 */
const Dialog = (props: StyledProps) => {
	const _props = { headerTitle: "Dialog Title", ...props } as StyledProps;
  return <StyledComponent {...props} />;
};

const SampleProps = {}

export default Dialog;

export {
	type StyledProps as DialogProps,
	SampleProps as DialogSample,
}