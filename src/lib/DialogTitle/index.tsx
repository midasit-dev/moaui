import StyledComponent, { type StyledProps } from "./Styled";

MoaDialogTitle.defaultProps = {
} as StyledProps;

/**
 * MoaUI Styled DialogTitle
 * 
 * @param props 
 * @returns React.ReactElement
 */
export default function MoaDialogTitle(props: StyledProps) { return (<StyledComponent {...props} />) };