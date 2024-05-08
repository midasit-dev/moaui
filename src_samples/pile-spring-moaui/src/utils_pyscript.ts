/**
 * 
 * ██╗   ██╗████████╗██╗██╗       ██╗     ██╗██████╗ ██╗   ██╗██╗ 
 * ██║   ██║╚══██╔══╝██║██║      ███║    ██╔╝██╔══██╗╚██╗ ██╔╝╚██╗
 * ██║   ██║   ██║   ██║██║█████╗╚██║    ██║ ██████╔╝ ╚████╔╝  ██║
 * ██║   ██║   ██║   ██║██║╚════╝ ██║    ██║ ██╔═══╝   ╚██╔╝   ██║
 * ╚██████╔╝   ██║   ██║███████╗  ██║    ╚██╗██║        ██║   ██╔╝
 *  ╚═════╝    ╚═╝   ╚═╝╚══════╝  ╚═╝     ╚═╝╚═╝        ╚═╝   ╚═╝ 
 * 
 * @description Functions for executing python script in typescript
 * @linkcode ./public/pyscript_main.py
 */

import { VerifyUtil } from "@midasit-dev/moaui";
import { ListFormat } from "typescript";

export function checkPyScriptReady(callback: any) {
	// if pyscript is ready, call callback function
	if (pyscript && pyscript.interpreter) {
		return callback();
	} else {
		// if not, wait 100ms and try again
		setTimeout(() => checkPyScriptReady(callback), 100);
	}
}

//before execute a python main function, insert this function
export function setGlobalVariable() {
	const set_func = pyscript.interpreter.globals.get('set_g_values');
	set_func(JSON.stringify({
		g_mapi_key: VerifyUtil.getMapiKey(),
		g_base_uri: VerifyUtil.getBaseUri(),
		g_base_port: VerifyUtil.getBasePort()
	}));
}

export function getGlobalVariable() {
const get_func = pyscript.interpreter.globals.get('get_g_values');
const g_values = JSON.parse(get_func());
console.log(`
┌─┐┬ ┬  ┬┌┐┌┌─┐┌┬┐┌─┐┬  ┬  ┌─┐┌┬┐
├─┘└┬┘  ││││└─┐ │ ├─┤│  │  ├┤  ││
┴   ┴   ┴┘└┘└─┘ ┴ ┴ ┴┴─┘┴─┘└─┘─┴┘

@ Global variables in python script
- MAPI-Key: ${g_values.g_mapi_key}
- Base-Uri: ${g_values.g_base_uri}
- Base-Port: ${g_values.g_base_port}
`);
}

/**
 * @description this function is for python script to create data in database
 * @see ./public/pyscript_main.py
 * @param item: item to create
 * @returns
 * @example
 */
export function dbCreate(itemName: string, items: any) {
	return checkPyScriptReady(() => {
		const py_db_create_func = pyscript.interpreter.globals.get('py_db_create');
		const result = py_db_create_func(itemName, JSON.stringify(items));
		return JSON.parse(result);
	});
}

/**
 * @description this function is for python script to create data in database
 * @see ./public/pyscript_main.py
 * @param key: key of item
 * @param item: item to create
 * @returns 
 * @example
 */
export function dbCreateItem(itemName: string, key: string, item: any) {
	return checkPyScriptReady(() => {
		const py_db_create_item_func = pyscript.interpreter.globals.get('py_db_create_item');
		const result = py_db_create_item_func(itemName, key, JSON.stringify(item));
		return JSON.parse(result);
	});
}

/**
 * @description this function is for python script to read data from database
 * @see ./public/pyscript_main.py
 * @param itemName: name of item
 * @param key: key of item
 * @returns
 * @example
 */
export function dbRead(itemName: string): any {
	return checkPyScriptReady(() => {
		const py_db_read_func = pyscript.interpreter.globals.get('py_db_read');
		const result = py_db_read_func(itemName);
		return JSON.parse(result);
	});
}

/**
 * @description this function is for python script to read data each item from database
 * @see ./public/pyscript_main.py
 * @param itemName: name of item
 * @param key: key of item
 * @returns
 * @example
 */
export function dbReadItem(itemName: string, key: string): any {
	return checkPyScriptReady(() => {
		const py_db_read_item_func = pyscript.interpreter.globals.get('py_db_read_item');
		const result = py_db_read_item_func(itemName, key);
		return JSON.parse(result);
	});
}

/**
 * @description this function is for python script to update data in database
 * @see ./public/pyscript_main.py
 * @param itemName name of item
 * @param items items to update
 * @returns 
 * @example
 */

export function dbUpdate(itemName: string, items: any) {
	return checkPyScriptReady(() => {
		const py_db_update_func = pyscript.interpreter.globals.get('py_db_update');
		const result = py_db_update_func(itemName, JSON.stringify(items));
		return JSON.parse(result);
	});
}

/**
 * @description this function is for python script to update data in database
 * @see ./public/pyscript_main.py
 * @param itemName name of item
 * @param key key of item
 * @param item item to update
 * @returns 
 * @example
 */

export function dbUpdateItem(itemName: string, key: string, item: any) {
	return checkPyScriptReady(() => {
		const py_db_update_item_func = pyscript.interpreter.globals.get('py_db_update_item');
		const result = py_db_update_item_func(itemName, key, JSON.stringify(item));
		return JSON.parse(result);
	});
}

/**
 * @description this function is for python script to delete data in database
 * @see ./public/pyscript_main.py
 * @param itemName name of item
 * @returns 
 * @example
 */
export function dbDelete(itemName: string, item_id: string | number) {
	return checkPyScriptReady(() => {
		const py_db_delete_func = pyscript.interpreter.globals.get('py_db_delete');
		const result = py_db_delete_func(itemName, item_id);
		return JSON.parse(result);
	});
}

/**
 * @description this function is for python script to delete data in database
 * @see ./public/pyscript_main.py
 * @param itemName name of item
 * @returns 
 * @example
 */
export function FoundationCoordinates(width : number, length : number) {
	return checkPyScriptReady(() => {
		let result =[]
		const CalFoundationCoordinates = pyscript.interpreter.globals.get('CalFoundationCoordinates');
		result = CalFoundationCoordinates(width, length);
		return JSON.parse(result);
	});
}

export function ExtractNumbers(text: string) {
	return checkPyScriptReady(() => {
		let result =[]
		const ExtractNumbers = pyscript.interpreter.globals.get('extract_numbers');
		result = ExtractNumbers(text);
		return JSON.parse(result);
	});
}

export function CalculatePileCoordinates(PileTableData : any, PileLocationData : any) {
	return checkPyScriptReady(() => {
		let result =[]
		const CalPileCoordinates = pyscript.interpreter.globals.get('CalPileCoordinates');
		result = CalPileCoordinates(PileTableData, PileLocationData);
		return JSON.parse(result);
	});
}


export function CalculateKv(PileTableData : any){
	return checkPyScriptReady(() => {
		let result =[]
		const CalKv = pyscript.interpreter.globals.get('CalKv');
		result = CalKv(JSON.stringify(PileTableData));
		return JSON.parse(result);
	})
}

export function CalculateKvalue(PileTableData : any, GroundLevel: any, TopLevel : any, SoilData: any, Condition : any, SlopeEffectState: any, GroupEffectValue: any){
	return checkPyScriptReady(() => {
		let result =[]
		const CalKvalue = pyscript.interpreter.globals.get('CalKValue');
		result = CalKvalue(JSON.stringify(PileTableData), GroundLevel, TopLevel, JSON.stringify(SoilData), Condition, SlopeEffectState, GroupEffectValue);
		return JSON.parse(result);
	})
}


export function CalculatePileCenterCoordinates(PileData : any, FoundationWidth : any, SideLength : any){
	return checkPyScriptReady(() => {
		let result =[]
		const CalPileCenterCoordinates = pyscript.interpreter.globals.get('CalPileCenterCoordinates');
		result = CalPileCenterCoordinates(JSON.stringify(PileData), JSON.stringify(FoundationWidth), JSON.stringify(SideLength));
		
		return JSON.parse(result);
	})
}

export function CalculatePileDegree(PileData : any){
	return checkPyScriptReady(() => {
		let result =[]
		const CalPileDegree = pyscript.interpreter.globals.get('CalPileDegree');
		result = CalPileDegree(PileData);
		return JSON.parse(result);
	})
}

export function CalculateProperties(PileData : any, Position : any, ReinforcedState : any){
	return checkPyScriptReady(() => {
		let result =[]
		const CalProperties = pyscript.interpreter.globals.get('Cal_Property');
		result = (CalProperties(JSON.stringify(PileData), Position, ReinforcedState));
		return JSON.parse(result);
	})
}

export function CalculateMatrix(PileTableData : any, FoundationWidth : any, SideLength : any, GroundLevel: any, TopLevel:any, SoilData:any, SlopeEffectState:any, ResultType : any, Direction : any, GroupEffectValue: any){
	return checkPyScriptReady(() => {
		let result =[]
		const CalMatrix = pyscript.interpreter.globals.get('CalMatrix');
		result = CalMatrix(JSON.stringify(PileTableData), JSON.stringify(FoundationWidth), JSON.stringify(SideLength), GroundLevel, TopLevel, JSON.stringify(SoilData), SlopeEffectState, ResultType, Direction, GroupEffectValue);
		return JSON.parse(result);
	})
}

export function CalculateBeta(SoilData : any, PileTableData : any, Condition : any, SlopeEffectState : any, GroupEffectValue : any){
	return checkPyScriptReady(() => {
		let result =[]
		const Cal_Beta = pyscript.interpreter.globals.get('Cal_Beta');
		result = Cal_Beta(JSON.stringify(SoilData), JSON.stringify(PileTableData), Condition, SlopeEffectState, GroupEffectValue);
		return JSON.parse(result);
	})
}

export function CalAlphaHTheta(SoilData : any, SlopeEffectState : any, PileTableData:any){
	return checkPyScriptReady(() => {
		let result =[]
		const Cal_AlphaHTheta = pyscript.interpreter.globals.get('CalAlphaTheta');
		result = Cal_AlphaHTheta(JSON.stringify(SoilData), SlopeEffectState, JSON.stringify(PileTableData));
		return JSON.parse(result);
	})
}

export function py_db_get_maxid(itemName: string) {
	return checkPyScriptReady(() => {
		const py_db_get_maxid_func = pyscript.interpreter.globals.get('py_db_get_maxid');
		const result = py_db_get_maxid_func(itemName);
		return JSON.parse(result);
	});
}