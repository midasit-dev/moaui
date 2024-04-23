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

const ColorPicker = (props: StyledProps) => (<StyledComponent {...props} />);

ColorPicker.defaultProps = {
	id: "ColorPickerId",
	color: { r: 255, g: 255, b: 255 },
	onChange: ()=>{},
	showRGB: true,
	direction: "column",
} as StyledProps;

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