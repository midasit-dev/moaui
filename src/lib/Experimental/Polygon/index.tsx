import StyledComponent, { type StyledProps } from "./Styled";

/**
 * moaui Styled Polygon
 * 
 * @returns React.ReactElement
*/
const Polygon = (props: StyledProps) => (<StyledComponent {...props} />);

Polygon.defaultProps = {} as StyledProps;
Polygon.sampleProps = {} as StyledProps;

export default Polygon;

export {
	type StyledProps,
}