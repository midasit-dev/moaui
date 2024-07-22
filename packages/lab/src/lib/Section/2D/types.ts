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
 * @var background is the background color of the canvas.
 * @var dimension is the dimension of the canvas.
 */
export interface Canvas {
	background?: string;
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
 * UserDefined is a type that is used to define the properties of a shape.
 * @var canvasDim is the dimension of the canvas.
 * @var startCoords is the starting coordinates of the shape.
 */
export interface UserDefined {
	canvas?: Canvas;
	shape?: Shape;
	dimensionLine?: DimensionLine;
}

export interface DimensionLineBox {
	bottom?: DimensionLine;
	right?: DimensionLine;
	top?: DimensionLine;
	left?: DimensionLine;
}

/**
 * PreDefined is a type that is used to define the properties of a shape.
 * @var dimensionLine is the dimension line of the box. (top, left, right, bottom)
 * @var b is width of the shape.
 * @var h is height of the shape.
 */
export interface UserDefinedBox extends Omit<UserDefined, 'dimensionLine'> {
	dimensionLine?: DimensionLineBox;

	b: number;
	h: number;
}
