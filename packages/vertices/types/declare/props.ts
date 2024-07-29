/** @Export */
export interface ConvertProps {
	type: 'SolidRectangle' | 'HSection';
	properties: SolidRectangleProps | HSectionProps;
}

/** @Export */
export interface SolidRectangleProps {
	b: number;
	h: number;
}

/** @Export */
export interface HSectionProps {
	h: number;
	tw: number;
	b1: number;
	tf1: number;
	b2: number;
	tf2: number;
	r1: number;
	r2: number;
}