/*
 *		                           __              /\ \       /\_ \                     
 *		 __  __     __      _ __  /\_\      __     \ \ \____  \//\ \       __     ____  
 *		/\ \/\ \  /'__`\   /\`'__\\/\ \   /'__`\    \ \ '__`\   \ \ \    /'__`\  /',__\ 
 *		\ \ \_/ |/\ \L\.\_ \ \ \/  \ \ \ /\ \L\.\_   \ \ \L\ \   \_\ \_ /\  __/ /\__, `\
 *		 \ \___/ \ \__/.\_\ \ \_\   \ \_\\ \__/.\_\   \ \_,__/   /\____\\ \____\\/\____/
 *		  \/__/   \/__/\/_/  \/_/    \/_/ \/__/\/_/    \/___/    \/____/ \/____/ \/___/ 
*/

import { atom } from 'recoil';

/**
 * @description Variable of ImportSectionButton.tsx
 */
export const VarImportSectionButton = atom<any>({
	key: 'VarImportSectionButton',
	default: {
    selected: '',
		ids: [],
    items: [],
	},
});

/**
 * @description Variable of ChartSelfEqStresses.tsx
 */
export const VarSelfEqStressesTempHeatingChart = atom({
	key: 'VarSelfEqStressesTempHeatingChart',
	default: [
		{
			'id': 'AASHTO_HeatingG',
			'color': '#f47560',
			'data': [
					{ "x": 0.0, "y": 0.0 }
			],
		},
		{
			'id': 'Girder',
			'color': '#333333',
			'data': [
				{ 'x': 0.0, 'y': 0.0 }
			],
		},
	]
});

export const VarSelfEqStressesTempCoolingChart = atom({
	key: 'VarSelfEqStressesTempCoolingChart',
	default: [
		{
			'id': 'AASHTO_CoolingG',
			'color': '#1f78b4',
			'data': [
					{ "x": 0, "y": 0.0 }
			],
		},
		{
			'id': 'Girder',
			'color': '#333333',
			'data': [
				{ 'x': 0.0, 'y': 0.0 }
			],
		},
	],
});

/**
 * @description Variable of TemperatureGradientChart.tsx
 */
export const VarTemperatureGradientChart = atom<any>({
	key: "VarTemperatureGradientChart",
	default: [
		{
			'id': 'Girder',
			'color': '#333333',
			'data': [
				{ 'x': 0.0, 'y': 0.0 }
			],
		},
	]
});

export const VarTemperatureGradientChartLocal = atom<any>({
	key: "VarTemperatureGradientChartLocal",
	default: [
		{
			'id': 'Girder',
			'color': '#333333',
			'data': [
				{ 'x': 0.0, 'y': 0.0 }
			],
		},
	]
});

export const VarTemperatureGradientChartHeatingCheck = atom<boolean>({
	key: "VarTemperatureGradientChartHeatingCheck",
	default: false
});

export const VarTemperatureGradientChartCoolingCheck = atom<boolean>({
	key: "VarTemperatureGradientChartCoolingCheck",
	default: false
});

/**
 * @description Variable of MaterialStressTables.tsx
 */
export const VarMaterialStressTableDataOfTab1 = atom<any>({
	key: "VarMaterialStressTableDataOfTab1",
	default: []
});

export const VarMaterialStressTableDataOfTab2 = atom<any>({
	key: "VarMaterialStressTableDataOfTab2",
	default: []
});

/**
 * @description Variable of ApplyT3.tsx
 */
export const VarApplyT3 = atom({
	key: "VarApplyT3",
	default: true,
});

export const VarApplyT3H = atom({
	key: "VarApplyT3H",
	default: '3',
});

export const VarApplyT3C = atom({
	key: "VarApplyT3C",
	default: '-3',
});

/**
 * @description Variable of GirderMaterial.tsx
 */
export const VarGirderMaterial = atom({
	key: 'VarGirderMaterial',
	default: 1,
});

export const VarGirderMaterialList = atom({
	key: 'VarGirderMaterialList',
	default: [ ['', 1] ],
});

/**
 * @description Variable of Surface.tsx
 */
export const VarSurface = atom({
	key: 'VarSurface',
	default: 2
});

/**
 * @description Variable of Zone.tsx
 */
export const VarZone = atom({
	key: 'VarZone',
	default: 3
});

/**
 * @description Variable of GirderType.tsx
 */
export const VarGirderType = atom({
	key: "VarGirderType",
	default: 'Steel',
});

/**
 * @description Main function Result
 */
export const VarCalculationParseResult = atom<any>({
	key: "VarCalculationParseResult",
	default: {}
});
export const VarForceCalcStress = atom({
	key: "VarForceCalcStress",
	default: false,
});

/**
 * @description Variable of AddButton.tsx
 */
export const VarAddButtonHeating = atom({
	key: "VarAddButtonHeating",
	default: {
    selected: '',
		ids: [],
    items: [],
	}
});

export const VarAddButtonCooling = atom({
	key: "VarAddButtonCooling",
	default: {
    selected: '',
		ids: [],
    items: [],
	}
});
