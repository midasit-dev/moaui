/*
 *		                                        __              ___              
 *		                                       /\ \__    __    /\_ \             
 *		 _____    __  __               __  __  \ \ ,_\  /\_\   \//\ \      ____  
 *		/\ '__`\ /\ \/\ \             /\ \/\ \  \ \ \/  \/\ \    \ \ \    /',__\ 
 *		\ \ \L\ \\ \ \_\ \            \ \ \_\ \  \ \ \_  \ \ \    \_\ \_ /\__, `\
 *		 \ \ ,__/ \/`____ \            \ \____/   \ \__\  \ \_\   /\____\\/\____/
 *		  \ \ \/   `/___/> \  _______   \/___/     \/__/   \/_/   \/____/ \/___/ 
 *		   \ \_\      /\___/ /\______\                                           
 *		    \/_/      \/__/  \/______/                                           
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
	console.log('initialize_global_variables for python script')
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
	console.log('g_mapi_key: ', g_values.g_mapi_key);
	console.log('g_base_uri: ', g_values.g_base_uri);
	console.log('g_base_port: ', g_values.g_base_port);
}

export function dbRead(itemName: string) {
	return checkPyScriptReady(() => {
		const py_db_read_func = pyscript.interpreter.globals.get('py_db_read');
		const result = py_db_read_func(itemName);
		return JSON.parse(result);
	});
}