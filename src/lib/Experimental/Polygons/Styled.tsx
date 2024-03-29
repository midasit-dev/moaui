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
	labels?: ExperimentalPolygonType["labels"],
	labelSpacing?: ExperimentalPolygonType["labelSpacing"],
	// labelPosition?: ExperimentalPolygonType["labelPosition"], <-- Not Working
}

export type StyledProps = {
	/**
	 * Wrapped Panel props
	 */
	panelProps?: PanelProps,
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
	 * Scale factor for all polygons (applies to all polygons if not specified in each polygon)
	 * @default 10
	 */
	scale?: number,
};

// 중심 좌표 계산 함수
const calculateCenter = (maxY: number, points: number[][]) => {
	const xValues = points.map(point => point[0]);
	const yValues = points.map(point => maxY - point[1]); // 뒤집기
	const centerX = (Math.max(...xValues) + Math.min(...xValues)) / 2;
	const centerY = (Math.max(...yValues) + Math.min(...yValues)) / 2;
	return { x: centerX, y: centerY };
};

const StyledComponent = (props: StyledProps) => {
	const { 
		panelProps,
		data,
		scale: allScale,
	 } = props;

	const [scaledData, setScaledData] = useState<PolygonType[]>([]);
	const [scaledMaxX, setScaledMaxX] = useState<number>(0);
	const [scaledMaxY, setScaledMaxY] = useState<number>(0);

	useEffect(() => {
		const scaledData: PolygonType[] = data.map(polygon => {
			const { coordinates, scale } = polygon;
			const realScale = scale !== undefined ? scale : ( allScale !== undefined ? allScale : 10 );
			const scaledCoordinates = coordinates.map(point => [point[0] * realScale, point[1] * realScale]);
			return {
				...polygon,
				coordinates: scaledCoordinates,
			}
		});

		setScaledData(scaledData);
	}, [allScale, data]);

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
				const { coordinates, labels, labelSpacing } = polygon;
				const center = calculateCenter(scaledMaxY, coordinates);
				return (
					<FloatingBox 
						key={index} 
						x={center.x} 
						y={center.y} 
						guideBoxProps={{ 
							spacing: labelSpacing, 
							center: true
						}}
					>
						{labels && labels.map((label, index) => (
							<Typography key={index}>{label}</Typography>
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


