import React from 'react';
import { ReactP5Wrapper, P5CanvasInstance } from "@p5-wrapper/react";
import { FlexProps, } from "@lablib/Section/2D/types/props";
import { calcPropsSolidRectangle, drawSolidRectangle } from '../SolidRectangle/helpers';
import { toDimension2D } from '../utils';
import { Dimension2D } from '../types/base';
import { calcPropsHSection, drawHSection } from '../HSection/helpers';

const Flex = (props: FlexProps) => {
	const { canvas, solidRectangle, hSection } = props;

	// canvas 내부적으로 채워주기
	const _solidRectangle: any = { canvas, ...solidRectangle, };
	const _hSection: any = { canvas, ...hSection, };

	// 매개변수 추출!
	const { canvasWH: canvasWH1, canvasBackground, ...solidRectangleProps } = calcPropsSolidRectangle(_solidRectangle);
	const { canvasWH: canvasWH2, ...hSectionProps } = calcPropsHSection(_hSection);

	// 가장 큰 캔버스 크기로 설정
	const canvasWH: Dimension2D = toDimension2D({
		width: Math.max(canvasWH1.width, canvasWH2.width),
		height: Math.max(canvasWH1.height, canvasWH2.height),
	});

	return (
		<ReactP5Wrapper 
			sketch={(p5: P5CanvasInstance) => {
				p5.setup = () => {
					p5.createCanvas(canvasWH.width, canvasWH.height);
					p5.noLoop();
				}

				p5.draw = () => {
					//도형의 기본 배경을 설정
					if (canvasBackground) p5.background(canvasBackground);

					//그려 봅시다.
					if (solidRectangle) drawSolidRectangle(p5, solidRectangleProps);
					if (hSection) drawHSection(p5, hSectionProps);
				}
			}}
		/>
	);
}

export default Flex;