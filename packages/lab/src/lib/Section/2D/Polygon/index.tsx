import React from 'react';
import { ReactP5Wrapper, P5CanvasInstance } from "@p5-wrapper/react";
import { Coord2D, defaultCanvasValue, Dimension2D, drawGuideLine, findMinMaxCoord, PolygonProps, toCoord2D, toDimension2D } from "@lablib/Section/2D";

/* 
 * Shape of a Polygon (for 2D Section)
 */
const Polygon = (props: PolygonProps) => {
	const input = calcPropsPolygon(props);

	return (
		<ReactP5Wrapper 
			sketch={(p5: P5CanvasInstance) => {
				p5.setup = () => {
					//도형을 생성한다.
					p5.createCanvas(input.canvasWH.width, input.canvasWH.height);
					p5.noLoop();
				}

				p5.draw = () => {
					//도형의 기본 배경을 설정
					if (input.canvasBackground) p5.background(input.canvasBackground);

					//시작점을 중심으로 보냅니다.
					p5.translate(input.canvasWH.width / 2, input.canvasWH.height / 2);
					//시작점을 평행이동 합니다. (좌하단 기준 1사분면 좌표계 기준)
					p5.translate(input.canvasTranslateCoord.x, -input.canvasTranslateCoord.y);
					
					//단면을 그립니다.
					drawPolygon(p5, input);

					//가이드 라인을 그립니다.
					if (input.canvasGuideLine) drawGuideLine(p5, input.canvasWH);
				}
			}}
		/>
	);
}

export default Polygon;

const calcPropsPolygon = (props: PolygonProps) => {
	const { 
		vertices,
		canvas,
		// shape,
	 } = props;

	//TODO 우선 하나만 고려해봅시다!
	const polygonVertices = vertices[0];

	const { minX, minY, maxX, maxY } = findMinMaxCoord(polygonVertices);

	const p = 20; //padding
	const maxWH = {
		width: maxX - minX + p * 2,
		height: maxY - minY + p * 2
	};

	// from canvas prop
	const defaultCanvas = defaultCanvasValue(maxWH.width, maxWH.height);
	const canvasBackground: string | null = canvas?.background ?? defaultCanvas.background;
	const canvasWH: Dimension2D = toDimension2D(canvas?.dimension ?? defaultCanvas.dimension);
	const canvasTranslateCoord: Coord2D = toCoord2D(canvas?.translateCoords ?? defaultCanvas.translateCoords);
	const canvasAutoScale = canvas?.autoScale ?? defaultCanvas.autoScale;
	const canvasScale = canvas?.scale ?? defaultCanvas.scale;
	const canvasRotate = canvas?.rotate ?? defaultCanvas.rotate;
	const canvasGuideLine = canvas?.guideLine ?? defaultCanvas.guideLine;

	return {
		vertices,
		canvasWH, canvasBackground, canvasTranslateCoord, canvasAutoScale, canvasScale, canvasRotate, canvasGuideLine,
	}
}

const drawPolygon = (p5: P5CanvasInstance, input: ReturnType<typeof calcPropsPolygon>) => {
	const { 
		vertices,
		canvasAutoScale, canvasScale, canvasRotate,
	} = input;

	//TODO 우선 하나만 고려해봅시다!
	const polygonVertices = vertices[0];

	//자동 스케일링을 설정합니다.
	if (canvasAutoScale) {
		//TODO autoScaling(p5, input);
	} else {
		if (canvasScale) p5.scale(canvasScale);
	}
	//회전을 설정합니다.
	if (canvasRotate) p5.rotate(p5.radians(canvasRotate));

	//도형을 그립니다.
	p5.push();
	p5.beginShape();
	for (const vertex of polygonVertices) {
		p5.vertex(vertex.x, vertex.y);
	}
	p5.endShape(p5.CLOSE);
	p5.pop();
}