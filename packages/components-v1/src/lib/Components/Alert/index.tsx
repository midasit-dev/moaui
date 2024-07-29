import { toUnionType } from "../../Common/UnionType";
import StyledComponent, { type StyledProps } from "./Styled";

/**
 * moaui Styled Alert
 * 
 * @param props - title, variant, severity, children
 * @example
 * <Alert
 * 	id=''
 * 	title="Title"
 * 	variant="filled"
 * 	severity="success"
 * >
 * 	{children} - set a Alert Message
 * </Alert>
 * @returns React.ReactElement
 */
function Alert(props: StyledProps) {
	const _props = { title: "" , ...props } as StyledProps;
	return <StyledComponent {..._props} />
}

const SampleProps = {
	id: '',
	children: 'Set a Alert Message',
	variant: toUnionType({ values: ['standard', 'outlined', 'filled'] }),
	severity: toUnionType({ values: ['success', 'error', 'warning', 'info'] }),
	title: 'Alert',
};

export default Alert;

export {
	type StyledProps as AlertProps,
	SampleProps as AlertSample,
}