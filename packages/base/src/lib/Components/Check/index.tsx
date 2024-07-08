import { forwardRef } from "react";
import { toUnionType } from "../../Common/UnionType";
import StyledComponent, { type StyledProps } from "./Styled";

/**
 * moaui Styled Check
 * 
 * @param props - defaultChecked, onChange, required, checked, disabled, name, namePlacement, ariaLabel, indeterminate
 * @example
 * <Check
 * 	id=""
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
const Check = forwardRef((props: StyledProps, ref: any) => {
	const _props = { disabled: false, ariaLabel: "CheckBox", ...props } as StyledProps;
  return <StyledComponent {..._props} inputRef={ref} />;
});

const SampleProps = {
	id: '',
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