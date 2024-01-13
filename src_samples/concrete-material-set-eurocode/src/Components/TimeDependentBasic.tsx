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
import { useRecoilState, useRecoilValue } from "recoil";
import { 
    VarConcGrade,
    VarCodeType,
    VarHumidity,
    VarNotionalSize,
    VarCementType,
    VarSilica,
    VarTemperature,
    VarDayShrinkage,
    VarDayCreep,
    VarDayLast,
    VarHumidityErr,
    VarNotionalSizeErr,
    VarTemperatureErr,
    VarDayCreepErr,
    VarDayShrinkErr,
    VarDayLastErr,
    VarTDChartStyle,
    VarTDResults
} from "./variables";
import { GuideBox, Typography, TextField, Panel, RadioGroup, Radio, Check, DropList } from "@midasit-dev/moaui";
import { useValidationRange1, useValidationRange2, useValidationDepend, TextFiledwithTitleUnit } from './ComponentUser';
import { checkPyScriptReady } from '../pyscript_utils';
import { chartBasic } from './ComponentUser';
import { useSnackbar } from 'notistack';

const TimeDependentBasic = () => {
    const grade = useRecoilValue(VarConcGrade);
    const [TDResults, setTDResults] = useRecoilState(VarTDResults);

    const [humidity, setHumidity] = useRecoilState(VarHumidity);
    const [notionalSize, setNotionSize] = useRecoilState(VarNotionalSize);
    const [cementType, setCementType] = useRecoilState(VarCementType);
    const [codeType, setCodeType] = useRecoilState(VarCodeType);
    const [silica, setSilica] = useRecoilState(VarSilica);
    const [temperature, setTemperature] = useRecoilState(VarTemperature);
    const [dayCreep, setDayCreep] = useRecoilState(VarDayCreep);
    const [dayShrink, setDayShrink] = useRecoilState(VarDayShrinkage);
    const [dayLast, setDayLast] = useRecoilState(VarDayLast);

    //Error Check
    const [humidityErr, setHumidityErr] = useRecoilState(VarHumidityErr);
    const [notionalSizeErr, setNotionalSizeErr] = useRecoilState(VarNotionalSizeErr);
    const [temperatureErr, setTemperatureErr] = useRecoilState(VarTemperatureErr);
    const [dayCreepErr, setDayCreepErr] = useRecoilState(VarDayCreepErr);
    const [dayShrinkErr, setDayShrinkErr] = useRecoilState(VarDayShrinkErr);
    const [dayLastErr, setDayLastErr] = useRecoilState(VarDayLastErr);
    
    const [chartData, setChartData] = React.useState([{id: "Area", lineType: "solid", areaType: "empty", data: [{x: 0,y: 0}]}]);
    const [chartColor, setChartColor]=React.useState([
        "rgb(97, 205, 187)",
        "rgb(255, 127, 14)"
    ]);

    const [yscalemax, setYscalemax] = React.useState(0.0);
    const [xscalemax, setXscalemax] = React.useState(0.0);
    const [chartStyle, setChartStyle] = useRecoilState(VarTDChartStyle);
    const chartItem = new Map<string, number>([
        ['Creep coefficients', 1],
        ['Shrinkage stain', 2],
        ['Mean compressive strength', 3],
        ['Mean tensile strength', 4],
        ['Elastic modulus', 5]
    ]);

    const [legendY, setLegendY] = React.useState("");

    //Error Check
    useValidationRange2(humidity, setHumidityErr, 40, 99);
    useValidationRange1(notionalSize, setNotionalSizeErr, 0);
    useValidationRange2(temperature, setTemperatureErr, -40, 40);
    useValidationRange1(dayCreep, setDayCreepErr, 0);
    useValidationRange1(dayShrink, setDayShrinkErr, 0);
    useValidationDepend(dayLast, setDayLastErr, dayCreep, dayShrink);
    
    //Snackbar
    const { enqueueSnackbar } = useSnackbar();

    React.useEffect(() => {

        checkPyScriptReady(() => {

            const timedependent = pyscript.interpreter.globals.get("creep_shrinkage_comps");
            const results = timedependent(JSON.stringify({
                "grade": grade,
                "humidity": humidity,
                "notionalSize": notionalSize,
                "cementType": cementType,
                "codeType": codeType,
                "silica": silica,
                "temperature": temperature,
                "dayShrink": dayShrink,
                "dayCreep": dayCreep,
                "dayLast": dayLast
            }));
            const parsedTDresults = JSON.parse(results);
            
			if (parsedTDresults.hasOwnProperty("error")) {
				enqueueSnackbar(parsedTDresults["error"], { variant: "error" });
                setChartData([{id: "error", lineType: "solid", areaType: "empty", data: [{x: 0, y: 0}]}])
				return;
            }

            let new_charts_data = [];
            let new_charts_color = [];
            let new_maxY= 0;

            const yscale = (graphData : any) => {
                let maxY = graphData[0].y;
                for (const point of graphData) {
                    if (point.y > maxY) {
                        maxY = point.y;
                    }
                }
                maxY = (maxY * 1.1);
                maxY = Math.ceil(maxY);
                return maxY
            };

            if (chartStyle === 1) {
                new_charts_data.push({
                    id: "Creep Coefficients",
                    lineType: "solid",
                    areaType: "Full",
                    data: parsedTDresults.Creep.GraphData
                });
                new_charts_color.push("rgb(97, 205, 187)");
                new_maxY = yscale(parsedTDresults.Creep.GraphData);
                setXscalemax(parseFloat(dayLast));
                setLegendY("Creep Coefficients, φ")
            } else if (chartStyle === 2) {
                new_charts_data.push({
                    id: "Shrinkage Strain",
                    lineType: "solid",
                    areaType: "Full",
                    data: parsedTDresults.Shrinkage.GraphData
                });
                new_charts_color.push("rgb(97, 205, 187)");
                new_maxY = yscale(parsedTDresults.Shrinkage.GraphData);
                setXscalemax(parseFloat(dayLast));
                setLegendY("Shrinkage strain, εcs")
            } else if (chartStyle === 3) {
                new_charts_data.push({
                    id: "Mean compressive strength",
                    lineType: "solid",
                    areaType: "Full",
                    data: parsedTDresults.Strength.GraphData.compStrength
                });
                new_charts_color.push("rgb(97, 205, 187)");
                new_maxY = yscale(parsedTDresults.Strength.GraphData.compStrength);
                setXscalemax(30);
                setLegendY("Compressive strength, fcm (MPa)")

            } else if (chartStyle === 4) {
                new_charts_data.push({
                    id: "Mean tensile strength",
                    lineType: "solid",
                    areaType: "Full",
                    data: parsedTDresults.Strength.GraphData.tensStrength
                });
                new_charts_color.push("rgb(97, 205, 187)");
                new_maxY = yscale(parsedTDresults.Strength.GraphData.tensStrength);
                setXscalemax(30);
                setLegendY("Tensile strength, fctm (MPa)")

            } else if (chartStyle === 5) {
                new_charts_data.push({
                    id: "Elastic Modulus",
                    lineType: "solid",
                    areaType: "Full",
                    data: parsedTDresults.Strength.GraphData.compElastic
                })
                new_charts_color.push("rgb(97, 205, 187)")
                new_maxY = yscale(parsedTDresults.Strength.GraphData.compElastic);
                setXscalemax(30);
                setLegendY("Elastic modulus, Ecm (GPa)")

            }

            setYscalemax(new_maxY);
            setChartData(new_charts_data);
            setChartColor(new_charts_color);
            setTDResults(parsedTDresults);
        });
    },[
        grade,
        humidity,
        notionalSize,
        cementType,
        codeType,
        silica,
        temperature,
        dayShrink,
        dayCreep,
        dayLast,
        chartStyle,
        setTDResults,
        enqueueSnackbar
    ])


	return (
        <GuideBox row width='100%' spacing={1}>
            <GuideBox show={false} width={500} column spacing={1}>
                <Panel variant="shadow2" width="100%" height={380}>
                    <GuideBox width="100%" column spacing={1}>
                        <GuideBox width="100%" row horSpaceBetween verCenter>
                            <Typography>
                                Mean concrete strenght, fcm
                            </Typography>
                            <GuideBox row verCenter spacing={1}>
                                <TextField
                                    type="number"
                                    width={120}
                                    value={grade.toString()}
                                    disabled
                                />
                                <Typography width={25}>
                                    MPa
                                </Typography>
                            </GuideBox>
                        </GuideBox>
                        <TextFiledwithTitleUnit
                            title="Relative Humidity (40~99), RH"
                            unit="%"
                            value={humidity}
                            setValue={setHumidity}
                            error={humidityErr}
                        />
                        <TextFiledwithTitleUnit
                            title="Notional size, h0"
                            unit="m"
                            value={notionalSize}
                            setValue={setNotionSize}
                            error={notionalSizeErr}
                        />
                        <TextFiledwithTitleUnit
                            title="Ambient temperature, T"
                            unit="℃"
                            value={temperature}
                            setValue={setTemperature}
                            error={temperatureErr}
                        />
                        <TextFiledwithTitleUnit
                            title="Age of concrete at the beginning of shrinkage, cs"
                            unit="day"
                            value={dayShrink}
                            setValue={setDayShrink}
                            error={dayShrinkErr}
                        />
                        <TextFiledwithTitleUnit
                            title="Age of concrete at the loading, t0"
                            unit="day"
                            value={dayCreep}
                            setValue={setDayCreep}
                            error={dayCreepErr}
                        />
                        <TextFiledwithTitleUnit
                            title="Age of concrete at the finishing, tf"
                            unit="day"
                            value={dayLast}
                            setValue={setDayLast}
                            error={dayLastErr}
                        />
                        <GuideBox width="100%" row paddingTop={1}> 
                            <GuideBox width="50%" column spacing={1}>
                                <Typography>
                                    Type of cement
                                </Typography>
                                <GuideBox width="100%" paddingLeft={3}>
                                    <RadioGroup defaultValue={2} value={cementType} onChange={(e:any)=> setCementType(e.target.value)}>
                                        <Radio name="Class S : 0.38" value={"S"} />
                                        <Radio name="Class N : 0.25" value={"N"} />
                                        <Radio name="Class R : 0.20" value={"R"} />
                                    </RadioGroup>
                                </GuideBox>
                            </GuideBox>
                            <GuideBox width="50%" column spacing={1}>
                                <Typography>
                                    Type of code
                                </Typography>
                                <GuideBox width="100%" paddingLeft={3}>
                                    <RadioGroup value={codeType} onChange={(e:any)=> setCodeType(e.target.value)}>
                                        <Radio name="EN 1992-1 (General Structure)" value={"EC2-1"} />
                                        <Radio name="EN 1992-2 (Concrete Bridge)" value={"EC2-2"} />
                                        <GuideBox width="100%" paddingLeft={1}>
                                            <Check name="Use of silica-fume" checked={silica} onChange={(e:any)=> setSilica(e.target.checked)} disabled={codeType.toString()==="EC2-1"? true:false}/>
                                        </GuideBox>
                                    </RadioGroup>
                                </GuideBox>
                            </GuideBox>
                        </GuideBox>
                    </GuideBox>
                </Panel>
            </GuideBox>
            <GuideBox show={false} width={600} column>
            <Panel variant="shadow2" width="100%" height={380}>
                <GuideBox width="100%" row horSpaceBetween verCenter>
                    <Typography>
                        Time-Dependent Graph for
                    </Typography>
                    <DropList
                        itemList={chartItem}
                        width={380}
                        value={chartStyle}
                        onChange={(e: any) => setChartStyle(e.target.value)}
                    />
                </GuideBox>
                <GuideBox width="100%">
                    {chartBasic(chartData, chartColor, yscalemax, xscalemax, "Time (day)", legendY)}
                </GuideBox>
            </Panel>
        </GuideBox>
        </GuideBox>
	);
};

export default TimeDependentBasic;

