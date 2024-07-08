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

const Button = (props: StyledProps) => {
	const _props = {
		variant: "contained", 
		disabled: false, 
		loading: false, 
		...props
	} as StyledProps;

	return ( <StyledComponent {..._props} /> )
};

const SampleProps = {
  id: "",
  children: "Button",
  onClick: () => {},
  variant: toUnionType({ values: ["contained", "outlined", "text"] }),
  disabled: false,
  width: "100px",
  color: toUnionType({ values: ["normal", "negative"] }),
  loading: false,
};

export default Button;

export { type StyledProps as ButtonProps, SampleProps as ButtonSample };
