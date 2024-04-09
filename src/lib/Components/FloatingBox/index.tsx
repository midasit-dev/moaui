import StyledComponent, { type StyledProps } from "./Styled";

/**
 * moaui Styled FloatingBox
 * 
 * @param props - key, show, x, y, width, height, fill, guideBoxProps, children, onMouseDown, onMouseUp, onMouseOver, onMouseLeave, onClick, cursor, opacity, transition, border
 * @returns React.ReactElement
 */
const FloatingBox = (props: StyledProps) => (<StyledComponent {...props} />);

FloatingBox.defaultProps = {} as StyledProps;

const SampleProps = {};

export default FloatingBox;

export {
	type StyledProps as FloatingBoxProps,
	SampleProps as FloatingBoxSample,
}