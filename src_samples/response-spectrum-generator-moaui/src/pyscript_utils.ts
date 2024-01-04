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
  console.log("initialize_global_variables for python script");
  const set_func = pyscript.interpreter.globals.get("set_g_values");
  set_func(
    JSON.stringify({
      g_mapi_key: VerifyUtil.getMapiKey(),
      g_base_uri: VerifyUtil.getBaseUri(),
      g_base_port: VerifyUtil.getBasePort(),
    })
  );
}

export function getGlobalVariable() {
  const get_func = pyscript.interpreter.globals.get("get_g_values");
  const g_values = JSON.parse(get_func());
  console.log("g_mapi_key: ", g_values.g_mapi_key);
  console.log("g_base_uri: ", g_values.g_base_uri);
  console.log("g_base_port: ", g_values.g_base_port);
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
    const py_db_create_func = pyscript.interpreter.globals.get("py_db_create");
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
    const py_db_create_item_func =
      pyscript.interpreter.globals.get("py_db_create_item");
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
    const py_db_read_func = pyscript.interpreter.globals.get("py_db_read");
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
    const py_db_read_item_func =
      pyscript.interpreter.globals.get("py_db_read_item");
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
    const py_db_update_func = pyscript.interpreter.globals.get("py_db_update");
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
    const py_db_update_item_func =
      pyscript.interpreter.globals.get("py_db_update_item");
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
    const py_db_delete_func = pyscript.interpreter.globals.get("py_db_delete");
    const result = py_db_delete_func(itemName, item_id);
    return JSON.parse(result);
  });
}

export function createGraphData4NZS1170_5_2004(
  soliClass: string,
  R: string,
  Z: string,
  distance: string,
  ductFactor: string,
  maxPeriod: string
) {
  return checkPyScriptReady(() => {
    const py_create_graph_data_func =
      pyscript.interpreter.globals.get("NZ_input");
    const result = py_create_graph_data_func(
      soliClass,
      parseFloat(R),
      parseFloat(Z),
      parseFloat(distance),
      parseFloat(ductFactor),
      parseFloat(maxPeriod)
    );
    return JSON.parse(result);
  });
}

export function spfcUpdate4NZS1170_5_2004(
  funcName: string,
  soliClass: string,
  R: string,
  Z: string,
  distance: string,
  ductFactor: string,
  maxPeriod: string
) {
  return checkPyScriptReady(() => {
    const py_spfc_update_func = pyscript.interpreter.globals.get(
      "main_NZS1170_5_2004"
    );

    const result = py_spfc_update_func(
      funcName,
      soliClass,
      parseFloat(R),
      parseFloat(Z),
      parseFloat(distance),
      parseFloat(ductFactor),
      parseFloat(maxPeriod)
    );
		
    return JSON.parse(result);
  });
}
