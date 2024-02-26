import { SetterOrUpdater } from "recoil";
import { checkPyScriptReady } from "./pyscript_utils";

// example) 1: NAME
export const idItemString = (value: any, index: number) => {
	return `${value.ids[index]}: ${value.items[index]}`;
}

// example) "1: NAME" -> 1 (number)
export const parseId = (idItemStr: string) => {
	return parseInt(idItemStr.split(':')[0]);
}

export const stressCalculation = (
	//From UI Values
	importSectionValue: any,
	girderMatlValue: number,
	zoneValue: number,
	surfaceValue: number,
	applyT3: boolean,
	applyT3H: string,
	applyT3C: string,

	//State Update Function
	setCalcValue: SetterOrUpdater<any>,
	setTempGradientChartValue: SetterOrUpdater<any>,
	setSelfEqStressLeftValue: SetterOrUpdater<any>,
	setSelfEqStressRightValue: SetterOrUpdater<any>,
) => {
	if (importSectionValue.selected !== "") {
		return checkPyScriptReady(() => {
			const section_Key = parseId(importSectionValue.selected);
			const main_func =
				pyscript.interpreter.globals.get("stress_calculation");
			const results = main_func(
				section_Key,
				girderMatlValue,
				zoneValue,
				surfaceValue,
				applyT3,
				parseFloat(applyT3H),
				parseFloat(applyT3C)
			);
			const paringResults = JSON.parse(results);
			if (paringResults.hasOwnProperty("error")) {
				return paringResults["error"];
			}

			setCalcValue(paringResults);

			setTempGradientChartValue([
				{
					id: "TempHeating",
					color: "#f47560",
					data: paringResults["chart_temp_h"],
				},
				{
					id: "TempCooling",
					color: "#1f78b4",
					data: paringResults["chart_temp_c"],
				},
				{
					id: "Girder",
					color: "#333333",
					data: paringResults["chart_girder"],
				},
			]);

			//Update Self Equilibrating Stresses Chart Values
			setSelfEqStressLeftValue([
				{
					id: "AASHTO_HeatingG",
					color: "#f47560",
					data: paringResults["chart_heating"],
				},
				{
					id: "Girder",
					color: "#333333",
					data: paringResults["chart_girder"],
				},
			]);

			setSelfEqStressRightValue([
				{
					id: "AASHTO_CoolingG",
					color: "#1f78b4",
					data: paringResults["chart_cooling"],
				},
				{
					id: "Girder",
					color: "#333333",
					data: paringResults["chart_girder"],
				},
			]);

			return paringResults;
		});
	}

	return {
		error: "No Section Selected",
	}
}