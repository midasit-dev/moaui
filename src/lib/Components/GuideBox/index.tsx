import StyledComponent, { type StyledProps } from "./Styled";

GuideBox.defaultProps = {
	show: false,
	width: 'inherit',
	height: 'auto',
	fill: '1'
} as StyledProps;

/**
 * moaui Styled GuideBox
 * 
 * @param props 
 * @returns React.ReactElement
 */
export default function GuideBox(props: StyledProps) { return (<StyledComponent {...props} />) };