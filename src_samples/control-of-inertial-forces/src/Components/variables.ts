/*
 * ██╗   ██╗ █████╗ ██████╗ ██╗ █████╗ ██████╗ ██╗     ███████╗███████╗
 * ██║   ██║██╔══██╗██╔══██╗██║██╔══██╗██╔══██╗██║     ██╔════╝██╔════╝
 * ██║   ██║███████║██████╔╝██║███████║██████╔╝██║     █████╗  ███████╗
 * ╚██╗ ██╔╝██╔══██║██╔══██╗██║██╔══██║██╔══██╗██║     ██╔══╝  ╚════██║
 *  ╚████╔╝ ██║  ██║██║  ██║██║██║  ██║██████╔╝███████╗███████╗███████║
 *   ╚═══╝  ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝╚═╝  ╚═╝╚═════╝ ╚══════╝╚══════╝╚══════╝
 */

import { atom } from 'recoil';

/**
 * @description Variable of ThisHistory.tsx
 */
export const VarTHloadcase = atom({
	key: 'VarTHloadcase',
	default: 1,
});

export const VarTHloadCaseList = atom({
	key: 'VarTHloadCaseList',
	default: [ ['NONE', 1] ],
});

/**
 * @description Variable of StaticLoad.tsx
 */
export const VarSTloadcase = atom({
	key: 'VarSTloadcase',
	default: 1,
});

export const VarSTloadCaseList = atom({
	key: 'VarSTloadCaseList',
	default: [ ['NONE', 1] ],
});

/**
 * @description Variable of TimeHistoryFunction.tsx
 */
export const VarTHfunction = atom({
	key: 'VarTHfunction',
	default: 0,
});

export const VarTHfunctionList = atom({
	key: 'VarTHfunctionList',
	default: [ ['Preset:Linear', 0] ],
});

export const VarScaleFactor = atom({
	key: "VarScaleFactor",
	default: '1',
});

export const VarScaleError = atom({
	key: "VarScaleError",
	default: false,
});

export const VarAngleHor = atom({
	key: "VarAngleHor",
	default: '0',
});

export const VarAngleError = atom({
	key: "VarAngleError",
	default: false,
});

export const VarRowData = atom({
	key: "VarRowData",
	default: [
		{
			id: 0,
			index: 1,
			angle: 0
	}],
});