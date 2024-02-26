import StyledComponent, { type StyledProps } from "./Styled";

TableHead.defaultProps = {
} as StyledProps;

/**
 * moaui Styled Table Head
 * 
 * @param {StyledProps} props 
 * @returns React.ReactElement
 */
export default function TableHead(props: StyledProps) { return (<StyledComponent {...props} />) };