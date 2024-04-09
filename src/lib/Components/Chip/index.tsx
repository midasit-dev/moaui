import StyledComponent, { type StyledProps } from "./Styled";
import { toUnionType } from "../../Common/UnionType";

/**
 * moaui Styled Chip
 * 
 * @param props 
 * @returns React.ReactElement
 */
function Chip(props: StyledProps) {	
	return <StyledComponent {...props} />
}

Chip.defaultProps = {
	title: '',
} as StyledProps;

const SampleProps = {
	severity: toUnionType({ values: ["success", "error", "warning", "info"] }),
	bgColor: "",
	color: "",
	size: toUnionType({ values: ["small", "medium"] }),
	label: "chip",
	disabled: false,
}

export default Chip;

export {
	type StyledProps as ChipProps,
	SampleProps as ChipSample,
}