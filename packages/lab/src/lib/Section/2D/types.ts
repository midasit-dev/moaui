/**
 * Coord2D is a type that is used to define the coordinates of a shape.
 * @var x is the x-coordinate of the shape.
 * @var y is the y-coordinate of the shape.
 */
export type Coord2D = {
	x: number;
	y: number;
};

/**
 * Dimension2D is a type that is used to define the dimension of a shape.
 * @var width is the width of the canvas.
 * @var height is the height of the canvas.
 */
export type Dimension2D = {
	width: number;
	height: number;
}

/**
 * CanvasDimension2D is a type that is used to define the dimension of a shape.
 * @var Dimension2D is the dimension of the canvas.
 */
export type CanvasDimension2D = Dimension2D | [number, number];

/**
 * StartCoordinate2D is a type that is used to define the starting coordinates of a shape.
 * @var Coord2D is the coordinates of the shape.
 */
export type StartCoordinate2D = Coord2D | [number, number];

/**
 * Canvas is a type that is used to define the properties of a shape.
 * @var padding is the padding of the canvas. (default: 0, 1 -> 8px)
 * @var background is the background color of the canvas.
 * @var dimension is the dimension of the canvas.
 */
export interface Canvas {
	background?: string | null;
	dimension?: CanvasDimension2D;
};

/**
 * Shape is a type that is used to define the properties of a shape.
 * @var startCoords is the starting coordinates of the shape.
 * @var fill is the fill color of the shape. (background color)
 * @var stroke is the stroke color of the shape.
 * @var strokeWeight is the stroke weight of the shape.
 */
export interface Shape {
	startCoords?: StartCoordinate2D;
	fill?: string;
	stroke?: string;
	strokeWeight?: number;
}

/**
 * DimensionLine is a type that is used to define the properties of a shape. 치수선!
 * @var offset is the offset of the dimension line.
 * @var lineExtension is the line extension of the dimension line.
 * @var lineExtensionAngle is the line extension angle of the dimension line.
 * @var lineColor is the line color of the dimension line.
 * @var lineWeight is the line weight of the dimension line.
 * @var text is the text of the dimension line.
 * @var textColor is the text color of the dimension line.
 * @var textSize is the text size of the dimension line.
 * @var textOffset is the text offset of the dimension line.
 */
export interface DimensionLine {
	offset?: number;
	lineExtension?: number;
	lineExtensionAngle?: number;
	lineColor?: string;
	lineWeight?: number;
	text?: string | null;
	textColor?: string;
	textSize?: number;
	textOffset?: number;
}

/**
 * PreDefined is a type that is used to define the properties of a shape.
 * @var dimensionLine is the dimension line of the SolidRectangle. (b, h)
 * @var shape is the shape of the SolidRectangle.
 * @var b is width of the shape.
 * @var h is height of the shape.
 */
export interface SolidRectangleProps {
	canvas?: Canvas;
	shape?: Shape;
	dimensionLine?: {
		b?: DimensionLine;
		h?: DimensionLine;
	};

	b: number;
	h: number;
}

/**
 * HSectionProps is a type that is used to define the properties of a shape.
 * @var dimensionLine is the dimension line of the HSection.
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
export interface HSectionProps {
	canvas?: Canvas;
	shape?: Shape;
	dimensionLine?: {
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