import StyledComponent, { type StyledProps } from "./Styled";
import { toUnionType } from "../../Common/UnionType";

/**
 * moaui Styled Chip
 * 
 * @param props - severity, bgColor, color, size, label, disabled
 * @example
 * <Chip
 * 	id=''
 * 	severity="success" || "error" || "warning" || "info"
 * 	bgColor=""
 * 	color=""
 * 	size="small" || "medium"
 * 	label="chip"
 * 	disabled={false || true}
 * />
 * @returns React.ReactElement
 */
function Chip(props: StyledProps) {	
	const _props = { title : '', ...props } as StyledProps;
	return <StyledComponent {..._props} />
}

const SampleProps = {
	id: '',
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