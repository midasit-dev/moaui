import * as CSS from 'csstype';
export type MarginTypes = {
	/**
	 * Set the margin
	 * @defaultValue 0
	 * @example
	 * ```tsx
	 * <MoaTypography margin="0 0 0 0" />
	 * 		// or
	 * <MoaTypography margin="0" />
	 * 		// or
	 * <MoaTypography margin={0} />
	 * ```
	 */
	margin?: string | number;

	/**
	 * Set the marginX
	 * @defaultValue 0
	 * @example
	 * ```tsx
	 * <MoaTypography marginX={0} />
	 * ```
	 */
	marginX?: CSS.StandardLonghandProperties['marginLeft'] & CSS.StandardLonghandProperties['marginRight'] | number;

	/**
	 * Set the marginY
	 * @defaultValue 0
	 * @example
	 * ```tsx
	 * <MoaTypography marginY={0} />
	 * ```
	 */
	marginY?: CSS.StandardLonghandProperties['marginTop'] & CSS.StandardLonghandProperties['marginBottom'] | number;

	/**
	 * Set the marginTop
	 * @defaultValue 0
	 * @example
	 * ```tsx
	 * <MoaTypography marginTop={0} />
	 * ```
	 */
	marginTop?: CSS.StandardLonghandProperties['marginTop'] | number;

	/**
	 * Set the marginBottom
	 * @defaultValue 0
	 * @example
	 * ```tsx
	 * <MoaTypography marginBottom={0} />
	 * ```
	 */
	marginBottom?: CSS.StandardLonghandProperties['marginBottom'] | number;
	
	/**
	 * Set the marginLeft
	 * @defaultValue 0
	 * @example
	 * ```tsx
	 * <MoaTypography marginLeft={0} />
	 * ```
	 */
	marginLeft?: CSS.StandardLonghandProperties['marginLeft'] | number;
	
	/**
	 * Set the marginRight
	 * @defaultValue 0
	 * @example
	 * ```tsx
	 * <MoaTypography marginRight={0} />
	 * ```
	 */
	marginRight?: CSS.StandardLonghandProperties['marginRight'] | number;
}

export const MarginProps = (props: any) => {
	let MarginObject: any = {};
	if (props && props.margin) MarginObject.margin = props.margin;
	if (props && props.marginX) MarginObject.marginLeft = props.marginX;
	if (props && props.marginX) MarginObject.marginRight = props.marginX;
	if (props && props.marginY) MarginObject.marginTop = props.marginY;
	if (props && props.marginY) MarginObject.marginBottom = props.marginY;
	if (props && props.marginTop) MarginObject.marginTop = props.marginTop;
	if (props && props.marginBottom) MarginObject.marginBottom = props.marginBottom;
	if (props && props.marginLeft) MarginObject.marginLeft = props.marginLeft;
	if (props && props.marginRight) MarginObject.marginRight = props.marginRight;
	return MarginObject;
}
