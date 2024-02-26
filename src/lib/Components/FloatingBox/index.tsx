import StyledComponent, { type StyledProps } from "./Styled";

FloatingBox.defaultProps = {} as StyledProps;

/**
 * moaui Styled FloatingBox
 * 
 * @param props 
 * @returns React.ReactElement
 */
export default function FloatingBox(props: StyledProps) { return (<StyledComponent {...props} />) };

export {
	type StyledProps,
}