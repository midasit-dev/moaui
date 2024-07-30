import { P5CanvasInstance } from "@p5-wrapper/react";
import { 
	Dimension2D, 
	Canvas, 
	CanvasDimension2D, 
	Shape, 
	DimensionLine,
	Vertex2D,
	LeaderLine,
} from "@lablib/Section/2D/types/base";

/**
 * convert number to half of the number
 * @param n value
 * @returns 
 */
export const half = (n: number) => 0.5 *  n;

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
 * convert start coordinate types of 2D to Vertex2D
 * @param startCoords start coordinate types of 2D
 * @returns { x: number, y: number }
 */
export const toVertex2D = (startCoords: Vertex2D | [number, number]): Vertex2D => {
	if (startCoords instanceof Array) {
		return { x: startCoords[0], y: startCoords[1] };
	}
	return startCoords;
}

/**
 * default value of canvas
 * @param background width of the canvas
 * @param dimension height of the canvas
 * @param padding padding of the canvas
 * @returns 
 */
export const defaultCanvasValue = (width: number = 100, height: number = 100): Required<Canvas> => {
	return {
		background: '#f3f5f7',
		dimension: { width, height },
		translateCoords: { x: 0, y: 0 },
		autoScale: true,
		scale: 1,
		rotate: 0,
		guideLine: false,
	};
}

export const defaultShapeValue = (): Required<Shape> => {
	return {
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
		textOffset: null,
	};
}

export const ensureDimLine = (dimLine: DimensionLine | undefined): Required<DimensionLine> | undefined => {
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
	start: Vertex2D, 
	end: Vertex2D,
	center: Vertex2D,
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
	const txtOff = dimLine.textOffset;
	const txtSize = dimLine.textSize!;

	if (position === 'bottom' || position === 'top') {
		const cyoff = 
			position === 'bottom' ? 
				cy + (txtOff ?? off + txtSize) : cy - (txtOff ?? off) - txtSize;

		p5.translate(cx, cyoff);
		p5.text(txt, 0, 0);
	} else if (position === 'right' || position === 'left') {
		const cxoff = 
			position === 'right' ? 
				cx + (txtOff ?? off + txtSize) : cx - (txtOff ?? off) - txtSize;
		p5.translate(cxoff, cy);
		p5.rotate(p5.HALF_PI);
		p5.text(txt, 0, 0);
	}
	
	p5.pop();
}

export const defaultLeaderLineValue = (): Required<LeaderLine> => {
	return {
		halfLength: 20,
		lineColor: 'black',
		lineWeight: 1,
		text: null,
		textColor: 'black',
		textSize: 14,
	};
}

export const ensureLeaderLine = (leaderLine: LeaderLine | undefined): LeaderLine | undefined => {
	if (!leaderLine) return undefined;

	return {
		...defaultLeaderLineValue(),
		...leaderLine,
	}
}

export const drawLeaderLine = (
	p5: P5CanvasInstance, 
	leadDirection: 'left-bottom' | 'left-top' | 'right-bottom' | 'right-top',
	leaderLine: LeaderLine | undefined, 
	point: Vertex2D,
	text: string,
) => {
	if (!leaderLine) return;

	// 리더선 그리기
	p5.push();
	p5.stroke(leaderLine.lineColor!);
	p5.strokeWeight(leaderLine.lineWeight!);

	const st: Vertex2D = { x: point.x, y: point.y }; //시작점 좌표
	const d = leaderLine.halfLength!;	//리더선의 반 길이
	const x1 = d * Math.cos(Math.PI / 4); //x 평행이동을 위한 값
	const y1 = d * Math.sin(Math.PI / 4); //y 평행이동을 위한 값
	let cc: Vertex2D = { x: -1, y: -1 }; //평행이동한 중심 좌표
	let ed: Vertex2D = { x: -1, y: -1 }; //끝점 좌표

	if (leadDirection === 'left-bottom') {
		cc = { x: st.x - x1, y: st.y + y1 };
		ed = { x: cc.x - d, y: cc.y };
	} else if (leadDirection === 'left-top') {
		cc = { x: st.x - x1, y: st.y - y1 };
		ed = { x: cc.x - d, y: cc.y };
	} else if (leadDirection === 'right-bottom') {
		cc = { x: st.x + x1, y: st.y + y1 };
		ed = { x: cc.x + d, y: cc.y };
	} else if (leadDirection === 'right-top') {
		cc = { x: st.x + x1, y: st.y - y1 };
		ed = { x: cc.x + d, y: cc.y };
	} else {
		//어김없이 예외를!
		throw new Error(`Invalid leadDirection: ${leadDirection}`);
	}

	p5.line(st.x, st.y, cc.x, cc.y); //대각선
	p5.line(cc.x, cc.y, ed.x, ed.y); //수평선

	p5.pop();

	p5.push();
	p5.fill(leaderLine.textColor!);
	p5.textSize(leaderLine.textSize!);

	if (leadDirection === 'left-bottom' || leadDirection === 'left-top') {
		p5.textAlign(p5.RIGHT, p5.CENTER);
		p5.text(text, ed.x - (0.5 * d), ed.y);
	} else if (leadDirection === 'right-bottom' || leadDirection === 'right-top') {
		p5.textAlign(p5.LEFT, p5.CENTER);
		p5.text(text, ed.x + (0.5 * d), ed.y);
	} else {
		//어김없이 예외를!
		throw new Error(`Invalid leadDirection: ${leadDirection}`);
	}

	p5.pop();
}

export const findMinMaxCoord = (coords: Vertex2D[]) => {
	const xs = coords.map(c => c.x);
	const ys = coords.map(c => c.y);

	const minX = Math.min(...xs);
	const minY = Math.min(...ys);
	const maxX = Math.max(...xs);
	const maxY = Math.max(...ys);

	return { minX, minY, maxX, maxY };
}

export const getScaleFactor = (
	canvasWH: Dimension2D, 
	minX: number, 
	minY: number, 
	maxX: number, 
	maxY: number
) => {
	const { width, height } = canvasWH;
	const scaleX = width / (maxX - minX);
	const scaleY = height / (maxY - minY);

	return Math.min(scaleX, scaleY);
}

export const drawGuideLine = (p5: P5CanvasInstance, canvasWH: Dimension2D) => {
	const { width: w, height: h } = canvasWH;

	p5.push();
	p5.stroke(255, 0, 0, 64);
	p5.strokeWeight(1);
	p5.drawingContext.setLineDash([5, 5]);
	p5.line(-half(w), 0, half(w), 0);
	p5.line(0, -half(h), 0, half(h));
	p5.line(-half(w), -half(h), half(w), half(h));
	p5.line(-half(w), -half(h), half(w), half(h));
	p5.line(-half(w), half(h), half(w), -half(h));
	p5.drawingContext.setLineDash([]);
	p5.pop();
}