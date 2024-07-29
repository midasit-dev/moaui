import { useState, useEffect } from 'react';
import MoaStyledComponent from '../../Style/MoaStyled';
import { Panel, type ExperimentalPolygonType, FloatingBox, Typography, type PanelProps } from '../../';

type PolygonType = {
	coordinates: ExperimentalPolygonType["coordinates"],
	scale?: ExperimentalPolygonType["scale"],
	fill?: ExperimentalPolygonType["fill"],
	fillOpacity?: ExperimentalPolygonType["fillOpacity"],
	fillRule?: ExperimentalPolygonType["fillRule"],
	stroke?: ExperimentalPolygonType["stroke"],
	strokeWidth?: ExperimentalPolygonType["strokeWidth"],
	strokeLinecap?: ExperimentalPolygonType["strokeLinecap"],
	strokeLinejoin?: ExperimentalPolygonType["strokeLinejoin"],
	strokeDasharray?: ExperimentalPolygonType["strokeDasharray"],
	strokeDashoffset?: ExperimentalPolygonType["strokeDashoffset"],
	labelColor?: ExperimentalPolygonType["labelColor"],
	labels?: ExperimentalPolygonType["labels"],
	labelSpacing?: ExperimentalPolygonType["labelSpacing"],
	labelPosition?: ExperimentalPolygonType["labelPosition"],
}

export type StyledProps = {
	/**
	 * Wrapped Panel props
	 */
	panelProps?: PanelProps,

	/**
	 * Scale factor for all polygons (applies to all polygons if not specified in each polygon)
	 * @default 10
	 */
	scale?: number,
	/**
	 * Apply to All, Polygon data array (common style)
	 */
	fill?: ExperimentalPolygonType["fill"],
	fillOpacity?: ExperimentalPolygonType["fillOpacity"],
	fillRule?: ExperimentalPolygonType["fillRule"],
	stroke?: ExperimentalPolygonType["stroke"],
	strokeWidth?: ExperimentalPolygonType["strokeWidth"],
	strokeLinecap?: ExperimentalPolygonType["strokeLinecap"],
	strokeLinejoin?: ExperimentalPolygonType["strokeLinejoin"],
	strokeDasharray?: ExperimentalPolygonType["strokeDasharray"],
	strokeDashoffset?: ExperimentalPolygonType["strokeDashoffset"],

	/**
	 * Polygon data array
	 * @example
	 * [
	 * 	{
	 * 		coordinates: [[0,0], [0,6], [10,6], [10,21], [16,21], [16,0]],
	 * 		fill: "#f5f6f7",
	 * 		fillRule: "evenodd",
	 * 		stroke: "#a1a1a1",
	 * 		labels: ['(1)-B(Two)'],
	 * 	},
	 * ]
	 */
	data: PolygonType[],

	/**
	 * Apply to All, Polygon label style (common style)
	 */
	labelColor?: ExperimentalPolygonType["labelColor"],
	labelSpacing?: ExperimentalPolygonType["labelSpacing"],
	labelPosition?: ExperimentalPolygonType["labelPosition"],
};

// 중심 좌표 계산 함수
const calculateCenter = (scaledMaxY: number, points: number[][]) => {
	const xValues = points.map(point => point[0]);
	const yValues = points.map(point => scaledMaxY - point[1]); // 뒤집기
	const centerX = (Math.max(...xValues) + Math.min(...xValues)) / 2;
	const centerY = (Math.max(...yValues) + Math.min(...yValues)) / 2;
	return { x: centerX, y: centerY };
};

// 좌표 좌상단 계산 함수
const calculateTopLeft = (scaledMaxY: number, points: number[][]) => {
	const xValues = points.map(point => point[0]);
	const yValues = points.map(point => scaledMaxY - point[1]); // 뒤집기
	const topLeftX = Math.min(...xValues);
	const topLeftY = Math.min(...yValues);
	return { x: topLeftX, y: topLeftY };
}

// 좌표 기준으로 가로, 세로 값 계산 해주는 함수 
// @return { width: maxX - minX, height: maxY - minY }
const calculateWidthHeight = (scaledMaxY: number, points: number[][]) => {
	const xValues = points.map(point => point[0]);
	const yValues = points.map(point => scaledMaxY - point[1]);
	const minX = Math.min(...xValues);
	const maxX = Math.max(...xValues);
	const minY = Math.min(...yValues);
	const maxY = Math.max(...yValues);
	return { width: maxX - minX, height: maxY - minY };
};

// label position에 따라 guideBoxProps 옵션 변경
const getLabelPositionRealOptions = (labelPosition: string | undefined) => {
	if (labelPosition === "center") return { center: true, }
	if (labelPosition === "leftTop") return { horLeft: true, verTop: true, }
	if (labelPosition === "rightTop") return { horRight: true, verTop: true, }
	if (labelPosition === "leftBottom") return { horLeft: true, verBottom: true, }
	if (labelPosition === "rightBottom") return { horRight: true, verBottom: true, }
	if (labelPosition === "top") return { horCenter: true, verTop: true, }
	if (labelPosition === "bottom") return { horCenter: true, verBottom: true, }
	if (labelPosition === "left") return { horLeft: true, verCenter: true, }
	if (labelPosition === "right") return { horRight: true, verCenter: true, }
	return { center: true, }
}

// 개별스타일 적용? 전체스타일 적용? 아니면 기본 값
const getStyle: any = (allStyle: any, style: any, defaultStyle: any) => {
	return style !== undefined ? style : ( allStyle !== undefined ? allStyle : defaultStyle );
}

const StyledComponent = (props: StyledProps) => {
	const { 
		panelProps,
		data,
		scale: allScale,
		fill: allFill,
		fillOpacity: allFillOpacity,
		fillRule: allFillRule,
		stroke: allStroke,
		strokeWidth: allStrokeWidth,
		strokeLinecap: allStrokeLinecap,
		strokeLinejoin: allStrokeLinejoin,
		strokeDasharray: allStrokeDasharray,
		strokeDashoffset: allStrokeDashoffset,
		labelColor: allLabelColor,
		labelSpacing: allLabelSpacing,
		labelPosition: allLabelPosition,
	 } = props;

	const [scaledData, setScaledData] = useState<PolygonType[]>([]);
	const [scaledMaxX, setScaledMaxX] = useState<number>(0);
	const [scaledMaxY, setScaledMaxY] = useState<number>(0);

	useEffect(() => {
		const scaledData: PolygonType[] = data.map(polygon => {
			const { coordinates, scale } = polygon;
			const realScale = getStyle(allScale, scale, 10);
			const scaledCoordinates = coordinates.map(point => [point[0] * realScale, point[1] * realScale]);
			return {
				...polygon,
				coordinates: scaledCoordinates,
				scale: getStyle(allScale, scale, 10),
				fill: getStyle(allFill, polygon.fill, undefined),
				fillOpacity: getStyle(allFillOpacity, polygon.fillOpacity, undefined),
				fillRule: getStyle(allFillRule, polygon.fillRule, undefined),
				stroke: getStyle(allStroke, polygon.stroke, undefined),
				strokeWidth: getStyle(allStrokeWidth, polygon.strokeWidth, undefined),
				strokeLinecap: getStyle(allStrokeLinecap, polygon.strokeLinecap, undefined),
				strokeLinejoin: getStyle(allStrokeLinejoin, polygon.strokeLinejoin, undefined),
				strokeDasharray: getStyle(allStrokeDasharray, polygon.strokeDasharray, undefined),
				strokeDashoffset: getStyle(allStrokeDashoffset, polygon.strokeDashoffset, undefined),
				labelColor: getStyle(allLabelColor, polygon.labelColor, undefined),
				labelSpacing: getStyle(allLabelSpacing, polygon.labelSpacing, undefined),
				labelPosition: getStyle(allLabelPosition, polygon.labelPosition, undefined),
			}
		});

		setScaledData(scaledData);
	}, [allFill, allFillOpacity, allFillRule, allLabelColor, allLabelPosition, allLabelSpacing, allScale, allStroke, allStrokeDasharray, allStrokeDashoffset, allStrokeLinecap, allStrokeLinejoin, allStrokeWidth, data]);

	useEffect(() => {
		const maxX = Math.max(...scaledData.map(polygon => Math.max(...polygon.coordinates.map(point => point[0]))));
		setScaledMaxX(maxX);
		const maxY = Math.max(...scaledData.map(polygon => Math.max(...polygon.coordinates.map(point => point[1]))));
		setScaledMaxY(maxY);
	}, [scaledData]);

  return (
		<Panel 
			relative 
			{...{
				variant: 'box',
				width: scaledMaxX,
				height: scaledMaxY,
				padding: 0,
				...panelProps,
			}}
		>
			{/* polygon 그리기 */}
			<svg width={scaledMaxX} height={scaledMaxY}>
				{scaledData.map((polygon, index) => {
					const { coordinates, fill, fillOpacity, fillRule, stroke, strokeWidth, strokeLinecap, strokeLinejoin, strokeDasharray, strokeDashoffset } = polygon;
					const points = coordinates.map(point => `${point[0]},${scaledMaxY - point[1]}`).join(' ');
					return (
						<polygon
							key={index}
							points={points}
							fill={fill}
							fillOpacity={fillOpacity}
							fillRule={fillRule}
							stroke={stroke}
							strokeWidth={strokeWidth}
							strokeLinecap={strokeLinecap}
							strokeLinejoin={strokeLinejoin}
							strokeDasharray={strokeDasharray}
							strokeDashoffset={strokeDashoffset}
						/>
					)
				})}
			</svg>

			{/* 각 polygon의 중심에 절대 위치의 div 배치 */}
			{scaledData.map((polygon, index) => {
				const { coordinates, labelColor, labels, labelSpacing, labelPosition, } = polygon;
				const points = calculateTopLeft(scaledMaxY, coordinates);
				const size = calculateWidthHeight(scaledMaxY, coordinates);
				return (
					<FloatingBox 
						key={index} 
						x={points.x}
						y={points.y}
						width={size.width}
						height={size.height}
						guideBoxProps={{
							width: 'inherit',
							height: 'inherit',
							spacing: labelSpacing, 
							...getLabelPositionRealOptions(labelPosition),
						}}
					>
						{labels && labels.map((label, index) => (
						<Typography key={index} color={labelColor || undefined}>{label}</Typography>
						))}
					</FloatingBox>
				)
			})}
		</Panel>
	)
}

const ThemedComponent = (props: StyledProps) => (
	<MoaStyledComponent>
		<StyledComponent {...props} />
	</MoaStyledComponent>
);
export default ThemedComponent;


