import StyledComponent, { type StyledProps } from "./Styled";

MoaTableHead.defaultProps = {
} as StyledProps;

/**
 * MoaUI Styled Table Head
 * 
 * @param {StyledProps} props 
 * @returns React.ReactElement
 */
export default function MoaTableHead(props: StyledProps) { return (<StyledComponent {...props} />) };