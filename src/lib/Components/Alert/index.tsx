import { toUnionType } from "../../Common/UnionType";
import StyledComponent, { type StyledProps } from "./Styled";

Alert.defaultProps = {
	title: '',
} as StyledProps;

Alert.playgroundProps = {
	children: 'Set a Alert Message',
	variant: toUnionType({ values: ['standard', 'outlined', 'filled'] }),
	severity: toUnionType({ values: ['success', 'error', 'warning', 'info'] }),
	title: 'Alert',
};

/**
 * moaui Styled Alert
 * 
 * @param props 
 * @returns React.ReactElement
 */
function Alert(props: StyledProps) {	
	return <StyledComponent {...props} />
}

export default Alert;