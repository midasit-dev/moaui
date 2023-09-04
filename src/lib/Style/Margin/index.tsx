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
	margin?: CSS.PropertiesFallback<number | string>;

	/**
	 * Set the marginX
	 * @defaultValue 0
	 * @example
	 * ```tsx
	 * <MoaTypography marginX={0} />
	 * ```
	 */
	marginX?: CSS.StandardLonghandProperties['marginLeft'] & CSS.StandardLonghandProperties['marginRight'];

	/**
	 * Set the marginY
	 * @defaultValue 0
	 * @example
	 * ```tsx
	 * <MoaTypography marginY={0} />
	 * ```
	 */
	marginY?: CSS.StandardLonghandProperties['marginTop'] & CSS.StandardLonghandProperties['marginBottom'];

	/**
	 * Set the marginTop
	 * @defaultValue 0
	 * @example
	 * ```tsx
	 * <MoaTypography marginTop={0} />
	 * ```
	 */
	marginTop?: CSS.StandardLonghandProperties['marginTop'];

	/**
	 * Set the marginBottom
	 * @defaultValue 0
	 * @example
	 * ```tsx
	 * <MoaTypography marginBottom={0} />
	 * ```
	 */
	marginBottom?: CSS.StandardLonghandProperties['marginBottom'];
	
	/**
	 * Set the marginLeft
	 * @defaultValue 0
	 * @example
	 * ```tsx
	 * <MoaTypography marginLeft={0} />
	 * ```
	 */
	marginLeft?: CSS.StandardLonghandProperties['marginLeft'];
	
	/**
	 * Set the marginRight
	 * @defaultValue 0
	 * @example
	 * ```tsx
	 * <MoaTypography marginRight={0} />
	 * ```
	 */
	marginRight?: CSS.StandardLonghandProperties['marginRight'];
}

export const MarginProps = (props: any) => ({
	margin: props?.margin || 0,
	marginX: props?.marginX || 0,
	marginY: props?.marginY || 0,
	marginTop: props?.marginTop || 0,
	marginBottom: props?.marginBottom || 0,
	marginLeft: props?.marginLeft || 0,
	marginRight: props?.marginRight || 0,
});