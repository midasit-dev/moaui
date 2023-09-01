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
	padding?: CSS.PropertiesFallback<number | string>;

	/**
	 * Set the paddingX
	 * @defaultValue 0
	 * @example
	 * ```tsx
	 * <MoaTypography paddingX={0} />
	 * ```
	 */
	paddingX?: CSS.StandardLonghandProperties['paddingLeft'] & CSS.StandardLonghandProperties['paddingRight'];

	/**
	 * Set the paddingY
	 * @defaultValue 0
	 * @example
	 * ```tsx
	 * <MoaTypography paddingY={0} />
	 * ```
	 */
	paddingY?: CSS.StandardLonghandProperties['paddingTop'] & CSS.StandardLonghandProperties['paddingBottom'];

	/**
	 * Set the paddingTop
	 * @defaultValue 0
	 * @example
	 * ```tsx
	 * <MoaTypography paddingTop={0} />
	 * ```
	 */
	paddingTop?: CSS.StandardLonghandProperties['paddingTop'];

	/**
	 * Set the paddingBottom
	 * @defaultValue 0
	 * @example
	 * ```tsx
	 * <MoaTypography paddingBottom={0} />
	 * ```
	 */
	paddingBottom?: CSS.StandardLonghandProperties['paddingBottom'];

	/**
	 * Set the paddingLeft
	 * @defaultValue 0
	 * @example
	 * ```tsx
	 * <MoaTypography paddingLeft={0} />
	 * ```
	 */
	paddingLeft?: CSS.StandardLonghandProperties['paddingLeft'];

	/**
	 * Set the paddingRight
	 * @defaultValue 0
	 * @example
	 * ```tsx
	 * <MoaTypography paddingRight={0} />
	 * ```
	 */
	paddingRight?: CSS.StandardLonghandProperties['paddingRight'];
}

export const PaddingProps = (props: any) => ({
	padding: props?.padding || 0,
	paddingX: props?.paddingX || 0,
	paddingY: props?.paddingY || 0,
	paddingTop: props?.paddingTop || 0,
	paddingBottom: props?.paddingBottom || 0,
	paddingLeft: props?.paddingLeft || 0,
	paddingRight: props?.paddingRight || 0,
});