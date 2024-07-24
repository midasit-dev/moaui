import React from 'react';
import { ReactP5Wrapper, P5CanvasInstance } from "@p5-wrapper/react";
import { type SolidRectangleProps, } from "@lablib/Section/2D";
import { calcPropsSolidRectangle, drawSolidRectangle } from './helpers';

/* 
 * Shape of a SolidRectangle (for 2D Section)
 * @param props SolidRectangleProps
 */
const SolidRectangle = (props: SolidRectangleProps) => {
	const { canvasWH, canvasBackground, ...otherVars } = calcPropsSolidRectangle(props);

	return (
		<ReactP5Wrapper 
			sketch={(p5: P5CanvasInstance) => {
				p5.setup = () => {
					//도형의 사이즈를 설정
					p5.createCanvas(canvasWH.width, canvasWH.height);
					p5.noLoop();
				}

				p5.draw = () => {
					//도형의 기본 배경을 설정
					if (canvasBackground) p5.background(canvasBackground);

					drawSolidRectangle(p5, otherVars);
				}
			}}
		/>
	);
}

export default SolidRectangle;
