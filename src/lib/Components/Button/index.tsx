import { toUnionType } from "../../Common/UnionType";
import StyledComponent, { type StyledProps } from "./Styled";

/**
 * moaui Styled Button
 * 
 * @param props 
 * @returns React.ReactElement
 */
function Button(props: StyledProps) {	
	return <StyledComponent {...props} />
}

Button.defaultProps = {
	variant: "contained",
	disabled: false,
	loading: false,
} as StyledProps;

const SampleProps = {
	children: "Button",
	onClick: () => {},
	variant: toUnionType({ values: ['contained', 'outlined', 'text'] }),
	disabled: false,
	width: '100px',
	color: toUnionType({ values: ['normal', 'negative'] }),
	loading: false,
};

export default Button;

export {
	type StyledProps as ButtonProps,
	SampleProps as ButtonSample,
}