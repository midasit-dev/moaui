import { atom } from 'recoil';
import { isLargerThanZero } from '../utils';

//if true, it is Valid
export const VarValids = atom({
	key: 'Errors',
	default: {
		VarAstmBeforeSpacing: (value:any) => isLargerThanZero(value),
		VarKsBeforeSpacing: (value:any) => isLargerThanZero(value),
	},
});


const Codes: Array<[string, number]> = [
	["ASTM", 1 ],["KS",2],["EN",3],["GB",4],["IS",5],["JIS",6],["UNI",7],["AS",8]
]

export const VarGetCodeList = atom({
	key: 'VarGetCodeList',
	default: Codes,
});

export const VarRebarCode = atom({
	key: 'VarRebarCode',
	default: 1,
});


const OutputType: Array<[string, number]> = [
	["1=>1", 1 ],["2=>1",2],["1=>2",3],["2=>2",4]
]

export const VarOutputTypeList = atom({
  key: 'VarOutputTypeList',
  default: OutputType,
});

export const VarOutputType = atom({
	key: 'VarOutputType',
	default: 1,
});


export const VarBeforeRebar1 = atom({
	key: 'VarBeforeRebar1',
	default: ''
});

export const VarBeforeRebar2 = atom({
	key: 'VarBeforeRebar2',
	default: 'None'
});

export const VarAfterRebar1 = atom({
	key: 'VarAfterRebar1',
	default: ''
});


export const VarAfterRebar2 = atom({
	key: 'VarAfterRebar2',
	default: 'None'
});

export const SelectedRebarList = atom<[string, string][]>({
  key: 'SelectedRebarList',
  default: [['None', 'None']] // Ensures the default value matches expected type
});



export const BeforeSpacing = atom({
	key: 'BeforeSpacing',
	default: '0'
});

export const AfterSpacing = atom({
	key: 'AfterSpacing',
	default: '0'
});

interface RebarData {
  id: number;
  BeforeRebarSize: string;
  BeforeRebarSpacing: string;
	AfterRebarSize: string;
  AfterRebarSpacing: string;
}

export const RebarListData = atom<RebarData[]>({
	key: 'RebarListData',
	default: [],
});

