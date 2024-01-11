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
import { useRecoilValue, useRecoilState } from "recoil";
import { VarConcreteGrade, VarConcreteGamma, VarConcreteChartStyle } from "./variables";
import { GuideBox, Typography, Panel, DropList } from "@midasit-dev/moaui";
import { ResponsiveLine } from "@nivo/line";
import { checkPyScriptReady } from '../pyscript_utils';

const ConcreteGraph = () => {
    const grade = useRecoilValue(VarConcreteGrade);
    const partial_factor = useRecoilValue(VarConcreteGamma);

    const [chartData, setChartData] = React.useState([
        {
            id: "Area",
            lineType: "solid",
            data: [
                {
                    x: 0,
                    y: 0
                }
            ]
        }
    ]);
    const [chartColor, setChartColor]=React.useState([
        "rgb(97, 205, 187)",
        "rgb(255, 127, 14)"
    ]);

    const [yscalemax, setYscalemax] = React.useState(0.0);
    const [chartStyle, setChartStyle] = useRecoilState(VarConcreteChartStyle);
    const chartItem = new Map<string, number>([
        ['for non-linear structural analysis', 1],
        ['for the design of cross-section: Parabola-rectangle', 2],
        ['for the design of cross-section: Bi-linear', 3],
    ]);

    React.useEffect(() => {
        checkPyScriptReady(() => {
            if (partial_factor===undefined || partial_factor===null || isNaN(+partial_factor) || +partial_factor <= 1) {
                let defaultData = [
                    {
                        id: "",
                        lineType: "solid",
                        data: [
                            {
                                x: 0,
                                y: 0
                            }
                        ]
                    }
                ];
                setChartData(defaultData);
                return;
            }
            const properties = pyscript.interpreter.globals.get("stain_stress_curve");
            const results = properties(grade, parseFloat(partial_factor));
            const parsed_results = JSON.parse(results);

            let new_charts_data = [];
            let new_charts_color = [];
            let maxY= 0;

            if (chartStyle === 1) {
                new_charts_data.push({
                    id: "stress-strain relation",
                    lineType: "solid",
                    areaType: "Full",
                    data: parsed_results.nonlinear
                })
                new_charts_color.push("rgb(97, 205, 187)")

                new_charts_data.push({
                    id: "elastic modulus",
                    lineType: "dotted",
                    areaType: "empty",
                    data: parsed_results.elastic_modulus
                })
                new_charts_color.push("rgb(255, 127, 14)")

                maxY = parsed_results.nonlinear[0].y;
                for (const point of parsed_results.nonlinear) {
                    if (point.y > maxY) {
                        maxY = point.y;
                    }
                }
                maxY = (maxY * 1.1);
                maxY = Math.ceil(maxY);


            } else if (chartStyle === 2) {
                new_charts_data.push({
                    id: "fcd with αcc = 0.80",
                    lineType: "dotted",
                    areaType: "min",
                    data: parsed_results.parabola_min
                })
                new_charts_color.push("rgb(97, 205, 187)")

                new_charts_data.push({
                    id: "fcd with αcc = 0.85",
                    lineType: "solid",
                    areaType: "mean",
                    data: parsed_results.parabola_bridge
                })
                new_charts_color.push("rgb(97, 205, 187)")

                new_charts_data.push({
                    id: "fcd with αcc = 1.00",
                    lineType: "dotted",
                    areaType: "max",
                    data: parsed_results.parabola_max
                })
                new_charts_color.push("rgb(97, 205, 187)")

                new_charts_data.push({
                    id: "fck",
                    lineType: "solid",
                    areaType: "empty",
                    data: parsed_results.parabola_pure
                })
                new_charts_color.push("rgb(52, 58, 63)")

                maxY = parsed_results.parabola_pure[0].y;
                for (const point of parsed_results.parabola_pure) {
                    if (point.y > maxY) {
                        maxY = point.y;
                    }
                }
                maxY = (maxY * 1.1);
                maxY = Math.ceil(maxY);

            } else if (chartStyle === 3) {
                new_charts_data.push({
                    id: "fcd with αcc = 0.80",
                    lineType: "dotted",
                    areaType: "min",
                    data: parsed_results.bilinear_min
                })
                new_charts_color.push("rgb(97, 205, 187)")

                new_charts_data.push({
                    id: "fcd with αcc = 0.85",
                    lineType: "solid",
                    areaType: "mean",
                    data: parsed_results.bilinear_bridge
                })
                new_charts_color.push("rgb(97, 205, 187)")

                new_charts_data.push({
                    id: "fcd with αcc = 1.00",
                    lineType: "dotted",
                    areaType: "max",
                    data: parsed_results.bilinear_max
                })
                new_charts_color.push("rgb(97, 205, 187)")

                new_charts_data.push({
                    id: "fck",
                    lineType: "solid",
                    areaType: "empty",
                    data: parsed_results.bilinear_pure
                })
                new_charts_color.push("rgb(52, 58, 63)")

                maxY = parsed_results.bilinear_pure[0].y;
                for (const point of parsed_results.bilinear_pure) {
                    if (point.y > maxY) {
                        maxY = point.y;
                    }
                }
                maxY = (maxY * 1.1);
                maxY = Math.ceil(maxY);
            }

            setYscalemax(maxY);
            setChartData(new_charts_data);
            setChartColor(new_charts_color);
        })
    }, [grade, partial_factor, chartStyle, setChartData]);

    return (
        <GuideBox show={false} width={600} column>
            <Panel variant="shadow2" width="100%" height={380}>
                <GuideBox width="100%" row horSpaceBetween verCenter>
                    <Typography>
                        Stress-Strain relation of Concrete
                    </Typography>
                    <DropList
                        itemList={chartItem}
                        width={380}
                        value={chartStyle}
                        onChange={(e: any) => setChartStyle(e.target.value)}
                    />
                </GuideBox>
                <GuideBox width="100%">
                    {chartArea(chartData, chartColor, yscalemax)}
                </GuideBox>
            </Panel>
        </GuideBox>
    );
};

export default ConcreteGraph;

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
            console.log(areaData)
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


function chartArea(charts_data: any, color: any, yscaleMax: number) {
    return (
        <div style={{ position: 'absolute', height: '330px', width: '580px' }}>
            <ResponsiveLine
                data={charts_data}
                colors={color}
                theme={{ axis: { legend: { text: { fontSize: "11px", fontWeight: "bold" } } } }}
                margin={{ top: 30, right: 20, bottom: 50, left: 60 }}
                xScale={{
                    type: 'linear',
                    min: 0,
                    max: 3.5,
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
                    legend: 'Strain, εc (‰)',
                    legendOffset: 36,
                    legendPosition: 'middle',
                    format: (value) => `${value.toFixed(1)}`
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: -30,
                    legend: 'Stress, σ (MPa)',
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
                        translateX: -50,
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