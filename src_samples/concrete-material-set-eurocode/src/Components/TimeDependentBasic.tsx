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
    VarConcreteGrade,
    VarTimeDependentCode,
    VarHumidity,
    VarNotionalSize,
    VarCementType,
    VarSilica,
    VarTemperature,
    VarDayShrinkage,
    VarDayCreep,
    VarDayLast
} from "./variables";
import { GuideBox, Typography, TextField, Panel, RadioGroup, Radio, Check } from "@midasit-dev/moaui";

const ConcreteBasic = () => {
    const grade = useRecoilValue(VarConcreteGrade);
    
    const [humidity, setHumidity] = useRecoilState(VarHumidity);
    const [notion, setNotion] = useRecoilState(VarNotionalSize);
    const [cement, setCement] = useRecoilState(VarCementType);
    const [ENcode, setENCode] = useRecoilState(VarTimeDependentCode);
    const [silica, setSilica] = useRecoilState(VarSilica);
    const [temperature, setTemperature] = useRecoilState(VarTemperature);
    const [dayShrink, setDayShrink] = useRecoilState(VarDayShrinkage);
    const [dayCreep, setDayCreep] = useRecoilState(VarDayCreep);
    const [dayLast, setDayLast] = useRecoilState(VarDayLast);

    //Error Check
    const [humidityErr, setHumidityErr] = React.useState(false);
    const [notionErr, setNotionErr] = React.useState(false);
    const [dayShrinkErr, setDayShrinkErr] = React.useState(false);
    const [dayCreepErr, setDayCreepErr] = React.useState(false);
    const [dayLastErr, setDayLastErr] = React.useState(false);
    const [temperatureErr, setTemperatureErr] = React.useState(false);

    useValidationEffect(humidity, setHumidityErr, 40, 99);
    useValidationEffect(notion, setNotionErr, 0); // Assuming notion cannot be negative
    useValidationEffect(dayShrink, setDayShrinkErr, 0); // Assuming dayShrink cannot be negative
    useValidationEffect(dayCreep, setDayCreepErr, 0); // Assuming dayCreep cannot be negative

	return (
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
                    <TextInput
                        title="Relative Humidity (40~99), H"
                        unit="%"
                        value={humidity}
                        setValue={setHumidity}
                        error={humidityErr}
                    />
                    <TextInput
                        title="Notional size"
                        unit="m"
                        value={notion}
                        setValue={setNotion}
                        error={notionErr}
                    />
                    <TextInput
                        title="Ambient temperature"
                        unit="℃"
                        value={temperature}
                        setValue={setTemperature}
                        error={temperatureErr}
                    />
                    <TextInput
                        title="Age of concrete at the beginning of shrinkage"
                        unit="day"
                        value={dayShrink}
                        setValue={setDayShrink}
                        error={dayShrinkErr}
                    />
                    <TextInput
                        title="Age of concrete at the loading"
                        unit="day"
                        value={dayCreep}
                        setValue={setDayCreep}
                        error={dayCreepErr}
                    />
                    <TextInput
                        title="Age of concrete at the finishing"
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
                                <RadioGroup defaultValue={2} value={cement} onChange={(e:any)=> setCement(e.target.value)}>
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
                                <RadioGroup value={ENcode} onChange={(e:any)=> setENCode(e.target.value)}>
                                    <Radio name="EN 1992-1 (General Structure)" value={"EC1"} />
                                    <Radio name="EN 1992-2 (Concrete Bridge)" value={"EC2"} />
                                    <GuideBox width="100%" paddingLeft={1}>
                                        <Check name="Use of silica-fume" checked={silica} onChange={(e:any)=> setSilica(e.target.checked)} disabled={ENcode.toString()==="EC1"? true:false}/>
                                    </GuideBox>
                                </RadioGroup>
                            </GuideBox>
                        </GuideBox>
                    </GuideBox>
                </GuideBox>
            </Panel>
        </GuideBox>
	);
};

export default ConcreteBasic;

const useValidationEffect = (value: any, setValueErr: any, minValue:any = null, maxValue:any = null) => {
    React.useEffect(() => {
        if (value === "" || value === undefined || value === null || isNaN(+value) || (minValue !== null && +value <= minValue) || (maxValue !== null && +value > maxValue)) {
            setValueErr(true);
        } else {
            setValueErr(false);
        }
    }, [value, minValue, maxValue, setValueErr]);
};

const TextInput = ({ title, unit, value, setValue, error }:any) => {
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