import StyledComponent, { type StyledProps } from "./Styled";

/**
 * moaui Styled SpreadSheet
 * 
 * @returns React.ReactElement
*/
const SpreadSheet = (props: StyledProps) => (<StyledComponent {...props} />);

SpreadSheet.defaultProps = {} as StyledProps;
SpreadSheet.sampleProps = {} as StyledProps;

export default SpreadSheet;

export {
	type StyledProps,
}