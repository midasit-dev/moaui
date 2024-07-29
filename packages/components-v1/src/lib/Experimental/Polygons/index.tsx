import StyledComponent, { type StyledProps } from "./Styled";

/**
 * moaui Styled Polygons
 * 
 * @returns React.ReactElement
*/
const Polygons = (props: StyledProps) => (<StyledComponent {...props} />);

Polygons.defaultProps = {} as StyledProps;
Polygons.sampleProps = {} as StyledProps;

export default Polygons;

export {
	type StyledProps,
}