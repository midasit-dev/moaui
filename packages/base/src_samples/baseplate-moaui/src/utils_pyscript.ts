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

export function selectNodeList(){
	return checkPyScriptReady(() => {
		const py_select_node_list_func = pyscript.interpreter.globals.get('py_select_node_list');
		const result = py_select_node_list_func();
		return JSON.parse(result);
	});
}

export function setColumnInfo(selectedNodeList: any){
	return checkPyScriptReady(() => {
		const py_set_column_info_func = pyscript.interpreter.globals.get('py_set_column_info');
		const result = py_set_column_info_func(selectedNodeList);
		return JSON.parse(result);
	});
}

export function getNodeInfo(){
	return checkPyScriptReady(() => {
		const py_get_node_info_func = pyscript.interpreter.globals.get('py_get_node_info');
		const result = py_get_node_info_func();
		return JSON.parse(result);
	});
}

export function getReactionTable(keyindex:any, loadcomb:any){
	return checkPyScriptReady(() => {
		const py_get_reaction_table_func = pyscript.interpreter.globals.get('py_get_reaction_table');
		const result = py_get_reaction_table_func(JSON.stringify(keyindex), JSON.stringify(loadcomb));
		return JSON.parse(result);
	});
}

export function postNewProject(){
	return checkPyScriptReady(() => {
		const py_post_new_project_func = pyscript.interpreter.globals.get('py_NewPorject');
		const result = py_post_new_project_func();
		return JSON.parse(result);
	});
}

export function CreateBasePlateOutlines(PlateWidth:number, PlateHeigth:number, HBeamHeight:number, HBeamWidth:number){
	return checkPyScriptReady(() => {
		const py_CreateBasePlateOutlines_func = pyscript.interpreter.globals.get('py_CreateBasePlateOutlines');
		const result = py_CreateBasePlateOutlines_func(PlateWidth, PlateHeigth, HBeamHeight, HBeamWidth);
		return JSON.parse(result);
	});
}

export function AutoMeshing(PlateWidth:number, PlateHeight:number, PlateMaterial:string, PlateThickness:number){
	return checkPyScriptReady(() => {
		const py_AutoMeshing_func = pyscript.interpreter.globals.get('py_meshing');
		const result = py_AutoMeshing_func(PlateWidth, PlateHeight, PlateMaterial, PlateThickness);
		return JSON.parse(result);
	});
}

export function Applyloads(loaddata:any, PlateWidth:number, PlateHeight:number){
	return checkPyScriptReady(() => {
		const py_Applyloads_func = pyscript.interpreter.globals.get('py_applyloads');
		const result = py_Applyloads_func(loaddata, PlateWidth, PlateHeight);
		return JSON.parse(result);
	});
}

export function Analysis(DBName:any){
	return checkPyScriptReady(() => {
		const py_Analysis_func = pyscript.interpreter.globals.get('py_analysis');
		const result = py_Analysis_func(DBName);
		return JSON.parse(result);
	});
}

export function GetResult(){
	return checkPyScriptReady(() => {
		const py_GetResult_func = pyscript.interpreter.globals.get('py_getresult');
		const result = py_GetResult_func();
		return JSON.parse(result);
	});
}

export function calculate_baseplate(jsondata : any){
	return checkPyScriptReady(() => {
		const py_calculate_baseplate_func = pyscript.interpreter.globals.get('Calculatation');
		const result = py_calculate_baseplate_func(jsondata);
		return JSON.parse(result);
	});
}

export function covertMarkdown(jsondata : any){
	return checkPyScriptReady(() => {
		const py_convert_markdown_func = pyscript.interpreter.globals.get('convert_to_Markdown');
		const result = py_convert_markdown_func(jsondata);
		return JSON.parse(result);
	});
}