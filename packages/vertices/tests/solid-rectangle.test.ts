import { toVertices } from "@lib-functions";
import { Vertex2D } from '@lib-types';

describe('functions/solid-rectangle.ts', () => {
	test('250x300', () => {
		const vertices: Vertex2D[][] | Error = toVertices({
			type: "SolidRectangle",
			properties: {
				b: 250,
				h: 300,
			},
		});

		if (vertices instanceof Error) {
			fail(`Function returned an error: ${vertices.message}`);
		} else {
			expect(vertices).toMatchSnapshot();
		}
	});
});