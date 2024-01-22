import { atom } from 'recoil';
import { isLargerThanZero } from '../utils';

//if true, it is Valid
export const VarValids = atom({
	key: 'Errors',
	default: {
		VarFunctionName: (value: any) => value !== '',
		VarDesignSpectrum: (value: any) => true,
		VarSiteSubSoilClass: (value: any) => true,
		VarReturnPeriodFactor: (value: any) => isLargerThanZero(value),
		VarHazardFactor: (value: any) => isLargerThanZero(value),
		VarDistanceFromNearestMajorFault: (value: any) => isLargerThanZero(value),
		VarDesignDuctilityFactor: (value: any) => isLargerThanZero(value),
		VarMaximumPeriod: (value: any) => isLargerThanZero(value),
	},
});

export const VarFuncName = atom({
	key: 'VarFuncName',
	default: '',
});

const designSpectrumCodes: Array<[string, number]> = [
	[ "NZS 1170.5 (2004)", 1 ]
]
export const VarDesignSpectrumList = atom({
	key: 'VarDesignSpectrumList',
	default: designSpectrumCodes,
});
export const getDesignSpectrumCodeName = (index: number): string => {
	const codeNames = designSpectrumCodes;
	if (codeNames.length !== 0 && codeNames[index - 1]) {
		return codeNames[index - 1][0];
	} else {
		return '';
	}
}

export const VarDesignSpectrum = atom({
	key: 'VarDesignSpectrum',
	default: 1,
});

export const VarSiteSubSoilClass = atom({
	key: 'VarSiteSubSoilClass',
	default: "A",
});

export const VarReturnPeriodFactor = atom({
	key: 'VarReturnPeriodFactor',
	default: '1.3',
});

export const VarHazardFactor = atom({
	key: 'VarHazardFactor',
	default: '0.08',
});

export const VarDistanceFromNearestMajorFault = atom({
	key: 'VarDistanceFromNearestMajorFault',
	default: '2.0',
});

export const VarDesignDuctilityFactor = atom({
	key: 'VarDesignDuctilityFactor',
	default: '1.5',
});

export const VarMaximumPeriod = atom({
	key: 'VarMaximumPeriod',
	default: '6.0',
});