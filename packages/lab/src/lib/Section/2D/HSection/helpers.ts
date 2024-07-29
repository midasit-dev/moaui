import { P5CanvasInstance } from "@p5-wrapper/react"
import { HSectionProps } from "@lablib/Section/2D/types/props";
import { Dimension2D, Coord2D } from "@lablib/Section/2D/types/base";
import { half, defaultCanvasValue, defaultShapeValue, toCoord2D, ensureDimLine, toDimension2D, drawDimLine, ensureLeaderLine, drawLeaderLine, findMinMaxCoord, getScaleFactor } from "@lablib/Section/2D/utils";

// Properties를 추출한다.
export const calcPropsHSection = (props: HSectionProps) => {
	const {
		h, tw, b1, tf1, r1, b2, tf2, r2,
		canvas,
		shape,
		referLine,
	} = props;

	// from canvas prop
	const defaultCanvas = defaultCanvasValue(b1 > b2 ? b1 : b2, h);
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

	// 중앙점에서 시작!
	const lbb: Coord2D = { x: -half(b2), 						y: half(h) };
	const rbb: Coord2D = { x: half(b2), 						y: half(h) };
	const rbt: Coord2D = { x: half(b2), 						y: half(h) - tf2 };
	const crb: Coord2D = { x: half(b2) - flangeW2, 	y: half(h) - tf2 };
	const crt: Coord2D = { x: half(b2) - flangeW2, 	y: half(h) - tf2 - webH };
	const rtb: Coord2D = { x: half(b1), 						y: half(h) - tf2 - webH };
	const rtt: Coord2D = { x: half(b1), 						y: half(h) - tf2 - webH - tf1 };
	const ltt: Coord2D = { x: -half(b1), 						y: half(h) - tf2 - webH - tf1 };
	const ltb: Coord2D = { x: -half(b1), 						y: half(h) - tf2 - webH };
	const clt: Coord2D = { x: -half(b1) + flangeW1, y: half(h) - tf2 - webH };
	const clb: Coord2D = { x: -half(b1) + flangeW1, y: half(h) - tf2 };
	const lbt: Coord2D = { x: -half(b2), 						y: half(h) - tf2 };

	// r 영역 좌표: 중심점, 호의 시작점, 호의 끝점 (순서는 st -> c1 -> c2 -> ed)
	// flange
	const r2_rbt_st: Coord2D = { x: rbt.x, 										y: rbt.y + r2 };
	const r2_rbt_c1: Coord2D = { x: r2_rbt_st.x, 							y: r2_rbt_st.y - (r2 * 0.5) };
	const r2_rbt_ed: Coord2D = { x: rbt.x - r2, 							y: rbt.y };
	const r2_rbt_c2: Coord2D = { x: r2_rbt_ed.x + (r2 * 0.5), y: r2_rbt_ed.y };

	// web
	const r1_crb_st: Coord2D = { x: crb.x + r1, 							y: crb.y };
	const r1_crb_c1: Coord2D = { x: r1_crb_st.x - (r1 * 0.5), y: r1_crb_st.y };
	const r1_crb_ed: Coord2D = { x: crb.x, 										y: crb.y - r1 };
	const r1_crb_c2: Coord2D = { x: r1_crb_ed.x, 							y: r1_crb_ed.y + (r1 * 0.5) };

	// web
	const r1_crt_st: Coord2D = { x: crt.x, 										y: crt.y + r1 };
	const r1_crt_c1: Coord2D = { x: r1_crt_st.x, 							y: r1_crt_st.y - (r1 * 0.5) };
	const r1_crt_ed: Coord2D = { x: crt.x + r1, 							y: crt.y };
	const r1_crt_c2: Coord2D = { x: r1_crt_ed.x - (r1 * 0.5), y: r1_crt_ed.y };

	// flange
	const r2_rtb_st: Coord2D = { x: rtb.x - r2, 							y: rtb.y };
	const r2_rtb_c1: Coord2D = { x: r2_rtb_st.x + (r2 * 0.5), y: r2_rtb_st.y };
	const r2_rtb_ed: Coord2D = { x: rtb.x, 										y: rtb.y - r2 };
	const r2_rtb_c2: Coord2D = { x: r2_rtb_ed.x, 							y: r2_rtb_ed.y + (r2 * 0.5) };

	// flange
	const r2_ltb_st: Coord2D = { x: ltb.x, 										y: ltb.y - r2 };
	const r2_ltb_c1: Coord2D = { x: r2_ltb_st.x, 							y: r2_ltb_st.y + (r2 * 0.5) };
	const r2_ltb_ed: Coord2D = { x: ltb.x + r2, 							y: ltb.y };
	const r2_ltb_c2: Coord2D = { x: r2_ltb_ed.x - (r2 * 0.5), y: r2_ltb_ed.y };

	// web
	const r1_clt_st: Coord2D = { x: clt.x - r1, 							y: clt.y };
	const r1_clt_c1: Coord2D = { x: r1_clt_st.x + (r1 * 0.5), y: r1_clt_st.y };
	const r1_clt_ed: Coord2D = { x: clt.x, 										y: clt.y + r1 };
	const r1_clt_c2: Coord2D = { x: r1_clt_ed.x, 							y: r1_clt_ed.y - (r1 * 0.5) };

	// web
	const r1_clb_st: Coord2D = { x: clb.x, 										y: clb.y - r1 };
	const r1_clb_c1: Coord2D = { x: r1_clb_st.x, 							y: r1_clb_st.y + (r1 * 0.5) };
	const r1_clb_ed: Coord2D = { x: clb.x - r1, 							y: clb.y };
	const r1_clb_c2: Coord2D = { x: r1_clb_ed.x + (r1 * 0.5), y: r1_clb_ed.y };

	// flange
	const r2_lbt_st: Coord2D = { x: lbt.x + r2, 							y: lbt.y };
	const r2_lbt_c1: Coord2D = { x: r2_lbt_st.x - (r2 * 0.5), y: r2_lbt_st.y };
	const r2_lbt_ed: Coord2D = { x: lbt.x, 										y: lbt.y + r2 };
	const r2_lbt_c2: Coord2D = { x: r2_lbt_ed.x, 							y: r2_lbt_ed.y - (r2 * 0.5) };

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
	const innerRC: Coord2D = { x: r1_clt_st.x + (r1 * 0.5), y: r1_clt_st.y };
	// for r2
	const outerRC: Coord2D = { x: r2_rtb_st.x + (r2 * 0.5), y: r2_rtb_st.y };

	return {
		h, tw, b1, tf1, r1, b2, tf2, r2,
		canvasBackground, canvasWH, canvasTranslateCoord, canvasAutoScale, canvasScale, canvasRotate, canvasGuideLine,
		shapeFill, shapeStroke, shapeStrokeWeight,
		dimH, dimTW, dimB1, dimTF1, dimB2, dimTF2, leaderR1, leaderR2,
		lbb, rbb, rbt, crb, crt, rtb, rtt, ltt, ltb, clt, clb, lbt,
		r2_rbt_st, r2_rbt_c1, r2_rbt_ed, r2_rbt_c2,
		r1_crb_st, r1_crb_c1, r1_crb_ed, r1_crb_c2,
		r1_crt_st, r1_crt_c1, r1_crt_ed, r1_crt_c2,
		r2_rtb_st, r2_rtb_c1, r2_rtb_ed, r2_rtb_c2,
		r2_ltb_st, r2_ltb_c1, r2_ltb_ed, r2_ltb_c2,
		r1_clt_st, r1_clt_c1, r1_clt_ed, r1_clt_c2,
		r1_clb_st, r1_clb_c1, r1_clb_ed, r1_clb_c2,
		r2_lbt_st, r2_lbt_c1, r2_lbt_ed, r2_lbt_c2,
		topL, botL, sideC,
		twL, twR, twC,
		topC, rttbc, botC, rbtbc, innerRC, outerRC,
	}
}

// 단면을 스케치한다.
export const drawHSection = (p5: P5CanvasInstance, input: ReturnType<typeof calcPropsHSection>) => {
	if (!p5 || !input) return;

	const {
		canvasAutoScale, canvasScale, canvasRotate,
		h, tw, b1, tf1, r1, b2, tf2, r2,
		shapeFill, shapeStroke, shapeStrokeWeight,
		dimH, dimTW, dimB1, dimTF1, dimB2, dimTF2, leaderR1, leaderR2,
		lbb, rbb, rbt, rtb, rtt, ltt, clt,
		r2_rbt_st, r2_rbt_c1, r2_rbt_ed, r2_rbt_c2,
		r1_crb_st, r1_crb_c1, r1_crb_ed, r1_crb_c2,
		r1_crt_st, r1_crt_c1, r1_crt_ed, r1_crt_c2,
		r2_rtb_st, r2_rtb_c1, r2_rtb_ed, r2_rtb_c2,
		r2_ltb_st, r2_ltb_c1, r2_ltb_ed, r2_ltb_c2,
		r1_clt_st, r1_clt_c1, r1_clt_ed, r1_clt_c2,
		r1_clb_st, r1_clb_c1, r1_clb_ed, r1_clb_c2,
		r2_lbt_st, r2_lbt_c1, r2_lbt_ed, r2_lbt_c2,
		topL, botL, sideC,
		twL, twR, twC,
		topC, rttbc, botC, rbtbc,
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

	/* eslint-disable-next-line no-lone-blocks */
	{
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
		p5.vertex(r2_rbt_st.x, r2_rbt_st.y);
		p5.bezierVertex(r2_rbt_c1.x, r2_rbt_c1.y, r2_rbt_c2.x, r2_rbt_c2.y, r2_rbt_ed.x, r2_rbt_ed.y);
		//Web (오른쪽 아래 호)
		p5.vertex(r1_crb_st.x, r1_crb_st.y);
		p5.bezierVertex(r1_crb_c1.x, r1_crb_c1.y, r1_crb_c2.x, r1_crb_c2.y, r1_crb_ed.x, r1_crb_ed.y);
		//Web (오른쪽 위 호)
		p5.vertex(r1_crt_st.x, r1_crt_st.y);
		p5.bezierVertex(r1_crt_c1.x, r1_crt_c1.y, r1_crt_c2.x, r1_crt_c2.y, r1_crt_ed.x, r1_crt_ed.y);
		//Top Flange (오른쪽 위 호)
		p5.vertex(r2_rtb_st.x, r2_rtb_st.y);
		p5.bezierVertex(r2_rtb_c1.x, r2_rtb_c1.y, r2_rtb_c2.x, r2_rtb_c2.y, r2_rtb_ed.x, r2_rtb_ed.y);
		//Top Flange
		p5.vertex(rtt.x, rtt.y);
		p5.vertex(ltt.x, ltt.y);
		//Top Flange (왼쪽 위 호)
		p5.vertex(r2_ltb_st.x, r2_ltb_st.y);
		p5.bezierVertex(r2_ltb_c1.x, r2_ltb_c1.y, r2_ltb_c2.x, r2_ltb_c2.y, r2_ltb_ed.x, r2_ltb_ed.y);
		//Web (왼쪽 위 호)
		p5.vertex(r1_clt_st.x, r1_clt_st.y);
		p5.bezierVertex(r1_clt_c1.x, r1_clt_c1.y, r1_clt_c2.x, r1_clt_c2.y, r1_clt_ed.x, r1_clt_ed.y);
		//Web (왼쪽 아래 호)
		p5.vertex(r1_clb_st.x, r1_clb_st.y);
		p5.bezierVertex(r1_clb_c1.x, r1_clb_c1.y, r1_clb_c2.x, r1_clb_c2.y, r1_clb_ed.x, r1_clb_ed.y);
		//Bottom Flange (왼쪽 아래 호)
		p5.vertex(r2_lbt_st.x, r2_lbt_st.y);
		p5.bezierVertex(r2_lbt_c1.x, r2_lbt_c1.y, r2_lbt_c2.x, r2_lbt_c2.y, r2_lbt_ed.x, r2_lbt_ed.y);

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
		drawLeaderLine(p5, 'left-bottom', leaderR2, rtb, String(r2));
	}
	/* eslint-disable-next-line no-lone-blocks */

	p5.pop(); // draw push-pop (1)
}

export const autoScaling = (
	p5: P5CanvasInstance, 
	extractedProps: any
) => {
	const { 
		canvasWH,
		dimH, dimTW, dimB1, dimTF1, dimB2, dimTF2, 
		lbb, rbb, rtt, ltt,
		sideC,
		topC, rttbc, botC, rbtbc,
	} = extractedProps;

	const hoff1    = dimH ? dimH.offset + dimH.textSize : 0;
	const hoff2    = dimH ? dimH.textOffset + dimH.textSize : 0;
	const twoff1   = dimTW ? dimTW.offset + dimTW.textSize : 0;
	const twoff2   = dimTW ? dimTW.textOffset + dimTW.textSize : 0;
	const b1off1   = dimB1 ? dimB1.offset + dimB1.textSize : 0;
	const b1off2   = dimB1 ? dimB1.textOffset + dimB1.textSize : 0;
	const tf1off1  = dimTF1 ? dimTF1.offset + dimTF1.textSize : 0;
	const tf1off2  = dimTF1 ? dimTF1.textOffset + dimTF1.textSize : 0;
	const b2off1   = dimB2 ? dimB2.offset + dimB2.textSize : 0;
	const b2off2   = dimB2 ? dimB2.textOffset + dimB2.textSize : 0;
	const tf2off1  = dimTF2 ? dimTF2.offset + dimTF2.textSize : 0;
	const tf2off2  = dimTF2 ? dimTF2.textOffset + dimTF2.textSize : 0;
	const maxOffset = Math.max(
		hoff1, hoff2, twoff1, twoff2, b1off1, b1off2, tf1off1, tf1off2, b2off1, b2off2, tf2off1, tf2off2
	);

	const p = maxOffset + 20; // padding
	const vertices = [
		{ x: lbb.x - p, 	y: lbb.y + p},
		{ x: rbb.x + p, 	y: lbb.y + p},
		{ x: rtt.x + p, 	y: rtt.y - p},
		{ x: ltt.x - p, 	y: ltt.y - p},
		{ x: sideC.x - p, y: sideC.y },
		{ x: topC.x, y: topC.y - p },
		{ x: botC.x, y: botC.y + p },
		{ x: rttbc.x + p, y: rttbc.y - p },
		{ x: rbtbc.x + p, y: rbtbc.y + p },
	];

	const { minX, minY, maxX, maxY } = findMinMaxCoord(vertices);
	const scaleFactor = getScaleFactor(canvasWH, minX, minY, maxX, maxY);

	p5.scale(scaleFactor);
}
