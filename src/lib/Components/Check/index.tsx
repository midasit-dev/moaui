import { forwardRef } from "react";
import { toUnionType } from "../../Common/UnionType";
import StyledComponent, { type StyledProps } from "./Styled";

/**
 * moaui Styled Check
 * 
 * @param props - defaultChecked, onChange, required, checked, disabled, name, namePlacement, ariaLabel, indeterminate
 * @example
 * <Check
 * 	defaultChecked={false || true}
 * 	onChange={() => {}}
 * 	required={false || true}
 * 	checked={false || true}
 * 	disabled={false || true}
 * 	name=""
 * 	namePlacement="start" || "end" || "top" || "bottom"
 * 	ariaLabel="CheckBox" 
 * 	indeterminate={false || true}
 * />
 * @returns React.ReactElement
*/
const Check = forwardRef((props: StyledProps, ref: any) => (<StyledComponent {...props} inputRef={ref} />));

Check.defaultProps = {
	disabled: false,
	ariaLabel: "CheckBox",
} as StyledProps;

const SampleProps = {
	defaultChecked: false,
	onChange: () => {},
	required: false,
	disabled: false,
	name: "",
	namePlacement: toUnionType({ values: ["start", "end", "top", "bottom"] }),
	ariaLabel: "CheckBox",
	indeterminate: false,
}

export default Check;

export {
	type StyledProps as CheckProps,
	SampleProps as CheckSample,
}