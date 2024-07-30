import { Vertex2D, toVertices } from ".";

function main() {
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
		}
	});
	
	console.log(JSON.stringify(vertices));
}

main(); 