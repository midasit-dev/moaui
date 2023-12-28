import StyledComponent, { type StyledProps } from "./Styled";

GuideBox.defaultProps = {
	show: false,
	width: 'auto',
	height: 'auto',
	fill: '1',
	opacity: 1,
	duration: 1,
	progress: false,
} as StyledProps;

/**
 * moaui Styled GuideBox
 * 
 * @param props 
 * @returns React.ReactElement
 */
export default function GuideBox(props: StyledProps) { return (<StyledComponent {...props} />) };