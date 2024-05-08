import StyledComponent, { type StyledProps } from "./Styled";

/**
 * moaui Styled MidasController
 * 
 * @param props - icoSrc, title
 * @example
 * <MidasController
 * 	icoSrc="https://www.example.com"
 * 	title="Title"
 * />
 * @returns React.ReactElement
 */
function MidasController(props: StyledProps) {	
	return <StyledComponent {...props} />
}

MidasController.defaultProps = {
	icoSrc: '',
	title: '',
} as StyledProps;

const SampleProps = {};

export default MidasController;

export {
	type StyledProps as MidasControllerProps,
	SampleProps as MidasControllerSample,
}