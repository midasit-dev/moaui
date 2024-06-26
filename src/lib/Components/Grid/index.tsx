import StyledComponent, { type StyledProps } from "./Styled";

/**
 * moaui Styled Grid (wrapper)
 * 
 * @param props 
 * @returns React.ReactElement
 */
const Grid = (props: StyledProps) => (<StyledComponent {...props} />);

const SampleProps = {};

export default Grid;

export {
	type StyledProps as GridProps,
	SampleProps as GridSample,
}
