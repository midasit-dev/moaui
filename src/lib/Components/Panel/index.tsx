import { toUnionType } from "../../Common/UnionType";
import StyledComponent, { type StyledProps } from "./Styled";

/**
 * moaui Styled Panel
 * 
 * @param props
 * @returns JSX.Element
 */
function Panel(props: StyledProps) : JSX.Element {
	return ( <StyledComponent {...props} /> )
}

Panel.defaultProps = {
	children: <></>,
	variant: 'shadow',
	width: 'fit-content',
	height: 'fit-content',
	flexItem: false,
} as StyledProps;

const SampleProps = {
	children: <></>,
	variant: toUnionType({ values: ['box', 'shadow', 'shadow2', 'strock'] }),
	width: '100px',
	height: '100px',
	flexItem: false,
	backgroundColor: '#fff',
	borderRadius: '5px',
	border: 'none',
	relative: false,
};

export default Panel;

export { 
	type StyledProps as PanelProps,
	SampleProps as PanelSample,
};