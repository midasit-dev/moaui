/**
 *		                                                                         __      
 *		                                                                        /\ \__   
 *		  ___     ___     ___ ___     _____     ___     ___       __     ___    \ \ ,_\  
 *		 /'___\  / __`\ /' __` __`\  /\ '__`\  / __`\ /' _ `\   /'__`\ /' _ `\   \ \ \/  
 *		/\ \__/ /\ \L\ \/\ \/\ \/\ \ \ \ \L\ \/\ \L\ \/\ \/\ \ /\  __/ /\ \/\ \   \ \ \_ 
 *		\ \____\\ \____/\ \_\ \_\ \_\ \ \ ,__/\ \____/\ \_\ \_\\ \____\\ \_\ \_\   \ \__\
 *		 \/____/ \/___/  \/_/\/_/\/_/  \ \ \/  \/___/  \/_/\/_/ \/____/ \/_/\/_/    \/__/
 *		                                \ \_\                                            
 *		                                 \/_/                                            
 */

import React from "react";
import { ResponsiveLine } from "@nivo/line";
import { GuideBox, Typography, TextField } from "@midasit-dev/moaui";

export const useValidationRange1 = (value: any, setValueErr: any, minValue:any = null, maxValue:any = null) => {
    React.useEffect(() => {    
        if (value === "" || value === undefined || value === null || isNaN(+value) || (minValue !== null && +value <= minValue) || (maxValue !== null && +value > maxValue)) {
            setValueErr(true);
        } else {
            setValueErr(false);
        }
    }, [value, minValue, maxValue, setValueErr]);
};

export const useValidationRange2 = (value: any, setValueErr: any, minValue:any = null, maxValue:any = null) => {
    React.useEffect(() => {
        if (value === "" || value === undefined || value === null || isNaN(+value) || (minValue !== null && +value < minValue) || (maxValue !== null && +value > maxValue)) {
            setValueErr(true);
        } else {
            setValueErr(false);
        }
    }, [value, minValue, maxValue, setValueErr]);
}

export const useValidationDepend = (value: any, setValueErr: any, Value1:any , Value2:any) => {
    React.useEffect(() => {
        let maxDay = Math.max(parseFloat(Value1), parseFloat(Value2));
        if (maxDay < parseFloat(value)) {
            setValueErr(false);
        } else {
            setValueErr(true);
        }
    }, [value, Value1, Value2, setValueErr]);
}

export const TextFiledwithTitleUnit = ({ title, unit, value, setValue, error }:any) => {
    return (
        <GuideBox width="100%" row horSpaceBetween verCenter>
            <Typography>
                {title}
            </Typography>
            <GuideBox row verCenter spacing={1}>
                <TextField
                    type="number"
                    width={120}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    error={error}
                />
                <Typography width={25}>
                    {unit}
                </Typography>
            </GuideBox>
        </GuideBox>
    );
};

// Customized Lines
const styleByType:any = {
    dotted: {
        strokeDasharray: "10, 5",
        strokeWidth: 2,
    },
    solid: {
        strokeWidth: 2,
    }
};

const DashedLine = ({ series, lineGenerator, xScale, yScale }: any) => {
    return series.map(({ id, data, color, lineType }: any) => {
        return (
            <path
                key={id}
                d={lineGenerator(
                    data.map((d: any) => ({
                        x: xScale(d.data.x),
                        y: yScale(d.data.y)
                    }))
                )}
                fill="none"
                stroke={color}
                style={styleByType[lineType] || styleByType.solid}
            />
        );
    });
};

// Customized ScatterPlot
const scatterPlot = ({ series, xScale, yScale }: any) => {
    return series.map(({ id, data, color }: any) => {
        return data
            .filter((d: any) => d.data.x_scatter !== undefined)
            .map((d: any, i: any) => (
                <circle
                    key={`${id}.${i}`}
                    cx={xScale(d.data.x_scatter)}
                    cy={yScale(d.data.y_scatter)}
                    r={3}
                    fill={color}
                />
            ));
    });
};

// Customized Area
const lineArea = ({ series, xScale, yScale}: any) => {
    return series.map(({ id, data, color, areaType  }: any) => {
        if (areaType === "empty" || areaType === "min" || areaType === "max") {
            return [];
        }
        
        let areaData: any = [];
        let startPt: any;
        let endPt: any;
        if (areaType === "Full") {
            areaData = data;
            startPt = {
                "x":data[0].data.x,
                "y":0
            }
            endPt = {
                "x":data[data.length-1].data.x,
                "y":0
            }

        } else if (areaType === "mean") {
            let minData: any = series.find((d: any) => d.areaType === "min").data;
            let maxData: any = series.find((d: any) => d.areaType === "max").data;
            areaData = [...maxData, ...minData.reverse()];
            
            startPt = {
                "x":data[0].data.x,
                "y":0
            }
            endPt = {
                "x":areaData[areaData.length-2].data.x,
                "y":areaData[areaData.length-2].data.y
            }
        }

        return (
            <path
                key={id}
                d={`
                    M ${xScale(startPt.x)} ${yScale(startPt.y)}
                    L ${xScale(areaData[0].data.x)} ${yScale(areaData[0].data.y)}
                    ${areaData.slice(1).map((d: any) => `L ${xScale(d.data.x)} ${yScale(d.data.y)}`).join(' ')}
                    L ${xScale(endPt.x)} ${yScale(endPt.y)}
                    Z
                `}
                fill={color}
                fillOpacity={0.1}
            />
        );
    });
}


export function chartBasic(charts_data: any, color: any, yscaleMax: number, xscaleMax: number, legendX: string, legendY:string) {
    return (
        <div style={{ position: 'absolute', height: '315px', width: '580px' }}>
            <ResponsiveLine
                data={charts_data}
                colors={color}
                theme={{ axis: { legend: { text: { fontSize: "11px", fontWeight: "bold" } } } }}
                margin={{ top: 30, right: 20, bottom: 60, left: 60 }}
                xScale={{
                    type: 'linear',
                    min: 0,
                    max: xscaleMax,
                }}
                xFormat=">-.2f"
                yScale={{
                    type: 'linear',
                    max: yscaleMax,
                    min: 0,
                    stacked: false,
                    reverse: false,
                }}
                yFormat=">-.1f"
                curve="linear"
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: -30,
                    legend: legendX,
                    legendOffset: 45,
                    legendPosition: 'middle',
                    format: (value) => `${value.toFixed(1)}`
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: -30,
                    legend: legendY,
                    legendOffset: -45,
                    legendPosition: 'middle',
                    format: (value) => `${value.toFixed(1)}`
                }}
                enablePoints={false}
                useMesh={true}
                layers={[
                    "grid",
                    "markers",
                    "axes",
                    'crosshair',
                    lineArea,
                    DashedLine,
                    scatterPlot,
                    "slices",
                    "points",
                    "mesh",
                    "legends",
                    "legends",
                ]}
                legends={[
                    {
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: -80,
                        translateY: -10,
                        itemsSpacing: 0,
                        itemDirection: 'left-to-right',
                        itemWidth: 80,
                        itemHeight: 20,
                        itemOpacity: 0.75,
                        symbolSize: 6,
                        symbolShape: 'circle',
                        symbolBorderColor: 'rgba(0, 0, 0, .5)',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemBackground: 'rgba(0, 0, 0, .03)',
                                    itemOpacity: 1
                                }
                            }
                        ]
                    }
                ]}
            />
        </div>
    )
}