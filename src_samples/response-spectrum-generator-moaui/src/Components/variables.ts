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
		VarSiteClass: (value: any) => true,
		VarSpectralAccelerationSs: (value: any) => isLargerThanZero(value),
		VarSpectralAccelerationS1: (value: any) => isLargerThanZero(value),
		VarImportanceFactor: (value: any) => isLargerThanZero(value),
		VarResponseModificationFactor: (value: any) => isLargerThanZero(value),
		VarLongTranPeriod: (value: any) => isLargerThanZero(value)
	},
});

export const VarFuncName = atom({
	key: 'VarFuncName',
	default: '',
});

const designSpectrumCodes: Array<[string, number]> = [
	[ "NZS 1170.5 (2004)", 1 ],["SBC 301-CR (2018)",2]
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

export const VarSiteClass = atom({
	key: 'VarSiteClass',
	default: "A",
});	

export const VarSpectralAccelerationSs = atom({
	key: 'VarSpectralAccelerationSs',
	default: '0.75',
});	

export const VarSpectralAccelerationS1 = atom({
	key: 'VarSpectralAccelerationS1',
	default: '0.30',	
});	

export const VarImportanceFactor = atom({
	key: 'VarImportanceFactor',
	default: '1.0',
});	

export const VarResponseModificationFactor = atom({
	key: 'VarResponseModificationFactor',
	default: '5.0',
});	

export const VarLongTranPeriod = atom({
	key: 'VarLongTranPeriod',
	default: '4.0',
});	
