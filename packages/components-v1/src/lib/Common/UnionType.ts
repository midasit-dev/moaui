export interface CustomUnionType {
	isUnion: boolean;
	values: Array<any>;
	defaultValue: any;
}

export const toUnionType = (props: Partial<CustomUnionType>): CustomUnionType => {
	const { values, defaultValue } = props;
	return {
		isUnion: true,
		values: values || [],
		defaultValue: defaultValue || values?.[0] || null,
	};
}