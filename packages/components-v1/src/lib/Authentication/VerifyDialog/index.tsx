import StyledComponent, { StyledProps } from "./Styled";

VerifyDialog.defaultProps = {
	preventRedirect: false
} as StyledProps;

/**
 * moaui Styled VerifyDialog
 * 
 * @param props
 * @returns JSX.Element
 */
function VerifyDialog(props: StyledProps) : JSX.Element {
	return (
		<StyledComponent {...props} />
	)
}

export default VerifyDialog;