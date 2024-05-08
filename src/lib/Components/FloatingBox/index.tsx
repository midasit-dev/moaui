import StyledComponent, { type StyledProps } from "./Styled";

/**
 * moaui Styled FloatingBox
 * 
 * @param props - key, show, x, y, width, height, fill, guideBoxProps, children, onMouseDown, onMouseUp, onMouseOver, onMouseLeave, onClick, cursor, opacity, transition, border
 * @example
 * <FloatingBox id="" show={true} x={0} y={0} width={100} height={100} fill='blue' />
 * @returns React.ReactElement
 */
const FloatingBox = (props: StyledProps) => (<StyledComponent {...props} />);

FloatingBox.defaultProps = {} as StyledProps;

const SampleProps = {
	id: '',
	show: false,
	x: 0,
	y: 0,
	width: '100px',
	height: '100px',
};

export default FloatingBox;

export {
	type StyledProps as FloatingBoxProps,
	SampleProps as FloatingBoxSample,
}