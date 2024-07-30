import { HSectionProps, Vertex2D } from "@lib-types";
import { half } from "@lib-utils";

export default function toHSectionVertices(props: HSectionProps): Vertex2D[][] {
	const { h, tw, b1, tf1, b2, tf2, r1, r2 } = props;

	const vertices: Vertex2D[][] = [];

	//기본 각 꼭지점 좌표 계산
	const flangeW1 = (b1 - tw) * 0.5; // Top flange Wing width (1/2)
	const webH = h - tf1 - tf2;				// Web height
	const flangeW2 = (b2 - tw) * 0.5; // Bottom flange Wing width (1/2)

	/*
	 *  ltt                         rtt
	 *   |---------------------------|
	 *   |---------------------------|
	 *  ltb    clt|         |crt    rtb
	 *            |				 |
	 *            |				 |
	 *            |				 |
	 *  lbt    clb|         |crb    rbt
	 *   |---------------------------|
	 *   |---------------------------|
	 *  lbb                         rbb
	 */
	const lbb: Vertex2D = { x: -half(b2), 						y: half(h) };
	const rbb: Vertex2D = { x: half(b2), 							y: half(h) };
	const rbt: Vertex2D = { x: half(b2), 							y: half(h) - tf2 };
	const crb: Vertex2D = { x: half(b2) - flangeW2, 	y: half(h) - tf2 };
	const crt: Vertex2D = { x: half(b2) - flangeW2, 	y: half(h) - tf2 - webH };
	const rtb: Vertex2D = { x: half(b1), 							y: half(h) - tf2 - webH };
	const rtt: Vertex2D = { x: half(b1), 							y: half(h) - tf2 - webH - tf1 };
	const ltt: Vertex2D = { x: -half(b1), 						y: half(h) - tf2 - webH - tf1 };
	const ltb: Vertex2D = { x: -half(b1), 						y: half(h) - tf2 - webH };
	const clt: Vertex2D = { x: -half(b1) + flangeW1, 	y: half(h) - tf2 - webH };
	const clb: Vertex2D = { x: -half(b1) + flangeW1, 	y: half(h) - tf2 };
	const lbt: Vertex2D = { x: -half(b2), 						y: half(h) - tf2 };

	//둥근부분을 위한 좌표 계산
	// flange (r2)
	const rbt_st: Vertex2D = { x: rbt.x, 			y: rbt.y + r2 };
	const rbt_ed: Vertex2D = { x: rbt.x - r2, 	y: rbt.y };
	// web (r1)
	const crb_st: Vertex2D = { x: crb.x + r1, 	y: crb.y };
	const crb_ed: Vertex2D = { x: crb.x, 			y: crb.y - r1 };
	// web (r1)
	const crt_st: Vertex2D = { x: crt.x, 			y: crt.y + r1 };
	const crt_ed: Vertex2D = { x: crt.x + r1, 	y: crt.y };
	// flange (r2)
	const rtb_st: Vertex2D = { x: rtb.x - r2, 	y: rtb.y };
	const rtb_ed: Vertex2D = { x: rtb.x, 			y: rtb.y - r2 };
	// flange (r2)
	const ltb_st: Vertex2D = { x: ltb.x, 			y: ltb.y - r2 };
	const ltb_ed: Vertex2D = { x: ltb.x + r2, 	y: ltb.y };
	// web (r1)
	const clt_st: Vertex2D = { x: clt.x - r1, 	y: clt.y };
	const clt_ed: Vertex2D = { x: clt.x, 			y: clt.y + r1 };
	// web (r1)
	const clb_st: Vertex2D = { x: clb.x, 			y: clb.y - r1 };
	const clb_ed: Vertex2D = { x: clb.x - r1, 	y: clb.y };
	// flange (r2)
	const lbt_st: Vertex2D = { x: lbt.x + r2, 	y: lbt.y };
	const lbt_ed: Vertex2D = { x: lbt.x, 			y: lbt.y + r2 };

	vertices.push([
		lbb, rbb, 
		rbt_st, rbt_ed, 
		crb_st, crb_ed, 
		crt_st, crt_ed, 
		rtb_st, rtb_ed, 
		rtt, ltt, 
		ltb_st, ltb_ed, 
		clt_st, clt_ed, 
		clb_st, clb_ed, 
		lbt_st, lbt_ed,
	])

	return vertices;
}
