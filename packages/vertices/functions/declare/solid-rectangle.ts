import { SolidRectangleProps } from "../../types/declare/props";
import { Vertex2D } from "../../types/declare/vertex";
import half from "../../utils/half";

export default function toSolidRectangleVertices(props: SolidRectangleProps): Vertex2D[][] {
	const { b, h } = props;
	const vertices: Vertex2D[][] = [];

	const lbb: Vertex2D = { x: -half(b), y:  half(h) };
	const rbb: Vertex2D = { x:  half(b), y:  half(h) };
	const rbt: Vertex2D = { x:  half(b), y: -half(h) };
	const lbt: Vertex2D = { x: -half(b), y: -half(h) };
	
	vertices.push([ lbb, rbb, rbt, lbt ]);

	return vertices;
}