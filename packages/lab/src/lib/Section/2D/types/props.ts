import { SuperProps, Canvas, Shape, DimensionLine } from '@lablib/Section/2D/types/base';

export interface FlexProps {
	canvas?: 					Canvas;
	solidRectangle?: 	Omit<SolidRectangleProps, 'canvas'>;
	hSection?: 				Omit<HSectionProps, 'canvas'>;
}

/**
 * PreDefined is a type that is used to define the properties of a shape.
 * @var referLine is the reference line of the shape.
 * @var shape is the shape of the SolidRectangle.
 * @var b is width of the shape.
 * @var h is height of the shape.
 */
export interface SolidRectangleProps extends SuperProps {
	shape?: Shape;
	referLine?: {
		b?: DimensionLine;
		h?: DimensionLine;
	};

	b: number;
	h: number;
}

/**
 * HSectionProps is a type that is used to define the properties of a shape.
 * @var referLine is the reference line of the shape.
 * @var shape is the shape of the HSection.
 * @var h is the height of the shape.
 * @var tw is the width of the web.
 * @var b1 is the width of the top flange.
 * @var tf1 is the thickness of the top flange.
 * @var b2 is the width of the bottom flange.
 * @var tf2 is the thickness of the bottom flange.
 * @var r1 is the radius of the top flange.
 * @var r2 is the radius of the bottom flange.
 */
export interface HSectionProps extends SuperProps {
	shape?: Shape;
	referLine?: {
		h?: DimensionLine;
		tw?: DimensionLine;
		b1?: DimensionLine;
		tf1?: DimensionLine;
		b2?: DimensionLine;
		tf2?: DimensionLine;
		r1?: DimensionLine;
		r2?: DimensionLine;
	};

	h: number;
	tw: number;
	b1: number;
	tf1: number;
	b2: number;
	tf2: number;
	r1: number;
	r2: number;
}