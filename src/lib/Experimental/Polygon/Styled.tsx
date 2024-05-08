import { useState, useEffect } from 'react';
import MoaStyledComponent from '../../Style/MoaStyled';
import { FloatingBox, Typography, type GuideBoxProps } from '../../';

const getScaledMaxWidth = (scale: number, coordinates: number[][]) => {
	const maxValue = coordinates.reduce((acc, cur) => {
		return acc > cur[0] ? acc : cur[0];
	}, 0);

	return maxValue * scale;
}

const getScaledMaxHeight = (scale: number, coordinates: number[][]) => {
	const maxValue = coordinates.reduce((acc, cur) => {
		return acc > cur[1] ? acc : cur[1];
	}, 0);

	return maxValue * scale;
}

const toScaledSVGCoordinates = (scale: number, coordinates: number[][], maxHeight: number) => {
	return coordinates.map(coord => {
		const x = coord[0] * scale;
		const y = coord[1] * scale;
		return [x, maxHeight - y];
	});
}

export type StyledProps = {
	/**
	 * The coordinates of the Polygon.
	 */
	coordinates: number[][],

	/**
	 * The scale of the Polygon.
	 * @defaultValue 10
	 */
	scale?: number,

	/**
	 * The fill of the Polygon.
	 */
	fill?: string,
	/**
	 * The fillOpacity of the Polygon.
	 */
	fillOpacity?: number,
	/**
	 * The fillRule of the Polygon.
	 */
	fillRule?: "nonzero" | "evenodd" | "inherit",

	/**
	 * The stroke of the Polygon.
	 */
	stroke?: string,
	/**
	 * The strokeWidth of the Polygon.
	 */
	strokeWidth?: string,
	/**
	 * The strokeLinecap of the Polygon.
	 */
	strokeLinecap?: "butt" | "round" | "square" | "inherit",
	/**
	 * The strokeLinejoin of the Polygon.
	 */
	strokeLinejoin?: "round" | "bevel" | "miter" | "inherit",
	/**
	 * The strokeDasharray of the Polygon.
	 */
	strokeDasharray?: string,
	/**
	 * The strokeDashoffset of the Polygon.
	 */
	strokeDashoffset?: number,

	/**
	 * The labelColor of the Polygon.
	 */
	labelColor?: string,
	/**
	 * The labels of the Polygon.
	 */
	labels?: string[],
	/**
	 * The labelSpacing of the Polygon.
	 */
	labelSpacing?: number,
	/**
	 * The labelPosition of the Polygon.
	 * @default 'center'
	 */
	labelPosition?: 
	"center"  		| 
	"leftTop" 		| 
	"rightTop"		| 
	"leftBottom" 	| 
	"rightBottom" |
	"top" 				| 
	"bottom" 			| 
	"left" 				| 
	"right",
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

const StyledComponent = (props: StyledProps) => {
	const {
		coordinates,
		scale = 10,
		fill,
		fillOpacity,
		fillRule,
		stroke,
		strokeWidth,
		strokeLinecap,
		strokeLinejoin,
		strokeDasharray,
		strokeDashoffset,
		labelColor,
		labels,
		labelSpacing,
		labelPosition,
	} = props;

	const [points, setPoints] = useState('');
	const [scaledMaxWidth, setScaledMaxWidth] = useState(0);
	const [scaledMaxHeight, setScaledMaxHeight] = useState(0);

	useEffect(() => {
		setScaledMaxWidth(getScaledMaxWidth(scale, coordinates));
		setScaledMaxHeight(getScaledMaxHeight(scale, coordinates));
	}, [coordinates, scale])

  useEffect(() => {
		const coordinatesSVG = toScaledSVGCoordinates(scale, coordinates, scaledMaxHeight);
		setPoints(coordinatesSVG.map(coord => coord.join(',')).join(' '));
  }, [scaledMaxHeight, coordinates, scale]);

  return (
    <div style={{ width: 'auto', height: 'auto' }}>
			<div style={{ width: 'auto', height: 'auto', position: 'relative' }}>
				<svg width={scaledMaxWidth} height={scaledMaxHeight}>
					<polygon 
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
				</svg>
				<FloatingBox
					width={scaledMaxWidth}
					height={scaledMaxHeight}
					x={0}
					y={0}
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
			</div>
    </div>
	)
}

const ThemedComponent = (props: StyledProps) => (
	<MoaStyledComponent>
		<StyledComponent {...props} />
	</MoaStyledComponent>
);
export default ThemedComponent;
