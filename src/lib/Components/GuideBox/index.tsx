import StyledComponent, { type StyledProps } from "./Styled";

GuideBox.defaultProps = {
	show: false,
	width: 'inherit',
	height: 'auto',
	itemSpacing: 2,
	itemDirection: 'column',
	fill: '0'
} as StyledProps;

/**
 * moaui Styled GuideBox
 * 
 * @param props 
 * @returns React.ReactElement
 */
export default function GuideBox(props: StyledProps) { return (<StyledComponent {...props} />) };