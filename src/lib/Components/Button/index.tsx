import { toUnionType } from "../../Common/UnionType";
import StyledComponent, { type StyledProps } from "./Styled";

/**
 * moaui Styled Button
 * 
 * @param props - onClick, variant, disabled, width, color, loading, children
 * @example
 * <Button
 * 	id=""
 * 	onClick={() => {}}
 * 	variant="contained" || "outlined" || "text"
 * 	disabled={false} || {true}
 * 	width="100px" || "auto"
 * 	color="normal" || "negative"
 * 	loading={false} || {true}
 * >
 * 	{children} - set a Button Text
 * </Button>
 * @returns React.ReactElement
 */
const Button = (props: StyledProps) => (<StyledComponent {...props} />);

Button.defaultProps = {
	variant: "contained",
	disabled: false,
	loading: false,
} as StyledProps;

const SampleProps = {
	id: '',
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