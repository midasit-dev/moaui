import StyledComponent, { type StyledProps, fillColor } from "./Styled";

GuideBox.defaultProps = {
	show: false,
	width: 'auto',
	height: 'auto',
	fill: '1',
	opacity: 1,
	duration: 1,
} as StyledProps;

/**
 * moaui Styled GuideBox
 * 
 * @param props 
 * @returns React.ReactElement
 */
export default function GuideBox(props: StyledProps) { return (<StyledComponent {...props} />) };

export { 
	type StyledProps,
	fillColor,
};