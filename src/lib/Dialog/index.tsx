import StyledComponent, { type StyledProps } from "./Styled";

MoaDialog.defaultProps = {
} as StyledProps;

/**
 * MoaUI Styled Dialog
 * 
 * @param props 
 * @returns React.ReactElement
 */
export default function MoaDialog(props: StyledProps) { return (<StyledComponent {...props} />) };