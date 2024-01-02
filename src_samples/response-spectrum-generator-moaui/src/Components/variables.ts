import { atom } from 'recoil';

export const VarFuncName = atom({
	key: 'VarFuncName',
	default: '',
});

export const VarDesignSpectrumList = atom({
	key: 'VarDesignSpectrumList',
	default: [
		[ "NZS 1170.5 (2004)", 1 ]
	],
});

export const VarDesignSpectrum = atom({
	key: 'VarDesignSpectrum',
	default: 1,
});

export const VarSiteSubSoilClass = atom({
	key: 'VarSiteSubSoilClass',
	default: 1,
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