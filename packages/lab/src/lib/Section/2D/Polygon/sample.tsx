import Polygon from "@lablib/Section/2D/Polygon";
import toVertices from "@lablib/Vertices";

export const Default = () => {
	const vertices = toVertices({
		type: "HSection",
		properties: {
			h: 200,
			tw: 30,
			b1: 200,
			tf1: 50,
			b2: 200,
			tf2: 50,
			r1: 0,
			r2: 0,
		}
	});

	if (vertices instanceof Error) {
		console.error(vertices);
		return null;
	}

	return (
		<Polygon vertices={vertices} />
	)
}
