import { Dimension2D, Coord2D, } from "@lablib/Section/2D/types/base";
import { SolidRectangleProps } from "@lablib/Section/2D/types/props";
import { half, defaultCanvasValue, defaultShapeValue, toCoord2D, ensureDimLine, toDimension2D, drawDimLine, findMinMaxCoord, getScaleFactor } from "@lablib/Section/2D/utils";
import { P5CanvasInstance } from "@p5-wrapper/react";

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
		const canvasWH: Dimension2D = toDimension2D(canvas?.dimension ?? defaultCanvas.dimension);
		const canvasTranslateCoord: Coord2D = toCoord2D(canvas?.translateCoords ?? defaultCanvas.translateCoords);
		const canvasAutoScale = canvas?.autoScale ?? defaultCanvas.autoScale;
		const canvasScale = canvas?.scale ?? defaultCanvas.scale;
		const canvasRotate = canvas?.rotate ?? defaultCanvas.rotate;
		const canvasGuideLine = canvas?.guideLine ?? defaultCanvas.guideLine;
	
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
			canvasBackground, canvasWH, canvasTranslateCoord, canvasAutoScale, canvasScale, canvasRotate, canvasGuideLine,
			shapeFill, shapeStroke, shapeStrokeWeight,
			dimB, dimH,
			lb, rb, rt, lt,
			cb, cl,
		}
}

// 단면을 스케치한다.
export const drawSolidRectangle = (p5: P5CanvasInstance, input: any) => {
	if (!p5 || !input) return;

	const {
		canvasAutoScale, canvasScale, canvasRotate,
		b, h,
		shapeFill, shapeStroke, shapeStrokeWeight,
		dimB, dimH,
		lb, rb, rt, lt,
		cb, cl,
	} = input;

	p5.push(); //draw push-pop (1)
	//자동 스케일링을 설정합니다.
	if (canvasAutoScale) {
		autoScaling(p5, input);
	} else {
		if (canvasScale) p5.scale(canvasScale);
	}
	//회전을 설정합니다.
	if (canvasRotate) p5.rotate(p5.radians(canvasRotate));

	{
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

	p5.pop(); // draw push-pop (1)
}

export const autoScaling = (
	p5: P5CanvasInstance, 
	extractedProps: any
) => {
	const {
		canvasWH,
		lb, rb, rt, lt, cb, cl, 
		dimB, dimH,
	} = extractedProps;

	const boff1 = dimB.offset + dimB.textSize;
	const boff2 = dimB.textOffset + dimB.textSize;
	const hoff1 = dimH.offset + dimH.textSize;
	const hoff2 = dimH.textOffset + dimH.textSize;

	const maxOffset = Math.max(boff1, boff2, hoff1, hoff2);

	console.log(maxOffset);
	
	const p = maxOffset + 20; // padding
	const verties = [
		{ x: lb.x - p, 	y: lb.y + p},
		{ x: rb.x + p, 	y: lb.y + p},
		{ x: rt.x + p, 	y: rt.y - p},
		{ x: lt.x - p, 	y: lt.y - p},
		{ x: cb.x, 			y: cb.y + p },
		{ x: cl.x - p, 	y: cl.y }
	];

	const { minX, minY, maxX, maxY } = findMinMaxCoord(verties);
	const scaleFactor = getScaleFactor(canvasWH, minX, minY, maxX, maxY);

	p5.scale(scaleFactor);
}
