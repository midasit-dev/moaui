import StyledComponent, { type StyledProps } from "./Styled";

Chip.defaultProps = {
	title: '',
} as StyledProps;

/**
 * moaui Styled Chip
 * 
 * @param props 
 * @returns React.ReactElement
 */
function Chip(props: StyledProps) {	
	return <StyledComponent {...props} />
}

export default Chip;