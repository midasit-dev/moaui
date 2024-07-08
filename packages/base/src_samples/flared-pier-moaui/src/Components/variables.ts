import { atom } from 'recoil';
import { isLargerThanZero, isBetween1And1000000 } from '../utils';
import { dbRead } from '../pyscript_utils';

// Validations, if it's true, it's valid
export const VarValidations = atom({
	key: 'Validations',
	default: {
		grup_ID: (value: any) => true,
		bngr_ID: (value: any) => true,
		start_node_nb: (value: any) => {
			if (!isBetween1And1000000(value)) return false;

			const res = dbRead("NODE");
			if (res.hasOwnProperty("error")) return false;
			const nodeIDs = Object.keys(res);
			if (nodeIDs.includes(value)) return false;

			return true;
		},

		column_sect_ID: (value: any) => true,
		cap_bot_sect_ID: (value: any) => true,
		cap_top_sect_ID: (value: any) => true,
		
		column_matl_ID: (value: any) => true,
		cap_bot_matl_ID: (value: any) => true, 
		cap_top_matl_ID: (value: any) => true,
		
		column_len: (value: any) => isLargerThanZero(value),
		cap_bot_len: (value: any) => isLargerThanZero(value),
		cap_top_len: (value: any) => isLargerThanZero(value),
	}
});

// Lists
export const VarGrupIDList = atom<Array<[string, number]>>({
	key: 'VarGrupIDList',
	default: [],
});

export const VarBngrIDList = atom<Array<[string, number]>>({
	key: 'VarBngrIDList',
	default: [],
});

export const VarColumnSectIDList = atom<Array<[string, number]>>({
	key: 'VarColumnSectIDList',
	default: [],
});

export const VarCapBotSectIDList = atom<Array<[string, number]>>({
	key: 'VarCapBotSectIDList',
	default: [],
});

export const VarCapTopSectIDList = atom<Array<[string, number]>>({
	key: 'VarCapTopSectIDList',
	default: [],
});

export const VarColumnMatlIDList = atom<Array<[string, number]>>({
	key: 'VarColumnMatlIDList',
	default: [],
});

export const VarCapBotMatlIDList = atom<Array<[string, number]>>({
	key: 'VarCapBotMatlIDList',
	default: [],
});

export const VarCapTopMatlIDList = atom<Array<[string, number]>>({
	key: 'VarCapTopMatlIDList',
	default: [],
});

// Select Values
export const VarGrupID = atom<number>({
	key: 'VarGrupID',
	default: 0,
});

export const VarBngrID = atom<number>({
	key: 'VarBngrID',
	default: 0,
});

export const VarStartNodeNb = atom<string>({
	key: 'VarStartNodeNb',
	default: '0',
});

export const VarColumnSectID = atom<number>({
	key: 'VarColumnSectID',
	default: 0,
});

export const VarCapBotSectID = atom<number>({
	key: 'VarCapBotSectID',
	default: 0,
});

export const VarCapTopSectID = atom<number>({
	key: 'VarCapTopSectID',
	default: 0,
});

export const VarColumnMatlID = atom<number>({
	key: 'VarColumnMatlID',
	default: 0,
});

export const VarCapBotMatlID = atom<number>({
	key: 'VarCapBotMatlID',
	default: 0,
});

export const VarCapTopMatlID = atom<number>({
	key: 'VarCapTopMatlID',
	default: 0,
});

export const VarColumnLen = atom<string>({
	key: 'VarColumnLen',
	default: '0',
});

export const VarCapBotLen = atom<string>({
	key: 'VarCapBotLen',
	default: '0',
});

export const VarCapTopLen = atom<string>({
	key: 'VarCapTopLen',
	default: '0',
});
