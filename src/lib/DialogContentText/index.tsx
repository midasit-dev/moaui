import StyledComponent, { type StyledProps } from "./Styled";

MoaDialogContentText.defaultProps = {
} as StyledProps;

/**
 * MoaUI Styled DialogContentText
 * 
 * @param props 
 * @returns React.ReactElement
 */
export default function MoaDialogContentText(props: StyledProps) { return (<StyledComponent {...props} />) };