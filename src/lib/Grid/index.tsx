import StyledComponent, { type StyledProps } from "./Styled";

MoaGrid.defaultProps = {
} as StyledProps;

/**
 * MoaUI Styled Grid (wrapper)
 * 
 * @param props 
 * @returns React.ReactElement
 */
export default function MoaGrid(props: StyledProps) : React.ReactElement { return (<StyledComponent {...props} />) };