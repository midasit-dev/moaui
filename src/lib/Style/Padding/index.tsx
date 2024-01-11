import * as CSS from 'csstype';

export type PaddingTypes = {
	/**
	 * Set the padding
	 * @defaultValue 0
	 * @example
	 * ```tsx
	 * <MoaTypography padding="0 0 0 0" />
	 * 		// or
	 * <MoaTypography padding="0" />
	 * 		// or
	 * <MoaTypography padding={0} />
	 * ```
	 */
	padding?: string | number;

	/**
	 * Set the paddingX
	 * @defaultValue 0
	 * @example
	 * ```tsx
	 * <MoaTypography paddingX={0} />
	 * ```
	 */
	paddingX?: CSS.StandardLonghandProperties['paddingLeft'] & CSS.StandardLonghandProperties['paddingRight'] | number;

	/**
	 * Set the paddingY
	 * @defaultValue 0
	 * @example
	 * ```tsx
	 * <MoaTypography paddingY={0} />
	 * ```
	 */
	paddingY?: CSS.StandardLonghandProperties['paddingTop'] & CSS.StandardLonghandProperties['paddingBottom'] | number;

	/**
	 * Set the paddingTop
	 * @defaultValue 0
	 * @example
	 * ```tsx
	 * <MoaTypography paddingTop={0} />
	 * ```
	 */
	paddingTop?: CSS.StandardLonghandProperties['paddingTop'] | number;

	/**
	 * Set the paddingBottom
	 * @defaultValue 0
	 * @example
	 * ```tsx
	 * <MoaTypography paddingBottom={0} />
	 * ```
	 */
	paddingBottom?: CSS.StandardLonghandProperties['paddingBottom'] | number;

	/**
	 * Set the paddingLeft
	 * @defaultValue 0
	 * @example
	 * ```tsx
	 * <MoaTypography paddingLeft={0} />
	 * ```
	 */
	paddingLeft?: CSS.StandardLonghandProperties['paddingLeft'] | number;

	/**
	 * Set the paddingRight
	 * @defaultValue 0
	 * @example
	 * ```tsx
	 * <MoaTypography paddingRight={0} />
	 * ```
	 */
	paddingRight?: CSS.StandardLonghandProperties['paddingRight'] | number;
}

export const hasPaddingProps = (props: any) => {
	const isUndefined = (value: any) => value === undefined;

	return (
		!isUndefined(props.padding) ||
		!isUndefined(props.paddingX) ||
		!isUndefined(props.paddingY) ||
		!isUndefined(props.paddingTop) ||
		!isUndefined(props.paddingBottom) ||
		!isUndefined(props.paddingLeft) ||
		!isUndefined(props.paddingRight)
	);
}

export const PaddingProps = (props: any) => {
	let paddingObject: any = {};

	if (props && props.padding) paddingObject.padding = props.padding;
	if (props && props.paddingX) paddingObject.paddingX = props.paddingX;
	if (props && props.paddingY) paddingObject.paddingY = props.paddingY;
	if (props && props.paddingTop) paddingObject.paddingTop = props.paddingTop;
	if (props && props.paddingBottom) paddingObject.paddingBottom = props.paddingBottom;
	if (props && props.paddingLeft) paddingObject.paddingLeft = props.paddingLeft;
	if (props && props.paddingRight) paddingObject.paddingRight = props.paddingRight;

	return paddingObject;
}
