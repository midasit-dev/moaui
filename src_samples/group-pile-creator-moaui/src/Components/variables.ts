import { atom } from 'recoil';
import { isBetween1And1000000, isFloat, isInteger, isLargerThanZero } from "../utils";

// Validations
export const VarValidations = atom({
	key: 'VarValidations',
	default: {
		grup_ID: (value: any) => value === 0,
		bngr_ID: (value: any) => value === 0,
		pile_matl_ID: (value: any) => value === 0,
		pile_sect_ID: (value: any) => value === 0,
		cap_matl_ID: (value: any) => value === 0,
		cap_sect_ID: (value: any) => value === 0,
		pile_start_nb: (value: any) => !isInteger(value) || !isBetween1And1000000(value),
		cap_start_nb: (value: any) => !isInteger(value) || !isBetween1And1000000(value),
		pile_array: (value: any) => !isInteger(value) || !isLargerThanZero(value),
		pile_spacing: (value: any) => !isFloat(value) || !isLargerThanZero(value),
		cap_edge_spacing: (value: any) => !isFloat(value) || !isLargerThanZero(value),
		spacing_style: undefined,
		pile_dia: (value: any) => !isFloat(value) || !isLargerThanZero(value),
		pile_length: (value: any) => !isFloat(value) || !isLargerThanZero(value),
		cap_height: (value: any) => !isFloat(value) || !isLargerThanZero(value),
	}
});

// Group Pile Option
export const VarGrupID = atom({
	key: 'VarGrupID',
	default: 0,
});

export const VarBngrID = atom({
	key: 'VarBngrID',
	default: 0,
});

export const VarPileMatlID = atom({
	key: 'VarPileMatlID',
	default: 0,
});

export const VarPileSectID = atom({
	key: 'VarPileSectID',
	default: 0,
});

export const VarCapMatlID = atom({
	key: 'VarCapMatlID',
	default: 0,
});

export const VarCapSectID = atom({
	key: 'VarCapSectID',
	default: 0,
});

export const VarPileStartNb = atom({
	key: 'VarPileStartNb',
	default: '1',
});

export const VarCapStartNb = atom({
	key: 'VarCapStartNb',
	default: '1',
});

// Group Pile & Cap Option
export const VarPileArrayLong = atom({
	key: 'VarPileArrayLog',
	default: '3',
});

export const VarPileArrayTran = atom({
	key: 'VarPileArrayTran',
	default: '4',
});

export const VarPileSpacingLong = atom({
	key: 'VarPileSpacingLog',
	default: '2.5',
});

export const VarPileSpacingTran = atom({
	key: 'VarPileSpacingTran',
	default: '2.5',
});

export const VarCapEdgeSpacingLong = atom({
	key: 'VarCapEdgeSpacingLog',
	default: '1.5',
});

export const VarCapEdgeSpacingTran = atom({
	key: 'VarCapEdgeSpacingTran',
	default: '1.5',
});

// Length Unit
export const VarSpacingStyleInt = atom({
	key: 'VarSpacingStyleInt',
	default: 1,
});

// Pile Diameter
export const VarPileDia = atom({
	key: 'VarPileDia',
	default: '1.2',
});

// Pile Length
export const VarPileLength = atom({
	key: 'VarPileLength',
	default: '15',
});

// Pile Cap Height
export const VarCapHeight = atom({
	key: 'VarCapHeight',
	default: '2.5',
});

// Create Pile Cap
export const VarCapModeling = atom({
	key: 'VarCapModeling',
	default: false,
});

// Group Pile Option DropList Lists
export const VarGrupIDList = atom<Array<[string, number]>>({
	key: 'VarGrupIDList',
	default: [],
});

export const VarBngrIDList = atom<Array<[string, number]>>({
	key: 'VarBngrIDList',
	default: [],
});

export const VarPileMatlIDList = atom<Array<[string, number]>>({
	key: 'VarPileMatlIDList',
	default: [],
});

export const VarPileSectIDList = atom<Array<[string, number]>>({
	key: 'VarPileSectIDList',
	default: [],
});

export const VarCapMatlIDList = atom<Array<[string, number]>>({
	key: 'VarCapMatlIDList',
	default: [],
});

export const VarCapSectIDList = atom<Array<[string, number]>>({
	key: 'VarCapSectIDList',
	default: [],
});