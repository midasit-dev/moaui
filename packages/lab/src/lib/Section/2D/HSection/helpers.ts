import { P5CanvasInstance } from "@p5-wrapper/react"
import { HSectionProps } from "@lablib/Section/2D/types/props";
import { Dimension2D, Coord2D } from "@lablib/Section/2D/types/base";
import { defaultCanvasValue, defaultShapeValue, toCoord2D, ensureDimLine, reverseY, toDimension2D, drawDimLine, ensureLeaderLine, drawLeaderLine } from "@lablib/Section/2D/utils";

// Properties를 추출한다.
export const calcPropsHSection = (props: HSectionProps) => {
	const {
		h, tw, b1, tf1, r1, b2, tf2, r2,
		canvas,
		shape,
		referLine,
	} = props;

	// from canvas prop
	const _canvas = { ...defaultCanvasValue(b1 > b2 ? b1 : b2, h), ...canvas, };
	const canvasBackground: string | null = _canvas.background;
	const canvasWH: Dimension2D = toDimension2D(_canvas.dimension);

	// from shape prop
	const _shape = { ...defaultShapeValue(), ...shape, };
	const shapeSt: Coord2D = toCoord2D(_shape.startCoords);
	const shapeFill = _shape.fill;
	const shapeStroke = _shape.stroke;
	const shapeStrokeWeight = _shape.strokeWeight;

	// from dimension line prop
	const dimH 	= ensureDimLine(referLine?.h);
	const dimTW = ensureDimLine(referLine?.tw);
	const dimB1 = ensureDimLine(referLine?.b1);
	const dimTF1 = ensureDimLine(referLine?.tf1);
	const dimB2 = ensureDimLine(referLine?.b2);
	const dimTF2 = ensureDimLine(referLine?.tf2);
	const leaderR1 = ensureLeaderLine(referLine?.r1);
	const leaderR2 = ensureLeaderLine(referLine?.r2);

	const flangeW1 = (b1 - tw) * 0.5; // Top flange Wing width (1/2)
	const webH = h - tf1 - tf2;				// Web height
	const flangeW2 = (b2 - tw) * 0.5; // Bottom flange Wing width (1/2)

	// 상부 플랜지와 하부 플랜지의 길이가 다를 경우,
	// x좌표 오프셋 적용이 필요함.
	let widthOffset = b1 !== b2 ? Math.abs(b1 - b2) * 0.5 : 0;
	if (b1 !== b2) widthOffset *= b1 > b2 ? 1 : -1;

	// 시작은 좌측 하단 부터!
	const lbb: Coord2D = { x: shapeSt.x, 													y: reverseY(shapeSt.y, 										canvasWH.height) };
	const rbb: Coord2D = { x: shapeSt.x + b2, 										y: reverseY(shapeSt.y, 										canvasWH.height) };
	const rbt: Coord2D = { x: shapeSt.x + b2,											y: reverseY(shapeSt.y + tf2, 							canvasWH.height) };
	const crb: Coord2D = { x: shapeSt.x + b2 - flangeW2, 					y: reverseY(shapeSt.y + tf2, 							canvasWH.height) };
	const crt: Coord2D = { x: shapeSt.x + b2 - flangeW2, 					y: reverseY(shapeSt.y + tf2 + webH, 			canvasWH.height) };
	const rtb: Coord2D = { x: shapeSt.x + b1 - widthOffset, 			y: reverseY(shapeSt.y + tf2 + webH, 			canvasWH.height) };
	const rtt: Coord2D = { x: shapeSt.x + b1 - widthOffset, 			y: reverseY(shapeSt.y + tf2 + webH + tf1, canvasWH.height) };
	const ltt: Coord2D = { x: shapeSt.x - widthOffset, 						y: reverseY(shapeSt.y + tf2 + webH + tf1, canvasWH.height) };
	const ltb: Coord2D = { x: shapeSt.x - widthOffset, 						y: reverseY(shapeSt.y + tf2 + webH, 			canvasWH.height) };
	const clt: Coord2D = { x: shapeSt.x + flangeW1 - widthOffset, y: reverseY(shapeSt.y + tf2 + webH, 			canvasWH.height) };
	const clb: Coord2D = { x: shapeSt.x + flangeW1 - widthOffset, y: reverseY(shapeSt.y + tf2, 							canvasWH.height) };
	const lbt: Coord2D = { x: shapeSt.x, 													y: reverseY(shapeSt.y + tf2, 							canvasWH.height) };

	// r 영역 좌표: 중심점, 호의 시작점, 호의 끝점
	// flange
	const r2_rb_st: Coord2D = { x: rbt.x, 									y: rbt.y + r2 };
	const r2_rb_c1: Coord2D = { x: r2_rb_st.x, 							y: r2_rb_st.y - (r2 * 0.5) };
	const r2_rb_ed: Coord2D = { x: rbt.x - r2, 							y: rbt.y };
	const r2_rb_c2: Coord2D = { x: r2_rb_ed.x + (r2 * 0.5), y: r2_rb_ed.y };

	// web
	const r1_rb_st: Coord2D = { x: crb.x + r1, 							y: crb.y };
	const r1_rb_c1: Coord2D = { x: r1_rb_st.x - (r1 * 0.5), y: r1_rb_st.y };
	const r1_rb_ed: Coord2D = { x: crb.x, 									y: crb.y - r1 };
	const r1_rb_c2: Coord2D = { x: r1_rb_ed.x, 							y: r1_rb_ed.y + (r1 * 0.5) };

	// web
	const r1_rt_st: Coord2D = { x: crt.x, 									y: crt.y + r1 };
	const r1_rt_c1: Coord2D = { x: r1_rt_st.x, 							y: r1_rt_st.y - (r1 * 0.5) };
	const r1_rt_ed: Coord2D = { x: crt.x + r1, 							y: crt.y };
	const r1_rt_c2: Coord2D = { x: r1_rt_ed.x - (r1 * 0.5), y: r1_rt_ed.y };

	// flange
	const r2_rt_st: Coord2D = { x: rtb.x - r2, 							y: rtb.y };
	const r2_rt_c1: Coord2D = { x: r2_rt_st.x + (r2 * 0.5), y: r2_rt_st.y };
	const r2_rt_ed: Coord2D = { x: rtb.x, 									y: rtb.y - r2 };
	const r2_rt_c2: Coord2D = { x: r2_rt_ed.x, 							y: r2_rt_ed.y + (r2 * 0.5) };

	// flange
	const r2_lt_st: Coord2D = { x: ltb.x, 									y: ltb.y - r2 };
	const r2_lt_c1: Coord2D = { x: r2_lt_st.x, 							y: r2_lt_st.y + (r2 * 0.5) };
	const r2_lt_ed: Coord2D = { x: ltb.x + r2, 							y: ltb.y };
	const r2_lt_c2: Coord2D = { x: r2_lt_ed.x - (r2 * 0.5), y: r2_lt_ed.y };

	// web
	const r1_lt_st: Coord2D = { x: clt.x - r1, 							y: clt.y };
	const r1_lt_c1: Coord2D = { x: r1_lt_st.x + (r1 * 0.5), y: r1_lt_st.y };
	const r1_lt_ed: Coord2D = { x: clt.x, 									y: clt.y + r1 };
	const r1_lt_c2: Coord2D = { x: r1_lt_ed.x, 							y: r1_lt_ed.y - (r1 * 0.5) };

	// web
	const r1_lb_st: Coord2D = { x: clb.x, 									y: clb.y - r1 };
	const r1_lb_c1: Coord2D = { x: r1_lb_st.x, 							y: r1_lb_st.y + (r1 * 0.5) };
	const r1_lb_ed: Coord2D = { x: clb.x - r1, 							y: clb.y };
	const r1_lb_c2: Coord2D = { x: r1_lb_ed.x + (r1 * 0.5), y: r1_lb_ed.y };

	// flange
	const r2_lb_st: Coord2D = { x: lbt.x + r2, 							y: lbt.y };
	const r2_lb_c1: Coord2D = { x: r2_lb_st.x - (r2 * 0.5), y: r2_lb_st.y };
	const r2_lb_ed: Coord2D = { x: lbt.x, 									y: lbt.y + r2 };
	const r2_lb_c2: Coord2D = { x: r2_lb_ed.x, 							y: r2_lb_ed.y - (r2 * 0.5) };

	// 치수선에 필요한 값
	const leftX: number = Math.min(lbb.x, ltt.x);

	// for h
	const topL: Coord2D	= { x: leftX, y: ltt.y };
	const botL: Coord2D	= { x: leftX, y: lbb.y };
	const sideC: Coord2D = { x: leftX, y: lbb.y - (h * 0.5) };
	// for tw
	const twL: Coord2D = { x: clt.x, y: clt.y + (clb.y - clt.y) * 0.5 };
	const twR: Coord2D = { x: crt.x, y: crt.y + (crb.y - crt.y) * 0.5 };
	const twC: Coord2D = { x: clt.x + (tw * 0.5), y: crt.y + (crb.y - crt.y) * 0.5 };
	// for b1
	const topC: Coord2D = { x: rtt.x - (b1 * 0.5), y: rtt.y };
	// for tf1
	const rttbc: Coord2D = { x: rtt.x, y: rtt.y - (rtt.y - rtb.y) * 0.5 };
	// for b2
	const botC: Coord2D 		= { x: rbb.x - (b2 * 0.5), y: rbb.y };
	// for tf2
	const rbtbc: Coord2D = { x: rbt.x, y: rbt.y + (rbb.y - rbt.y) * 0.5 };
	// for r1
	const innerRC: Coord2D = { x: r1_lt_st.x + (r1 * 0.5), y: r1_lt_st.y };
	// for r2
	const outerRC: Coord2D = { x: r2_rt_st.x + (r2 * 0.5), y: r2_rt_st.y };

	return {
		h, tw, b1, tf1, r1, b2, tf2, r2,
		canvasBackground, canvasWH,
		shapeFill, shapeStroke, shapeStrokeWeight,
		dimH, dimTW, dimB1, dimTF1, dimB2, dimTF2, leaderR1, leaderR2,
		lbb, rbb, rbt, crb, crt, rtb, rtt, ltt, ltb, clt, clb, lbt,
		r2_rb_st, r2_rb_c1, r2_rb_ed, r2_rb_c2,
		r1_rb_st, r1_rb_c1, r1_rb_ed, r1_rb_c2,
		r1_rt_st, r1_rt_c1, r1_rt_ed, r1_rt_c2,
		r2_rt_st, r2_rt_c1, r2_rt_ed, r2_rt_c2,
		r2_lt_st, r2_lt_c1, r2_lt_ed, r2_lt_c2,
		r1_lt_st, r1_lt_c1, r1_lt_ed, r1_lt_c2,
		r1_lb_st, r1_lb_c1, r1_lb_ed, r1_lb_c2,
		r2_lb_st, r2_lb_c1, r2_lb_ed, r2_lb_c2,
		topL, botL, sideC,
		twL, twR, twC,
		topC, rttbc, botC, rbtbc, innerRC, outerRC,
	}
}

// 단면을 스케치한다.
export const drawHSection = (p5: P5CanvasInstance, extractedProps: any) => {
	const {
		h, tw, b1, tf1, r1, b2, tf2, r2,
		shapeFill, shapeStroke, shapeStrokeWeight,
		dimH, dimTW, dimB1, dimTF1, dimB2, dimTF2, leaderR1, leaderR2,
		lbb, rbb, rbt, rtb, rtt, ltt, clt,
		r2_rb_st, r2_rb_c1, r2_rb_ed, r2_rb_c2,
		r1_rb_st, r1_rb_c1, r1_rb_ed, r1_rb_c2,
		r1_rt_st, r1_rt_c1, r1_rt_ed, r1_rt_c2,
		r2_rt_st, r2_rt_c1, r2_rt_ed, r2_rt_c2,
		r2_lt_st, r2_lt_c1, r2_lt_ed, r2_lt_c2,
		r1_lt_st, r1_lt_c1, r1_lt_ed, r1_lt_c2,
		r1_lb_st, r1_lb_c1, r1_lb_ed, r1_lb_c2,
		r2_lb_st, r2_lb_c1, r2_lb_ed, r2_lb_c2,
		topL, botL, sideC,
		twL, twR, twC,
		topC, rttbc, botC, rbtbc, innerRC, outerRC,
	} = extractedProps;

	//도형의 기본 스타일을 설정
	p5.push();
	p5.beginShape();
	p5.fill(shapeFill);
	p5.stroke(shapeStroke);
	p5.strokeWeight(shapeStrokeWeight);

	//Bottom Flange
	p5.vertex(lbb.x, lbb.y);
	p5.vertex(rbb.x, rbb.y);
	//Bottom Flange (오른쪽 아래 호)
	p5.vertex(r2_rb_st.x, r2_rb_st.y);
	p5.bezierVertex(r2_rb_c1.x, r2_rb_c1.y, r2_rb_c2.x, r2_rb_c2.y, r2_rb_ed.x, r2_rb_ed.y);
	//Web (오른쪽 아래 호)
	p5.vertex(r1_rb_st.x, r1_rb_st.y);
	p5.bezierVertex(r1_rb_c1.x, r1_rb_c1.y, r1_rb_c2.x, r1_rb_c2.y, r1_rb_ed.x, r1_rb_ed.y);
	//Web (오른쪽 위 호)
	p5.vertex(r1_rt_st.x, r1_rt_st.y);
	p5.bezierVertex(r1_rt_c1.x, r1_rt_c1.y, r1_rt_c2.x, r1_rt_c2.y, r1_rt_ed.x, r1_rt_ed.y);
	//Top Flange (오른쪽 위 호)
	p5.vertex(r2_rt_st.x, r2_rt_st.y);
	p5.bezierVertex(r2_rt_c1.x, r2_rt_c1.y, r2_rt_c2.x, r2_rt_c2.y, r2_rt_ed.x, r2_rt_ed.y);
	//Top Flange
	p5.vertex(rtt.x, rtt.y);
	p5.vertex(ltt.x, ltt.y);
	//Top Flange (왼쪽 위 호)
	p5.vertex(r2_lt_st.x, r2_lt_st.y);
	p5.bezierVertex(r2_lt_c1.x, r2_lt_c1.y, r2_lt_c2.x, r2_lt_c2.y, r2_lt_ed.x, r2_lt_ed.y);
	//Web (왼쪽 위 호)
	p5.vertex(r1_lt_st.x, r1_lt_st.y);
	p5.bezierVertex(r1_lt_c1.x, r1_lt_c1.y, r1_lt_c2.x, r1_lt_c2.y, r1_lt_ed.x, r1_lt_ed.y);
	//Web (왼쪽 아래 호)
	p5.vertex(r1_lb_st.x, r1_lb_st.y);
	p5.bezierVertex(r1_lb_c1.x, r1_lb_c1.y, r1_lb_c2.x, r1_lb_c2.y, r1_lb_ed.x, r1_lb_ed.y);
	//Bottom Flange (왼쪽 아래 호)
	p5.vertex(r2_lb_st.x, r2_lb_st.y);
	p5.bezierVertex(r2_lb_c1.x, r2_lb_c1.y, r2_lb_c2.x, r2_lb_c2.y, r2_lb_ed.x, r2_lb_ed.y);

	p5.endShape(p5.CLOSE);
	p5.pop();

	// 치수선 설정 (h)
	drawDimLine(p5, 'left', dimH, topL, botL, sideC, String(h));
	// 치수선 설정 (tw)
	drawDimLine(p5, 'bottom', dimTW, twL, twR, twC, String(tw));
	// 치수선 설정 (b1)
	drawDimLine(p5, 'top', dimB1, ltt, rtt, topC, String(b1));
	// 치수선 설정 (tf1)
	drawDimLine(p5, 'right', dimTF1, rtt, rtb, rttbc, String(tf1));
	// 치수선 설정 (b2)
	drawDimLine(p5, 'bottom', dimB2, lbb, rbb, botC, String(b2));
	// 치수선 설정 (tf2)
	drawDimLine(p5, 'right', dimTF2, rbt, rbb, rbtbc, String(tf2));
	// 치수선 설정 (r1)
	const pointR1 = { x: clt.x - (0.5 * r1), y: clt.y + (0.5 * r1) };
	drawLeaderLine(p5, 'left-bottom', leaderR1, pointR1, String(r1));
	// 치수선 설정 (r2)
	drawLeaderLine(p5, 'right-top', leaderR2, rbt, String(r2));
}