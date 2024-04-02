import StyledComponent, { type StyledProps } from "./Styled";

/**
 * moaui Styled LanguageDropList
 * 
 * @returns React.ReactElement
*/
const LanguageDropList = (props: StyledProps) => (<StyledComponent {...props} />);

LanguageDropList.defaultProps = {} as StyledProps;
LanguageDropList.sampleProps = {} as StyledProps;

export default LanguageDropList;

export {
	type StyledProps,
}