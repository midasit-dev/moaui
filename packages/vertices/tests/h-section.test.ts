import { toVertices } from "../functions";
import { ConvertProps, Vertex2D } from '../types';

describe('to-vertices.ts test', () => {
	test('h-section.ts test', () => {
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
			expect(vertices).toStrictEqual([
				[
					{ "x": -125, 	"y": 150 	},
					{ "x": 125, 	"y": 150 	},
					{ "x": 125, 	"y": 110 	},
					{ "x": 115, 	"y": 100 	},
					{ "x": 25, 		"y": 100 	},
					{ "x": 15, 		"y": 90 	},
					{ "x": 15, 		"y": -90 	},
					{ "x": 25, 		"y": -100 },
					{ "x": 115, 	"y": -100 },
					{ "x": 125, 	"y": -110 },
					{ "x": 125, 	"y": -150 },
					{ "x": -125, 	"y": -150 },
					{ "x": -125, 	"y": -110 },
					{ "x": -115, 	"y": -100 },
					{ "x": -25, 	"y": -100 },
					{ "x": -15, 	"y": -90 	},
					{ "x": -15, 	"y": 90 	},
					{ "x": -25, 	"y": 100 	},
					{ "x": -115, 	"y": 100 	},
					{ "x": -125, 	"y": 110 	}
				]
			]);
		}
	});
});
