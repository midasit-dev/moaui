import React from 'react';
import { ReactP5Wrapper, P5CanvasInstance } from "@p5-wrapper/react";
import { drawGuideLine, type HSectionProps, } from "@lablib/Section/2D";
import { calcPropsHSection, drawHSection } from '@lablib/Section/2D/HSection/helpers';

/* 
 * Shape of a HSection (for 2D Section)
 */
const HSection = (props: HSectionProps) => {
	const input = calcPropsHSection(props);
	if (!input) return null;

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
					drawHSection(p5, input);

					//가이드 라인을 그립니다.
					if (input.canvasGuideLine) drawGuideLine(p5, input.canvasWH);
				}
			}}
		/>
	);
}

export default HSection;
