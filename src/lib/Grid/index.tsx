import StyledComponent, { type StyledProps } from "./Styled";

Grid.defaultProps = {
} as StyledProps;

/**
 * MoaUI Styled Grid (wrapper)
 * 
 * @param props 
 * @returns React.ReactElement
 */
export default function Grid(props: StyledProps) : React.ReactElement { return (<StyledComponent {...props} />) };