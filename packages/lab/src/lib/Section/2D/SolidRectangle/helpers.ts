import { Dimension2D, Coord2D, } from "@lablib/Section/2D/types/base";
import { SolidRectangleProps } from "@lablib/Section/2D/types/props";
import { half, defaultCanvasValue, defaultShapeValue, toCoord2D, ensureDimLine, toDimension2D, drawDimLine, findMinMaxCoord, getScaleFactor } from "@lablib/Section/2D/utils";
import { P5CanvasInstance } from "@p5-wrapper/react";

// 기본 Padding 값
const padding = 120;

// Properties를 추출한다.
export const calcPropsSolidRectangle = (props: SolidRectangleProps) => {
	const {
		b,
		h,
		canvas,
		shape,
		referLine,
	} = props;

		// from canvas prop
		const defaultCanvas = defaultCanvasValue(b, h);
		const canvasBackground: string | null = canvas?.background ?? defaultCanvas.background;
		const tempCvsWH = toDimension2D(canvas?.dimension);
		const tempCvsWHD = toDimension2D(defaultCanvas.dimension);
		const canvasWH: Dimension2D = {
			width: tempCvsWH && tempCvsWH.width ? tempCvsWH.width : tempCvsWHD!.width + padding,
			height: tempCvsWH && tempCvsWH.height ? tempCvsWH.height : tempCvsWHD!.height + padding,
		};
		const canvasTranslateCoord: Coord2D = toCoord2D(canvas?.translateCoords ?? defaultCanvas.translateCoords);
		const canvasAutoScale = canvas?.autoScale ?? defaultCanvas.autoScale;
		const canvasScale = canvas?.scale ?? defaultCanvas.scale;
	
		// from shape prop
		const _shape = { ...defaultShapeValue(), ...shape, };
		const shapeFill = _shape.fill;
		const shapeStroke = _shape.stroke;
		const shapeStrokeWeight = _shape.strokeWeight;
	
		// from dimension line prop
		const dimB = ensureDimLine(referLine?.b);
		const dimH = ensureDimLine(referLine?.h);
	
		/** Vertexes of a SolidRectangle
		 * lb: left bottom
		 * rb: right bottom
		 * rt: right top
		 * lt: left top
		 */
		const lb: Coord2D = { x: -half(b), 		y: half(h)};
		const rb: Coord2D = { x: half(b), 		y: half(h)};
		const rt: Coord2D = { x: half(b), 		y: -half(h)};
		const lt: Coord2D = { x: -half(b), 		y: -half(h)};
	
		/** Center of a SolidRectangle
		 * cb: center bottom
		 * cl: center left
		 */
		const cb = { x: 0, 				y: half(h)};
		const cl = { x: -half(b), y: 0};

		return {
			b, h,
			canvasBackground, canvasWH, canvasTranslateCoord, canvasAutoScale, canvasScale,
			shapeFill, shapeStroke, shapeStrokeWeight,
			dimB, dimH,
			lb, rb, rt, lt,
			cb, cl,
		}
}

// 단면을 스케치한다.
export const drawSolidRectangle = (p5: P5CanvasInstance, extractedProps: any) => {
	if (!p5 || !extractedProps) return;

	const {
		b, h,
		shapeFill, shapeStroke, shapeStrokeWeight,
		dimB, dimH,
		lb, rb, rt, lt,
		cb, cl,
	} = extractedProps;

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
	drawDimLine(p5, 'left', 	dimH, lt, lb, cl, String(h));
}

export const autoScaling = (
	p5: P5CanvasInstance, 
	canvasWH: Dimension2D, 
	extractedProps: any
) => {
	const { 
		lb, rb, rt, lt, cb, cl, 
		dimB, dimH,
	} = extractedProps;

	const corFactor = 8; //보정계수
	const maxOffset = corFactor * Math.max(dimB.offset, dimH.offset);

	const { minX, minY, maxX, maxY } = 
		findMinMaxCoord([
			lb, rb, rt, lt,
			//cb (+offset)
			{ x: cb.x - maxOffset, y: cb.y },
			//cl (+offset)
			{ x: cl.x, y: cl.y + maxOffset },
		]);
	const scaleFactor = getScaleFactor(canvasWH, minX, minY, maxX, maxY);

	p5.scale(scaleFactor);
}
