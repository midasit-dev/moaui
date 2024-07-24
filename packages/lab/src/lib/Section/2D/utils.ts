import { P5CanvasInstance } from "@p5-wrapper/react";
import { 
	Dimension2D, 
	Canvas, 
	StartCoordinate2D, 
	CanvasDimension2D, 
	Shape, 
	DimensionLine,
	Coord2D,
} from "@lablib/Section/2D/types/base";

/**
 * convert top-left x-coordinate to bottom-right x-coordinate
 * @param x top-left x-coordinate
 * @param canvasW width of the canvas
 * @returns bottom-right x-coordinate
 */
export const toX = (x: number, canvasW: number) => x - (canvasW / 2);

/**
 * convert top-left y-coordinate to bottom-left y-coordinate
 * @param y top-left y-coordinate
 * @param canvasH height of the canvas
 * @returns bottom-right y-coordinate
 */
export const reverseY = (y: number, canvasH: number) => {
	return canvasH - y;
}

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
		background: null,
		dimension: { width, height },
	};
}

export const defaultShapeValue = (x: number = 0, y: number = 0): Required<Shape> => {
	return {
		startCoords: { x, y },
		fill: 'white', 
		stroke: 'black', 
		strokeWeight: 1
	}
}

export const defaultDimensionLineValue = (): Required<DimensionLine> => {
	return {
		offset: 20,
		lineExtension: 5,
		lineExtensionAngle: 5,
		lineColor: 'black',
		lineWeight: 1,
		text: null,
		textColor: 'black',
		textSize: 14,
		textOffset: 15,
	};
}

export const ensureDimLine = (dimLine: DimensionLine | undefined): DimensionLine | undefined => {
	if (!dimLine) return undefined;

	return {
		...defaultDimensionLineValue(),
		...dimLine,
	}
}

export const drawDimLine = (
	p5: P5CanvasInstance, 
	position: 'bottom' | 'right' | 'top' | 'left',
	dimLine: DimensionLine | undefined, 
	start: Coord2D, 
	end: Coord2D,
	center: Coord2D,
	text: string,
) => {
	if (!dimLine) return;

	// 치수선 그리기
	p5.push();
	p5.stroke(dimLine.lineColor!);
	p5.strokeWeight(dimLine.lineWeight!);

	const sx = start.x;
	const sy = start.y;
	const ex = end.x;
	const ey = end.y;
	const off = dimLine.offset!;
	const et = dimLine.lineExtension!;
	const ag = dimLine.lineExtensionAngle!;

	//치수선 그리기
	if (position === 'bottom' || position === 'top') {
		const syoff = position === 'bottom' ? sy + off : sy - off;
		const eyoff = position === 'bottom' ? ey + off : ey - off;
		p5.line(sx, syoff, ex, eyoff); //치수선
		p5.line(sx + ag, syoff - et, sx - ag, syoff + et); //치수 좌측 확장선
		p5.line(ex + ag, eyoff - et, ex - ag, eyoff + et); //치수 우측 확장선
	} else if (position === 'right' || position === 'left') {
		const sxoff = position === 'right' ? sx + off : sx - off;
		const exoff = position === 'right' ? ex + off : ex - off;
		p5.line(sxoff, sy, exoff, ey); //치수선
		p5.line(sxoff - et, sy + ag, sxoff + et, sy - ag); //치수 상단 확장선
		p5.line(exoff - et, ey + ag, exoff + et, ey - ag); //치수 하단 확장선
	} else {
		//어김없이 예외를!
		throw new Error(`Invalid position: ${position}`);
	}

	p5.pop();

	// 치수선 텍스트 그리기
	p5.push();
	p5.fill(dimLine.textColor!);
	p5.textSize(dimLine.textSize!);
	p5.textAlign(p5.CENTER, p5.CENTER);

	const cx = center.x;
	const cy = center.y;
	const txt = dimLine.text ?? text;
	const txtOff = dimLine.textOffset!;

	if (position === 'bottom' || position === 'top') {
		const cyoff = position === 'bottom' ? cy + txtOff * 2 : cy - txtOff * 2;
		p5.translate(cx, cyoff);
		p5.text(txt, 0, 0);
	} else if (position === 'right' || position === 'left') {
		const cxoff = position === 'right' ? cx + txtOff * 2 : cx - txtOff * 2;
		p5.translate(cxoff, cy);
		p5.rotate(p5.HALF_PI);
		p5.text(txt, 0, 0);
	}
	
	p5.pop();
}
