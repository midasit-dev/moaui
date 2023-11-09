import StyledComponent, { type StyledProps } from "./Styled";

MoaDialogActions.defaultProps = {
} as StyledProps;

/**
 * MoaUI Styled DialogActions
 * 
 * @param props 
 * @returns React.ReactElement
 */
export default function MoaDialogActions(props: StyledProps) { return (<StyledComponent {...props} />) };