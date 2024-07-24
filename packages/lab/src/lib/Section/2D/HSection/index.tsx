import React from 'react';
import { ReactP5Wrapper, P5CanvasInstance } from "@p5-wrapper/react";
import { type HSectionProps, } from "@lablib/Section/2D";
import { calcPropsHSection, drawHSection } from '@lablib/Section/2D/HSection/helpers';

/* 
 * Shape of a HSection (for 2D Sketch)
 * @param props UserDefinedBox
 */
const HSection = (props: HSectionProps) => {
	const { canvasWH, canvasBackground, ...otherVars } = calcPropsHSection(props);

	return (
		<ReactP5Wrapper 
			sketch={(p5: P5CanvasInstance) => {
				p5.setup = () => {
					//도형을 생성한다.
					p5.createCanvas(canvasWH.width, canvasWH.height);
					p5.noLoop();
				}

				p5.draw = () => {
					//도형의 기본 배경을 설정
					if (canvasBackground) p5.background(canvasBackground);

					drawHSection(p5, otherVars);
				}
			}}
		/>
	);
}

export default HSection;
