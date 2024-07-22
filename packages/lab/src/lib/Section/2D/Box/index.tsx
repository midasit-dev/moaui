import React from 'react';
import { ReactP5Wrapper, P5CanvasInstance } from "@p5-wrapper/react";
import {
  type UserDefinedBox,
  type Dimension2D,
  type Coord2D,
  reverseY,
  toDimension2D,
  toCoord2D,
  defaultCanvasValue,
  defaultShapeValue,
  drawDimLine,
  ensureDimLine,
} from "@lablib/Section/2D";

/* 
 * Shape of a Box (for 2D Sketch)
 * @param props UserDefinedBox
 */
const Box = (props: UserDefinedBox) => {
	const {
		b,
		h,
		canvas = defaultCanvasValue(b, h),
		shape = defaultShapeValue(),
		dimensionLine,
	} = props;

	// from canvas prop
	const canvasBackground: string = canvas.background ?? defaultCanvasValue(b, h).background;
	const canvasWH: Dimension2D = toDimension2D(canvas.dimension ?? defaultCanvasValue(b, h).dimension);

	// from shape prop
	const shapeSt: Coord2D = toCoord2D(shape.startCoords ?? defaultShapeValue().startCoords);
	const shapeFill = shape.fill ?? defaultShapeValue().fill;
	const shapeStroke = shape.stroke ?? defaultShapeValue().stroke;
	const shapeStrokeWeight = shape.strokeWeight ?? defaultShapeValue().strokeWeight;

	// from dimension line prop
	const dimB = ensureDimLine(dimensionLine?.bottom);
	const dimR = ensureDimLine(dimensionLine?.right);
	const dimT = ensureDimLine(dimensionLine?.top);
	const dimL = ensureDimLine(dimensionLine?.left);

	/** Vertexes of a box
	 * lb: left bottom
	 * rb: right bottom
	 * rt: right top
	 * lt: left top
	 */
	const lb: Coord2D = { x: shapeSt.x, 		y: reverseY(shapeSt.y, canvasWH.height)};
	const rb: Coord2D = { x: shapeSt.x + b, y: reverseY(shapeSt.y, canvasWH.height)};
	const rt: Coord2D = { x: shapeSt.x + b, y: reverseY(shapeSt.y + h, canvasWH.height)};
	const lt: Coord2D = { x: shapeSt.x, 		y: reverseY(shapeSt.y + h, canvasWH.height)};

	/** Center of a box
	 * cb: center bottom
	 * ct: center top
	 * cl: center left
	 * cr: center right
	 */
	const cb = { x: shapeSt.x + b / 2, 	y: reverseY(shapeSt.y, canvasWH.height)};
	const ct = { x: shapeSt.x + b / 2, 	y: reverseY(shapeSt.y + h, canvasWH.height)};
	const cl = { x: shapeSt.x, 					y: reverseY(shapeSt.y + h / 2, canvasWH.height)};
	const cr = { x: shapeSt.x + b, 			y: reverseY(shapeSt.y + h / 2, canvasWH.height)};

	return (
		<ReactP5Wrapper 
			sketch={(p5: P5CanvasInstance) => {
				p5.setup = () => p5.createCanvas(canvasWH.width, canvasWH.height);
				p5.draw = () => {
					//도형의 기본 배경을 설정
					p5.background(canvasBackground);
		
					//도형의 기본 스타일을 설정
					p5.push();
					p5.beginShape();
					p5.fill(shapeFill);
					p5.stroke(shapeStroke);
					p5.strokeWeight(shapeStrokeWeight);
					p5.vertex(lb.x, lb.y);
					p5.vertex(rb.x, rb.y);
					p5.vertex(rt.x, rt.y);
					p5.vertex(lt.x, lt.y);
					p5.endShape(p5.CLOSE);
					p5.pop();

					// 치수선 설정 - Bottom -> Right -> Top -> Left
					drawDimLine(p5, 'bottom', dimB, lb, rb, cb, String(b));
					drawDimLine(p5, 'right', 	dimR, rb, rt, cr, String(h));
					drawDimLine(p5, 'top', 		dimT, rt, lt, ct, String(b));
					drawDimLine(p5, 'left', 	dimL, lt, lb, cl, String(h));
				}
			}}
		/>
	);
}

export default Box;
