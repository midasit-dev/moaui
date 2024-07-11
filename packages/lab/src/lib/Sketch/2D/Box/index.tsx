import * as React from 'react';
import { ReactP5Wrapper, P5CanvasInstance } from "@p5-wrapper/react";
import { type UserDefinedBox, type Dimension2D, type Coord2D } from "@lab/Sketch/2D/types";
import { toX, toY, toDimension2D, toCoord2D, defaultCanvasValue, defaultShapeValue } from "@lab/Sketch/2D/utils";

/**
 * Shape of a Box (for 2D Sketch)
 * @param props UserDefinedBox
 * @default canvas: { background: 'white', dimension: [b, h] }
 * @default startCoords: [0, 0]
 * @example
 * //Simple Box (b, h)
 * <Box b={100} h={100} />
 * 
 * //All Options
 * <Box
 * 	canvas={{
 * 		background: 'white',
 * 		dimension: [300, 300]
 * 	}}
 * 	shape={{
 * 		startCoords: [100, 100],
 * 		fill: 'yellow',
 * 		stroke: 'black',
 * 		strokeWeight: 2
 * 	}}
 * 	b={100} h={100}
 * />
 * @returns React.Component
 */
const Box = (props: UserDefinedBox) => {
	const {
		b,
		h,
		canvas = defaultCanvasValue(b, h),
		shape = defaultShapeValue(),
	} = props;

	const canvasBackground: string = canvas.background ?? defaultCanvasValue(b, h).background;
	const canvasWH: Dimension2D = toDimension2D(canvas.dimension ?? defaultCanvasValue(b, h).dimension);
	const shapeSt: Coord2D = toCoord2D(shape.startCoords ?? defaultShapeValue().startCoords);
	const shapeFill = shape.fill ?? defaultShapeValue().fill;
	const shapeStroke = shape.stroke ?? defaultShapeValue().stroke;
	const shapeStrokeWeight = shape.strokeWeight ?? defaultShapeValue().strokeWeight;

	return (
		<ReactP5Wrapper 
			sketch={(p5: P5CanvasInstance) => {
				p5.setup = () => p5.createCanvas(canvasWH.width, canvasWH.height, p5.WEBGL);
				p5.draw = () => {
					p5.background(canvasBackground);
		
					p5.beginShape();
					p5.fill(shapeFill);
					p5.stroke(shapeStroke);
					p5.strokeWeight(shapeStrokeWeight);
					p5.vertex(toX(shapeSt.x + 0, canvasWH.width), 	toY(shapeSt.y + 0, canvasWH.height));
					p5.vertex(toX(shapeSt.x + b, canvasWH.width), 	toY(shapeSt.y + 0, canvasWH.height));
					p5.vertex(toX(shapeSt.x + b, canvasWH.width), 	toY(shapeSt.y + h, canvasWH.height));
					p5.vertex(toX(shapeSt.x + 0, canvasWH.width), 	toY(shapeSt.y + h, canvasWH.height));
					p5.endShape(p5.CLOSE);
				}
			}}
		/>
	);
}

export default Box;