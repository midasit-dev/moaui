import { toVertices } from "@lib-functions";
import { Vertex2D } from '@lib-types';

describe('functions/h-section.ts', () => {
	test('H-300x250x30x50', () => {
		const vertices: Vertex2D[][] | Error = toVertices({
			type: "HSection",
			properties: {
				h: 300,
				tw: 30,
				b1: 250,
				tf1: 50,
				b2: 250,
				tf2: 50,
				r1: 10,
				r2: 10,
			},
		});

		if (vertices instanceof Error) {
			fail(`Function returned an error: ${vertices.message}`);
		} else {
			expect(vertices).toMatchSnapshot();
		}
	});
});