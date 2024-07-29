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
	const _props = { icoSrc: '', title: '', ...props } as StyledProps;
	return <StyledComponent {..._props} />
}

const SampleProps = {};

export default MidasController;

export {
	type StyledProps as MidasControllerProps,
	SampleProps as MidasControllerSample,
}