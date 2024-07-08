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
 * UserDefined is a type that is used to define the properties of a shape.
 * @var canvasDim is the dimension of the canvas.
 * @var startCoords is the starting coordinates of the shape.
 */
export interface UserDefined {
	canvasDim: CanvasDimension2D;
	startCoords: StartCoordinate2D;
}

/**
 * PreDefined is a type that is used to define the properties of a shape.
 * @var b is width of the shape.
 * @var h is height of the shape.
 */
export interface UserDefinedBox extends UserDefined {
	b: number;
	h: number;
}

// export interface UserDefinedH extends UserDefined {
// 	r: number;
// }