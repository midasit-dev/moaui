import { 
	ConvertProps, 
	SolidRectangleProps,
	HSectionProps,
} from "../../Vertices/types/props";
import { Vertex2D } from "../types";
import toHSectionVertices from "./functions/h-section";
import toSolidRectangleVertices from "./functions/solid-rectangle";

export default function toVertices(props: ConvertProps): Vertex2D[][] | Error {
	try {
		if (!props) throw new Error('props is required');
		return doConvert(props);
	} catch (error) {
		console.error(error);
		if (error instanceof Error) return error;
		return new Error('An error occurred while toVertices');
	}
}

function doConvert(props: ConvertProps): Vertex2D[][] {
	const { type, properties } = props;

	switch (type) {
		case 'SolidRectangle': 	return toSolidRectangleVertices(properties as SolidRectangleProps);
		case 'HSection':  			return toHSectionVertices(properties as HSectionProps);
		default: throw new Error('type is not found');
	}
}