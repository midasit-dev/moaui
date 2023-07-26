/**
 * define types
 */
export enum TypographyType {
	header,
	h1,
	body1,
	body2,
	body3,
}
interface TypographyProp {
	type: TypographyType;
	value: string;
}
Typography.defaultProps = {
	type: TypographyType.header,
	value: ""
}

/**
 * main funtion
 */
export function Typography(props: TypographyProp) {
	switch (props.type) {
		case TypographyType.header: return <div className='text-moa-3xl font-moa-primary text-moa-mono-300 dark:text-moa-gray-100'>{props.value}</div>;
		case TypographyType.h1: 		return <div className='text-moa-h1 font-moa-primary text-moa-mono-300 dark:text-moa-gray-100'>{props.value}</div>;
		case TypographyType.body1: 	return <div className='text-moa-body1 font-moa-primary text-moa-mono-300 dark:text-moa-gray-100'>{props.value}</div>;
		case TypographyType.body2: 	return <div className='text-moa-body2 font-moa-primary text-moa-mono-300 dark:text-moa-gray-100'>{props.value}</div>;
		case TypographyType.body3: 	return <div className='text-moa-body3 font-moa-primary text-moa-mono-300 dark:text-moa-gray-100'>{props.value}</div>;
		default: return <></>;
	};
}