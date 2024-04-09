import StyledComponent, { type StyledProps, fillColor } from "./Styled";

/**
 * moaui Styled GuideBox
 * 
 * @param props 
 * @returns React.ReactElement
 */
const GuideBox = (props: StyledProps) => (<StyledComponent {...props} />);

GuideBox.defaultProps = {
	show: false,
	width: 'auto',
	height: 'auto',
	fill: '1',
	opacity: 1,
	duration: 1,
} as StyledProps;

const SampleProps = {};

export default GuideBox;

export { 
	type StyledProps as GuideBoxProps,
	SampleProps as GuideBoxSample,

	fillColor as GuideBoxFillColor,
};