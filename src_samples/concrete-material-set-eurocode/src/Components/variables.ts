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
 * @description Variable of TimeHistoryFunction.tsx
 */
export const VarGeneralProperties = atom({
	key: 'VarGeneralProperties',
	default:  [
		{
			id: 1,
			desc: 'Density, ρ',
			value: '-',
			unit:'kN/m3/g'
		},
		{
			id: 2,
			desc: 'Unit Weight, w',
			value: '-',
			unit:'kN/m3'
		},
		{
			id: 3,
			desc: 'Elastic Modulus, E',
			value: '-',
			unit:'MPa'
		},
		{
			id: 4,
			desc: 'Shear Modulus, G',
			value: '-',
			unit:'MPa'
		},
		{
			id: 5,
			desc: 'poisson\'s ratio, ν',
			value: '-',
			unit:'-'
		},
		{
			id: 6,
			desc: 'Coefficient of thermal expansion, α',
			value: "-",
			unit:'1/°C'
		}
	],
});

export const VarStrengthProperties = atom({
	key: 'VarStrengthProperties',
	default:  [
		{
			id: 1,
			desc: 'fcm',
			value: 0,
		},
		{
			id: 2,
			desc: 'fctm',
			value: 0,
		},
		{
			id: 3,
			desc: 'fctk,0.05',
			value: 0,
		},
		{
			id: 4,
			desc: 'fctk,0.95',
			value: 0,
		},
		{
			id: 5,
			desc: 'fcd',
			value: 0,
			unit:'-'
		},
		{
			id: 6,
			desc: 'Coefficient of thermal expansion, α',
			value: 0,
			unit:'1/°C'
		}
	],
});

export const VarDialogConcrete = atom({
	key: 'VarDialogConcrete',
	default: false
});

export const VarConcreteGrade = atom({
	key: 'VarConcreteGrade',
	default: 12
});

export const VarConcreteGamma = atom({
	key: 'VarConcreteGamma',
	default: "1.5"
});

export const VarConcreteGammaError = atom({
	key: 'VarConcreteGammaError',
	default: false
});

export const VarConcreteChartStyle = atom({
	key: 'VarConcreteChartStyle',
	default: 1
});

/**
 * @description Variable of DimeDependentBasic.tsx
 */
export const VarTimeDependentCode = atom({
	key: 'VarTimeDependentCode',
	default: "EC1"
});

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
