import StyledComponent, { type StyledProps } from "./Styled";

MoaDialogContent.defaultProps = {
} as StyledProps;

/**
 * MoaUI Styled DialogContent
 * 
 * @param props 
 * @returns React.ReactElement
 */
export default function MoaDialogContent(props: StyledProps) { return (<StyledComponent {...props} />) };