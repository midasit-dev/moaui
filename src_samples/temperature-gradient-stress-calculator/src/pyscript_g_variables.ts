import { VerifyUtil } from "@midasit-dev/moaui";

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