import React from 'react';
import { ReactP5Wrapper, P5CanvasInstance } from "@p5-wrapper/react";
import { type HSectionProps, } from "@lablib/Section/2D";
import { autoScaling, calcPropsHSection, drawHSection } from '@lablib/Section/2D/HSection/helpers';

/* 
 * Shape of a HSection (for 2D Sketch)
 * @param props UserDefinedBox
 */
const HSection = (props: HSectionProps) => {
	const { 
		canvasWH, canvasBackground, canvasTranslateCoord, canvasAutoScale, canvasScale,
		...otherVars
	} = calcPropsHSection(props);

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

					//시작점을 중심으로 보냅니다.
					p5.translate(canvasWH.width / 2, canvasWH.height / 2);
					//시작점을 평행이동 합니다. (좌하단 기준 1사분면 좌표계 기준)
					p5.translate(canvasTranslateCoord.x, -canvasTranslateCoord.y);
					//자동 스케일링을 설정합니다.
					if (canvasAutoScale) {
						autoScaling(p5, canvasWH, otherVars);
					} else {
						if (canvasScale) p5.scale(canvasScale);
					}

					drawHSection(p5, otherVars);
				}
			}}
		/>
	);
}

export default HSection;
