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
 * @description Variable of TimeDependentBasic.tsx
 */
export const VarConcGrade = atom({
	key: 'VarConcGrade',
	default: 12
});

export const VarConcGamma = atom({
	key: 'VarConcGamma',
	default: "1.5"
});

export const VarConcGammaErr = atom({
	key: 'VarConcGammaErr',
	default: false
});

export const VarGenProp = atom({
	key: 'VarGenProp',
	default:  [
		{
			id: 1,
			desc: '-',
			value: '-',
			unit:'-'
		}
	],
});

/**
 * @description Variable of ConcreteGraph.tsx
 */

export const VarConcChartItemNb = atom({
	key: 'VarConcChartItemNb',
	default: 1
});

/**
 * @description Variable of TabGroupMain.tsx
 */
export const VarTabGroupMain = atom({
	key: 'VarTabGroupMain',
	default: "Material"
});


/**
 * @description Variable of TimeDependentBasic.tsx
 */

export const VarHumidity = atom({
	key: 'VarHumidity',
	default: "70"
});

export const VarNotionalSize = atom({
	key: 'VarNotionalSize',
	default: "1.0"
});

export const VarCementType = atom({
	key: 'VarCementType',
	default: "N"
});

export const VarCodeType = atom({
	key: 'VarCodeType',
	default: "EC2-1"
});

export const VarSilica = atom({
	key: 'VarSilica',
	default: false
});

export const VarTemperature = atom({
	key: 'VarTemperature',
	default: "20"
});

export const VarDayShrinkage = atom({
	key: 'VarDayShrinkage',
	default: "3"
});

export const VarDayCreep = atom({
	key: 'VarDayCreep',
	default: "3"
});

export const VarDayLast = atom({
	key: 'VarDayLast',
	default: "10000"
});

export const VarHumidityErr = atom({
	key: 'VarHumidityErr',
	default: false
});

export const VarNotionalSizeErr = atom({
	key: 'VarNotionalSizeErr',
	default: false
});

export const VarTemperatureErr = atom({
	key: 'VarTemperatureErr',
	default: false
});

export const VarDayCreepErr = atom({
	key: 'VarDayCreepErr',
	default: false
});

export const VarDayShrinkErr = atom({
	key: 'VarDayShrinkErr',
	default: false
});

export const VarDayLastErr = atom({
	key: 'VarDayLastErr',
	default: false
});

/**
 * @description Variable of TimeDependentGraph.tsx
 */

export const VarTDChartStyle = atom({
	key: 'VarTDChartStyle',
	default: 1
});

export const VarRowCreepValue = atom({
	key: 'VarRowCreep',
	default: [
		{
			id: 1,
			desc: 'A',
			value: '0',
		}
	]
});

export const VarRowCreepTime = atom({
	key: 'VarRowCreepTime',
	default: [
		{
			id: 1,
			time: 'A',
			value1: '0',
			value2: '0',
		}
	]
});

export const VarRowShrinkageValue = atom({
	key: 'VarRowShrinkageValue',
	default: [
		{
			id: 1,
			desc: 'A',
			value: '0',
		}
	]
});

export const VarRowShrinkageTime = atom({
	key: 'VarRowShrinkageTime',
	default: [
		{
			id: 1,
			time: 'A',
			value1: '0',
			value2: '0',
		}
	]
});

export const VarRowStrengthTime = atom({
	key: 'VarRowStrengthTime',
	default: [
		{
			id: 1,
			time: 'A',
			value1: '0',
			value2: '0',
		}
	]
});

export const VarDialogConcrete = atom({
	key: 'VarDialogConcrete',
	default: false
});

/**
 * @description Variable of TimeDependentGraph.tsx
 */

export const VarTDResults = atom({
	key: 'VarTDResults',
	default:{
		"Strength":{
			"GraphData": {
				"compStrength" : [],
				"tensStrength" : [],
				"compElastic" : [],
			},
			"TimeDependent" :{
				"t_sm": [0],
				"beta_cc_t" : [0],
				"fcm_t" : [0],
				"fctm_t" : [0],
				"Ecm_t" : [0],
			}
		},
		"Creep" :{
			"GraphData": [],
			"TimeDependent" :{
				"t_c": [0],
				"beta_c_t_t0" : [0],
				"phi_t_t0" : [0],
			},
			"Value" : {
				"alpha_1" : 0,
				"alpha_2" : 0,
				"alpha_3" : 0,
				"beta_H" : 0,
				"phi_RH" : 0,
				"beta_fcm" : 0,
				"tT" : 0,
				"alpha" : 0,
				"t0_adjust" : 0,
				"beta_t0" : 0,
				"phi_0" : 0,
			}
		},
		"Shrinkage" : {
			"GraphData": [],
			"TimeDependent" :{
				"t_s": [0],
				"beta_ds_t_ts" : [0],
				"beta_as_t" : [0],
				"epsilon_ca_t" : [0],
				"epsilon_cd_t" : [0],
				"epsilon_cs_t" : [0],
			},
			"Value" : {
				"epsilon_ca_inf" : 0,
				"epsilon_cd_inf" : 0,
				"epsilon_cs_inf" : 0,
				"kh" : 0,
				"beta_RH" : 0,
				"alpha_ds1" : 0,
				"alpha_ds2" : 0,
				"epsilon_cd_0" : 0,
			}
		}
	}
});

/**
 * @description Variable of ButtonDialog.tsx
 */

export const VarTDaddTab = atom({
	key: 'VarTDaddTab',
	default: "Creep"
});

export const VarConcreteAddInfo = atom({
	key: 'VarConcreteAddInfo',
	default:  [
		{
			id: 1,
			descStrength: 'fcm',
			valueStrength: "0",
			descStrain: 'εc1',
			valueStrain: "0",
		},
		{
			id: 2,
			descStrength: 'fctm',
			valueStrength: "0",
			descStrain: 'εcu1',
			valueStrain: "0",
		},
		{
			id: 3,
			descStrength: 'fctk,0.05',
			valueStrength: "0",
			descStrain: 'εc2',
			valueStrain: "0",
		},
		{
			id: 4,
			descStrength: 'fctk,0.95',
			valueStrength: "0",
			descStrain: 'εcu2',
			valueStrain: "0",
		},
		{
			id: 5,
			descStrength: 'fcd with αcc = 1.00',
			valueStrength: "0",
			descStrain: 'n',
			valueStrain: "0",
		},
		{
			id: 6,
			descStrength: 'fcd with αcc = 0.85',
			valueStrength: "0",
			descStrain: 'εc3',
			valueStrain: "0",
		},
		{
			id: 7,
			descStrength: 'fcd with αcc = 0.80',
			valueStrength: "0",
			descStrain: 'εcu3',
			valueStrain: "0",
		},
	],
});