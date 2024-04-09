import { toUnionType } from "../../Common/UnionType";
import StyledComponent, { type StyledProps } from "./Styled";

/**
 * moaui Styled Alert
 * 
 * @param props 
 * @returns React.ReactElement
 */
function Alert(props: StyledProps) {	
	return <StyledComponent {...props} />
}

Alert.defaultProps = {
	title: '',
} as StyledProps;

const SampleProps = {
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