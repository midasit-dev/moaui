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
 * @description Variable of ThisHistory.tsx
 */
export const VarTHloadcase = atom({
	key: 'VarTHloadcase',
	default: 0,
});

export const VarTHloadCaseList = atom({
	key: 'VarTHloadCaseList',
	default: [ ['', 1] ],
});

/**
 * @description Variable of StaticLoad.tsx
 */
export const VarSTloadcase = atom({
	key: 'VarSTloadcase',
	default: 0,
});

export const VarSTloadCaseList = atom({
	key: 'VarSTloadCaseList',
	default: [ ['', 1] ],
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