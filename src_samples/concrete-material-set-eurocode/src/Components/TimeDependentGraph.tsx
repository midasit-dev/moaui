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
import { 
    VarConcreteGrade,
    VarTimeDependentCode,
    VarHumidity,
    VarNotionalSize,
    VarCementType,
    VarSilica,
    VarTemperature,
    VarDayShrinkage,
    VarDayCreep,
    VarDayLast,
    VarConcreteGamma,
    VarConcreteChartStyle
} from "./variables";
import { GuideBox, Typography, Panel, DropList } from "@midasit-dev/moaui";
import { ResponsiveLine } from "@nivo/line";
import { checkPyScriptReady } from '../pyscript_utils';

const TimeDependentGraph = () => {
    const grade = useRecoilValue(VarConcreteGrade);
    const partial_factor = useRecoilValue(VarConcreteGamma);

    const humidity= useRecoilValue(VarHumidity);
    const notion = useRecoilValue(VarNotionalSize);
    const cement = useRecoilValue(VarCementType);
    const ENcode = useRecoilValue(VarTimeDependentCode);
    const silica = useRecoilValue(VarSilica);
    const temperature = useRecoilValue(VarTemperature);
    const dayShrink = useRecoilValue(VarDayShrinkage);
    const dayCreep = useRecoilValue(VarDayCreep);
    const dayLast = useRecoilValue(VarDayLast);

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
        ['Creep coefficients', 1],
        ['Shrinkage stain', 2],
        ['Mean compressive strength', 3],
        ['Mean tensile strength', 4],
        ['Elastic modulus', 5]
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
            const input_json = {
                "grade": grade,
                "partial_factor": partial_factor,
                "humidity": humidity,
                "notion": notion,
                "cement": cement,
                "ENcode": ENcode,
                "silica": silica,
                "temperature": temperature,
                "dayShrink": dayShrink,
                "dayCreep": dayCreep,
                "dayLast": dayLast
            }
            const timedependent = pyscript.interpreter.globals.get("creep_shrinkage_comps");
            const results = timedependent(JSON.stringify(input_json));
            const parsed_results = JSON.parse(results);
            console.log(parsed_results)
            let new_charts_data = [];
            let new_charts_color = [];
            let maxY= 0;

            if (chartStyle === 1) {
                new_charts_data.push({
                    id: "Creep Coefficients",
                    lineType: "solid",
                    areaType: "Full",
                    data: parsed_results.Creep.GraphData
                })
                new_charts_color.push("rgb(97, 205, 187)")

                maxY = parsed_results.Creep.GraphData[0].y;
                for (const point of parsed_results.Creep.GraphData) {
                    if (point.y > maxY) {
                        maxY = point.y;
                    }
                }
                maxY = (maxY * 1.1);
                maxY = Math.ceil(maxY);

            } else if (chartStyle === 2) {
                new_charts_data.push({
                    id: "Shrinkage Strain",
                    lineType: "solid",
                    areaType: "Full",
                    data: parsed_results.Shrinkage.GraphData
                })
                new_charts_color.push("rgb(97, 205, 187)")

                maxY = parsed_results.Shrinkage.GraphData[0].y;
                for (const point of parsed_results.Shrinkage.GraphData) {
                    if (point.y > maxY) {
                        maxY = point.y;
                    }
                }
                maxY = (maxY * 1.1);
                maxY = Math.ceil(maxY);

            } else if (chartStyle === 3) {
                new_charts_data.push({
                    id: "Mean compressive strength",
                    lineType: "solid",
                    areaType: "Full",
                    data: parsed_results.Strength.GraphData.compStrength
                })
                new_charts_color.push("rgb(97, 205, 187)")

                maxY = parsed_results.Strength.GraphData.compStrength[0].y;
                for (const point of parsed_results.Strength.GraphData.compStrength) {
                    if (point.y > maxY) {
                        maxY = point.y;
                    }
                }
                maxY = (maxY * 1.1);
                maxY = Math.ceil(maxY);

            } else if (chartStyle === 4) {
                new_charts_data.push({
                    id: "Mean tensile strength",
                    lineType: "solid",
                    areaType: "Full",
                    data: parsed_results.Strength.GraphData.tensStrength
                })
                new_charts_color.push("rgb(97, 205, 187)")

                maxY = parsed_results.Strength.GraphData.tensStrength[0].y;
                for (const point of parsed_results.Strength.GraphData.tensStrength) {
                    if (point.y > maxY) {
                        maxY = point.y;
                    }
                }
                maxY = (maxY * 1.1);
                maxY = Math.ceil(maxY);
            } else if (chartStyle === 5) {
                new_charts_data.push({
                    id: "Elastic Modulus",
                    lineType: "solid",
                    areaType: "Full",
                    data: parsed_results.Strength.GraphData.compElastic
                })
                new_charts_color.push("rgb(97, 205, 187)")

                maxY = parsed_results.Strength.GraphData.compElastic[0].y;
                for (const point of parsed_results.Strength.GraphData.compElastic) {
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
    }, [humidity, notion, cement, ENcode, silica, temperature, dayShrink, dayCreep, dayLast, grade, partial_factor, chartStyle, setChartData, setChartColor, setYscalemax]);

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

export default TimeDependentGraph;

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
                }}
                xFormat=">-.0f"
                yScale={{
                    type: 'linear',
                    max: yscaleMax,
                    min: 0,
                    stacked: false,
                    reverse: false,
                }}
                yFormat=">-.3f"
                curve="linear"
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: -30,
                    legend: 'Strain, εc (‰)',
                    legendOffset: 36,
                    legendPosition: 'middle',
                    format: (value) => `${value.toFixed(0)}`
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