import StyledComponent, { type StyledProps } from "./Styled";

MidasController.defaultProps = {
	icoSrc: '',
	title: '',
} as StyledProps;

/**
 * moaui Styled MidasController
 * 
 * @param props 
 * @returns React.ReactElement
 */
function MidasController(props: StyledProps) {	
	return <StyledComponent {...props} />
}

export default MidasController;