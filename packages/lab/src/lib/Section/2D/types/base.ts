/**
 * Vertex2D is a type that is used to define the coordinates of a shape.
 * @var x is the x-coordinate of the shape.
 * @var y is the y-coordinate of the shape.
 */
export type Vertex2D = {
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
 * TranslateVertex2D is a type that is used to define the starting coordinates of a shape.
 * @var Vertex2D is the coordinates of the shape.
 */
export type TranslateVertex2D = Vertex2D | [number, number];

/**
 * Canvas is a type that is used to define the properties of a shape.
 * @var background is the background color of the canvas.
 * @var dimension is the dimension of the canvas.
 * @var translateCoords is the starting coordinates of the shape.
 * @var autoScale is the auto scale of the canvas.
 * @var scale is the scale of the canvas.
 * @var rotate is the rotate of the canvas. (in degrees, 0 - 360)
 * @var guideLine is the guide line of the canvas.
 */
export interface Canvas {
	background?: string | null;
	dimension?: CanvasDimension2D;
	translateCoords?: TranslateVertex2D;
	autoScale?: boolean;
	scale?: number;
	rotate?: number;
	guideLine?: boolean;
};

/**
 * Shape is a type that is used to define the properties of a shape.
 * @var fill is the fill color of the shape. (background color)
 * @var stroke is the stroke color of the shape.
 * @var strokeWeight is the stroke weight of the shape.
 */
export interface Shape {
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
	textOffset?: number | null;
}

/**
 * LeaderLine is a type that is used to define the properties of a shape.
 * @var halfLength is the half length of the leader line.
 * @var lineColor is the line color of the leader line.
 * @var lineWeight is the line weight of the leader line.
 * @var text is the text of the leader line.
 * @var textColor is the text color of the leader line.
 * @var textSize is the text size of the leader line.
 */
export interface LeaderLine {
	halfLength?: number;
	lineColor?: string;
	lineWeight?: number;
	text?: string | null;
	textColor?: string;
	textSize?: number;
}

/**
 * SuperProps is a type that is used to define the properties of a section.
 * @var canvas is the canvas of the shape.
 */
export interface SuperProps {
	canvas?: Canvas;
}