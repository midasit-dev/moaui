import StyledComponent, { type StyledProps } from "./Styled";

Alert.defaultProps = {
	title: '',
} as StyledProps;

/**
 * moaui Styled Alert
 * 
 * @param props 
 * @returns React.ReactElement
 */
function Alert(props: StyledProps) {	
	return <StyledComponent {...props} />
}

export default Alert;