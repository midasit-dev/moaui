import * as React from 'react';
import { ReactP5Wrapper, P5CanvasInstance } from "@p5-wrapper/react";
import { type UserDefinedBox, type Dimension2D, type Coord2D } from "@lib/Sketch/2D/types";
import { toX, toY, toDimension2D, toCoord2D } from "@lib/Sketch/2D/utils";

const Box = (props: UserDefinedBox) => {
	const { canvasDim, startCoords, b, h } = props;
	const dim: Dimension2D = toDimension2D(canvasDim);
	const coords: Coord2D = toCoord2D(startCoords);

	return (
		<ReactP5Wrapper 
			sketch={(p5: P5CanvasInstance) => {
				p5.setup = () => p5.createCanvas(dim.width, dim.height, p5.WEBGL);
				p5.draw = () => {
					p5.background(220);
		
					p5.beginShape();
					p5.vertex(toX(coords.x + 0, dim.width), 	toY(coords.y + 0, dim.height));
					p5.vertex(toX(coords.x + b, dim.width), 	toY(coords.y + 0, dim.height));
					p5.vertex(toX(coords.x + b, dim.width), 	toY(coords.y + h, dim.height));
					p5.vertex(toX(coords.x + 0, dim.width), 	toY(coords.y + h, dim.height));
					p5.fill('yellow');
					p5.endShape(p5.CLOSE);
				}
			}}
		/>
	);
}

export default Box;