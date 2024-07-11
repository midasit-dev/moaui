import { Dimension2D, Canvas, StartCoordinate2D, Coord2D, CanvasDimension2D, Shape } from "@lab/Sketch/2D/types";

/**
 * convert top-left x-coordinate to bottom-right x-coordinate
 * @param x top-left x-coordinate
 * @param canvasW width of the canvas
 * @returns bottom-right x-coordinate
 */
export const toX = (x: number, canvasW: number) => x - (canvasW / 2);

/**
 * convert top-left y-coordinate to bottom-right y-coordinate
 * @param y top-left y-coordinate
 * @param canvasH height of the canvas
 * @returns bottom-right y-coordinate
 */
export const toY = (y: number, canvasH: number) => (canvasH / 2) - y;

/**
 * convert canvas types of dimension to Dimension2D
 * @param canvasDim canvas types of dimension
 * @returns { width: number, height: number }
 */
export const toDimension2D = (dim: CanvasDimension2D): Dimension2D => {
	if (dim instanceof Array) {
		return { width: dim[0], height: dim[1] };
	}
	return { width: dim.width, height: dim.height };
}

/**
 * convert start coordinate types of 2D to Coord2D
 * @param startCoords start coordinate types of 2D
 * @returns { x: number, y: number }
 */
export const toCoord2D = (startCoords: StartCoordinate2D): Coord2D => {
	if (startCoords instanceof Array) {
		return { x: startCoords[0], y: startCoords[1] };
	}
	return startCoords;
}

/**
 * default value of canvas
 * @param width width of canvas
 * @param height height of canvas
 * @returns 
 */
export const defaultCanvasValue = (width: number = 100, height: number = 100): Required<Canvas> => {
	return {
		background: 'white',
		dimension: { width, height }
	};
}

export const defaultShapeValue = (x: number = 0, y: number = 0): Required<Shape> => {
	return {
		startCoords: { x, y },
		fill: '#00bcd4', //에메랄드 그린
		stroke: '#004346', //에메랄드 그린 어둡게
		strokeWeight: 1
	}
}