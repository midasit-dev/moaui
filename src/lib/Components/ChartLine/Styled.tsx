import { styled } from '@mui/material/styles';
import MoaStyledComponent from '../../Style/MoaStyled';
import { ResponsiveLine } from '@nivo/line'

interface SingleLineProps {
	id: string;
	color: string;
	data: {
		x: number;
		y: number;
	}[];
}

export type StyledProps = {
  /**
   * Chart data
   * Array of Single Line Props
   *
   * @default []
   */
  data: Array<SingleLineProps>;
  /**
   * Chart width
   *
   * @default 100%
   */
  width?: number | string;
  /**
   * Chart height
   *
   * @default 400
   */
  height?: number | string;
  /**
   * set a bottom-right legends
	 * 
	 * @default false
   */
  legends?: boolean;
	/**
	 * set a top axis
	 * 
	 * @default false
	 */
	axisTop?: boolean;
	/**
	 * set a top axis tick values
	 */
	axisTopTickValues?: number;
	/**
	 * set a top axis tick rotation
	 */
	axisTopTickRotation?: number;
	/**
	 * set a top axis decimals
	 */
	axisTopDecimals?: number;
	/**
	 * set a top axis legend (write a axis label!)
	 */
	axisTopLegend?: string;
	/**
	 * set a top axis legend offset
	 * 
	 * @default -36
	 */
	axisTopLegendOffset?: number;
	/**
	 * set a top axis legend position
	 * 
	 * @default middle
	 */
	axisTopLegendPosition?: 'start' | 'middle' | 'end';
	/**
	 * set a right axis
	 * 
	 * @default false
	 */
	axisRight?: boolean;
	/**
	 * set a right axis tick values
	 */
	axisRightTickValues?: number;
	/**
	 * set a right axis tick rotation
	 */
	axisRightTickRotation?: number;
	/**
	 * set a right axis decimals
	 */
	axisRightDecimals?: number;
	/**
	 * set a right axis legend (write a axis label!)
	 */
	axisRightLegend?: string; 
	/**
	 * set a right axis legend offset
	 * 
	 * @default 40
	 */
	axisRightLegendOffset?: number;
	/**
	 * set a right axis legend position
	 * 
	 * @default middle
	 */
	axisRightLegendPosition?: 'start' | 'middle' | 'end';
	/**
	 * set a bottom axis
	 * 
	 * @default false
	 */
	axisBottom?: boolean;
	/**
	 * set a bottom axis tick values
	 */
	axisBottomTickValues?: number;
	/**
	 * set a bottom axis tick rotation
	 */
	axisBottomTickRotation?: number;
	/**
	 * set a bottom axis decimals
	 */
	axisBottomDecimals?: number;
	/**
	 * set a bottom axis legend (write a axis label!)
	 */
	axisBottomLegend?: string;
	/**
	 * set a bottom axis legend offset
	 * 
	 * @default 36
	 */
	axisBottomLegendOffset?: number;
	/**
	 * set a bottom axis legend position
	 * 
	 * @default middle
	 */
	axisBottomLegendPosition?: 'start' | 'middle' | 'end';
	/**
	 * set a left axis
	 * 
	 * @default false
	 */
	axisLeft?: boolean;
	/**
	 * set a left axis tick values
	 */
	axisLeftTickValues?: number;
	/**
	 * set a left axis tick rotation
	 */
	axisLeftTickRotation?: number;
	/**
	 * set a left axis decimals
	 */
	axisLeftDecimals?: number;
	/**
	 * set a left axis legend (write a axis label!)
	 */
	axisLeftLegend?: string;
	/**
	 * set a left axis legend offset
	 * 
	 * @default -40
	 */
	axisLeftLegendOffset?: number;
	/**
	 * set a left axis legend position
	 * 
	 * @default middle
	 */
	axisLeftLegendPosition?: 'start' | 'middle' | 'end';
	/**
	 * set a point size
	 * 
	 * @default 2
	 */
	pointSize?: number;

	/**
	 * set a marginTop
	 * 
	 * @default 50
	 */
	marginTop?: number;
	/**
	 * set a marginRight
	 * 
	 * @default 110
	 */
	marginRight?: number;
	/**
	 * set a marginBottom
	 * 
	 * @default 50
	 */
	marginBottom?: number;
	/**
	 * set a marginLeft
	 * 
	 * @default 60
	 */
	marginLeft?: number;

	/**
	 * set a x axis decimals
	 */
	xDecimals?: number;
	/**
	 * set a y axis decimals
	 */
	yDecimals?: number;
};

const StyledComponent = styled((props: StyledProps) => {
	/**
	 * 최대값과 최소값 계산 (x, y)
	 */
	// 모든 x 값들과 y 값들에 대한 배열을 만듭니다.
	const allXValues = props.data.flatMap(series => series.data.map(point => point.x));
	const allYValues = props.data.flatMap(series => series.data.map(point => point.y));

	// 모든 x 값들 중에서 최소값과 최대값, 모든 y 값들 중에서 최소값과 최대값을 계산합니다.
	const minX = Math.min(...allXValues);
	const maxX = Math.max(...allXValues);
	const minY = Math.min(...allYValues);
	const maxY = Math.max(...allYValues);

	/**
	 * Grid 갯수 계산 (x, y)
	 */
	// x축의 grid 갯수를 계산합니다.
	let xGridCount = Math.max(props.axisTopTickValues || 0, props.axisBottomTickValues || 0);
	// y축의 grid 갯수를 계산합니다.
	let yGridCount = Math.max(props.axisLeftTickValues || 0, props.axisRightTickValues || 0);

	return (
		<div
			style={{
				width: props.width,
				height: props.height,
			}}
		>
			<ResponsiveLine
				data={props.data}
				colors={props.data.map((item) => item.color)}
				margin={
					{
						top: props.marginTop || 50,
						right: props.marginRight || 110,
						bottom: props.marginBottom || 50,
						left: props.marginLeft || 60,
					}
				}
        xScale={{ 
					type: 'linear', 
					stacked: false, //같은 좌표 2개 있어도 되는 조건
					reverse: false, //좌표계 뒤집는 조건
					min: minX,
					max: maxX,
				}}
				xFormat={`>-.${props.xDecimals || 2}f`}
        yScale={{ 
					type: 'linear', 
					stacked: false, 
					reverse: false,
					min: minY, 
					max: maxY,
				}}
				yFormat={`>-.${props.yDecimals || 2}f`}
				gridXValues={xGridCount !== 0 ? xGridCount : undefined}
				gridYValues={yGridCount !== 0 ? yGridCount : undefined}
				axisTop={props.axisTop ? {
					tickValues: props.axisTopTickValues || undefined, //축 갯수 제한
					tickSize: 5,
					tickPadding: 5,
					tickRotation: props.axisTopTickRotation || undefined,
					legend: props.axisTopLegend || undefined,
					legendOffset: props.axisTopLegendOffset || -36,
					legendPosition: props.axisTopLegendPosition || "middle",
					format: (value: any) => value.toFixed(props.axisTopDecimals), //소수점 2째자리까지 표기
				} : null}
				axisRight={props.axisRight ? {
					tickValues: props.axisRightTickValues || undefined, //축 갯수 제한
					tickSize: 5,
					tickPadding: 5,
					tickRotation: props.axisRightTickRotation || undefined,
					legend: props.axisRightLegend || undefined,
					legendOffset: props.axisRightLegendOffset || 40,
					legendPosition: props.axisRightLegendPosition || "middle",
					format: (value: any) => value.toFixed(props.axisRightDecimals), //소수점 2째자리까지 표기
				} : null}
				axisBottom={props.axisBottom ? {
					tickValues: props.axisBottomTickValues || undefined, //축 갯수 제한
					tickSize: 5,
					tickPadding: 5,
					tickRotation: props.axisBottomTickRotation || undefined,
					legend: props.axisBottomLegend || undefined,
					legendOffset: props.axisBottomLegendOffset || 36,
					legendPosition: props.axisBottomLegendPosition || "middle",
					format: (value: any) => value.toFixed(props.axisBottomDecimals), //소수점 2째자리까지 표기
				} : null}
				axisLeft={props.axisLeft ? {
					tickValues: props.axisLeftTickValues || undefined, //축 갯수 제한
					tickSize: 5,
					tickPadding: 5,
					tickRotation: props.axisLeftTickRotation || undefined,
					legend: props.axisLeftLegend || undefined,
					legendOffset: props.axisLeftLegendOffset || -40,
					legendPosition: props.axisLeftLegendPosition || "middle",
					format: (value: any) => value.toFixed(props.axisLeftDecimals), //소수점 2째자리까지 표기
				} : null}
				pointSize={props.pointSize}
				pointColor={{ theme: "background" }}
				pointBorderWidth={8}
				pointBorderColor={{ from: "serieColor" }}
				pointLabelYOffset={-12}
				useMesh={true}
				curve="linear"
				legends={props.legends ? [
					{
						anchor: "bottom-right",
						direction: "column",
						justify: false,
						translateX: 120,
						translateY: 0,
						itemsSpacing: 0,
						itemDirection: "left-to-right",
						itemWidth: 80,
						itemHeight: 20,
						itemOpacity: 0.75,
						symbolSize: 12,
						symbolShape: "circle",
						symbolBorderColor: "rgba(0, 0, 0, .5)",
						effects: [
							{
								on: "hover",
								style: {
									itemBackground: "rgba(0, 0, 0, .03)",
									itemOpacity: 1,
								},
							},
						],
					},
				] : []}
			/>
		</div>
	)
})
(({theme}) => ({}))


const ThemedComponent = (props: StyledProps) => (
	<MoaStyledComponent>
		<StyledComponent {...props} />
	</MoaStyledComponent>
);
export default ThemedComponent;

const sampleData = [
  {
    "id": "japan",
    "color": "hsl(35, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 71
      },
      {
        "x": "helicopter",
        "y": 201
      },
      {
        "x": "boat",
        "y": 199
      },
      {
        "x": "train",
        "y": 166
      },
      {
        "x": "subway",
        "y": 241
      },
      {
        "x": "bus",
        "y": 119
      },
      {
        "x": "car",
        "y": 212
      },
      {
        "x": "moto",
        "y": 75
      },
      {
        "x": "bicycle",
        "y": 36
      },
      {
        "x": "horse",
        "y": 295
      },
      {
        "x": "skateboard",
        "y": 227
      },
      {
        "x": "others",
        "y": 235
      }
    ]
  },
  {
    "id": "france",
    "color": "hsl(89, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 23
      },
      {
        "x": "helicopter",
        "y": 168
      },
      {
        "x": "boat",
        "y": 226
      },
      {
        "x": "train",
        "y": 94
      },
      {
        "x": "subway",
        "y": 157
      },
      {
        "x": "bus",
        "y": 63
      },
      {
        "x": "car",
        "y": 165
      },
      {
        "x": "moto",
        "y": 222
      },
      {
        "x": "bicycle",
        "y": 72
      },
      {
        "x": "horse",
        "y": 297
      },
      {
        "x": "skateboard",
        "y": 81
      },
      {
        "x": "others",
        "y": 171
      }
    ]
  },
  {
    "id": "us",
    "color": "hsl(57, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 103
      },
      {
        "x": "helicopter",
        "y": 42
      },
      {
        "x": "boat",
        "y": 237
      },
      {
        "x": "train",
        "y": 157
      },
      {
        "x": "subway",
        "y": 216
      },
      {
        "x": "bus",
        "y": 253
      },
      {
        "x": "car",
        "y": 95
      },
      {
        "x": "moto",
        "y": 221
      },
      {
        "x": "bicycle",
        "y": 78
      },
      {
        "x": "horse",
        "y": 261
      },
      {
        "x": "skateboard",
        "y": 261
      },
      {
        "x": "others",
        "y": 230
      }
    ]
  },
  {
    "id": "germany",
    "color": "hsl(231, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 144
      },
      {
        "x": "helicopter",
        "y": 78
      },
      {
        "x": "boat",
        "y": 128
      },
      {
        "x": "train",
        "y": 192
      },
      {
        "x": "subway",
        "y": 295
      },
      {
        "x": "bus",
        "y": 18
      },
      {
        "x": "car",
        "y": 145
      },
      {
        "x": "moto",
        "y": 155
      },
      {
        "x": "bicycle",
        "y": 279
      },
      {
        "x": "horse",
        "y": 132
      },
      {
        "x": "skateboard",
        "y": 101
      },
      {
        "x": "others",
        "y": 97
      }
    ]
  },
  {
    "id": "norway",
    "color": "hsl(210, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 129
      },
      {
        "x": "helicopter",
        "y": 19
      },
      {
        "x": "boat",
        "y": 114
      },
      {
        "x": "train",
        "y": 47
      },
      {
        "x": "subway",
        "y": 113
      },
      {
        "x": "bus",
        "y": 28
      },
      {
        "x": "car",
        "y": 136
      },
      {
        "x": "moto",
        "y": 0
      },
      {
        "x": "bicycle",
        "y": 148
      },
      {
        "x": "horse",
        "y": 263
      },
      {
        "x": "skateboard",
        "y": 128
      },
      {
        "x": "others",
        "y": 21
      }
    ]
  }
]