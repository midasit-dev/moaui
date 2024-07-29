import { toUnionType } from "../../Common/UnionType";
import StyledComponent, { type StyledProps } from "./Styled";

/**
 * moaui Styled Typography
 * @param props - children, variant, color, width, height, size, verTop, verCenter, verBottom, horLeft, horCenter, horRight, center
 * @example
 * <Typography
 * 	id=""
 * 	variant={"body1" || "body2" || "body3" || "h1"}
 * 	color={'primary' | 'secondary' | 'third' | 'disable' | string}
 * 	width={string | number}
 * 	height={string | number}
 * 	size={"small" | "medium" | "large"}
 * 	singleLine={true || false}
 * 	verTop={true || false}
 * 	verCenter={true || false}
 * 	verBottom={true || false}
 * 	horLeft={true || false}
 * 	horCenter={true || false}
 * 	horRight={true || false}
 * 	center={true || false}
 * >
 * 	{children}
 * </Typography>
 * @returns TypographyComponent
 */
const Typography = (props: StyledProps) => {
  const _props = {
    children: "",
    variant: "body1",
    color: "primary",
    ...props,
  } as StyledProps;
  return <StyledComponent {..._props}>{_props.children}</StyledComponent>;
};

const SampleProps = {
  children: "Typography",
  variant: toUnionType({ values: ["h1", "body1", "body2", "body3"] }),
  color: toUnionType({
    values: ["primary", "secondary", "tertiary", "quaternary"],
  }),
  width: "auto",
  height: "auto",
  size: toUnionType({ values: ["small", "medium", "large"] }),
  verTop: false,
  verCenter: false,
  verBottom: false,
  horLeft: false,
  horCenter: false,
  horRight: false,
  center: false,
};

export default Typography;

export { type StyledProps as TypographyProps, SampleProps as TypographySample };
