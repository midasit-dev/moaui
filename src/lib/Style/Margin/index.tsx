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

export const hasMarginProps = (props: any) => {
	const isUndefined = (value: any) => value === undefined;

	return (
		!isUndefined(props.margin) ||
		!isUndefined(props.marginX) ||
		!isUndefined(props.marginY) ||
		!isUndefined(props.marginTop) ||
		!isUndefined(props.marginBottom) ||
		!isUndefined(props.marginLeft) ||
		!isUndefined(props.marginRight)
	);
}

export const MarginProps = (props: any) => {
	let MarginObject: any = {};
	if (props && props.margin       !== undefined) MarginObject.margin = props.margin;
	if (props && props.marginX      !== undefined) MarginObject.marginLeft = props.marginX;
	if (props && props.marginX      !== undefined) MarginObject.marginRight = props.marginX;
	if (props && props.marginY      !== undefined) MarginObject.marginTop = props.marginY;
	if (props && props.marginY      !== undefined) MarginObject.marginBottom = props.marginY;
	if (props && props.marginTop    !== undefined) MarginObject.marginTop = props.marginTop;
	if (props && props.marginBottom !== undefined) MarginObject.marginBottom = props.marginBottom;
	if (props && props.marginLeft   !== undefined) MarginObject.marginLeft = props.marginLeft;
	if (props && props.marginRight  !== undefined) MarginObject.marginRight = props.marginRight;
	return MarginObject;
}
