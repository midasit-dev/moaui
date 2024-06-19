import StyledComponent, { type StyledProps } from "./Styled";
import { toUnionType } from "../../Common/UnionType";

/**
 * 
 * @param props - color, onChange
 * @example
 * <ColorPicker
 * 	id="ColorPickerId"
 * 	color="{ r: 255, g: 255, b: 255 }"
 * 	onChange={(color) => {}}
 *  showRGB={true || false}
 *  direction="row" || "column"
 * />
 * @returns 
 */

const ColorPicker = (props: StyledProps) => {
	const _props = { id: "ColorPickerId", color: { r: 255, g: 255, b: 255 }, onChange: () => {}, showRGB: true, direction: "column", ...props } as StyledProps;
	return <StyledComponent {..._props} />;
};

const SampleProps = {
  color: { r: 255, g: 255, b: 255 },
  onChange: () => {},
  showRGB: true,
  direction: toUnionType({ values: ["column", "row"] }),
};

export default ColorPicker;

export {
	type StyledProps as ColorPickerProps,
	SampleProps as ColorPickerSample,
}