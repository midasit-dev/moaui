import { Dimension2D, type CanvasDimension2D, StartCoordinate2D, Coord2D } from "@lib/Sketch/2D/types";

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
export const toDimension2D = (canvasDim: CanvasDimension2D): Dimension2D => {
	if (canvasDim instanceof Array) {
		return { width: canvasDim[0], height: canvasDim[1] };
	}
	return canvasDim;
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