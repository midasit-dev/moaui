import React from "react";
import StyledComponent, { type StyledProps } from "./Styled";
import { Icon } from "../../";
import { toUnionType } from "../../Common/UnionType";

/**
 * moaui Styled Icon Button
 *
 * @param props - children, disabled, iconName, color, width, height, onClick, transparent, transparentColor, border
 * @example
 * <IconButton
 * 	disabled={false}
 * 	iconName="Apple"
 * 	color="normal"
 * 	width="auto"
 * 	height="auto"
 * 	onClick={() => {}}
 * 	transparent={false}
 * 	transparentColor=""
 * 	border={true || false}
 * >
 * 	<Icon iconName="Apple" />
 * </IconButton>
 * @returns JSX.Element
 */

const IconButton = (props: StyledProps) => {
  const _props = {
    onClick: () => {},
    border: false,
    transparent: false,
    padding: "0.625rem",
    ...props,
  };
  return <StyledComponent {..._props} />;
};

const SampleProps = {
  disabled: false,
  color: toUnionType({ values: ["normal", "negative"] }),
  iconName: "Apple",
  width: "auto",
  height: "auto",
  onClick: () => {},
  transparent: false,
  transparentColor: "",
  border: true,
};

export default IconButton;

export { type StyledProps as IconButtonProps, SampleProps as IconButtonSample };
