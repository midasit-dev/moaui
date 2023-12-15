import { VerifyUtil } from "@midasit-dev/moaui";

//before execute a python main function, insert this function
export function setGlobalVariable() {
	console.log('initialize_global_variables for python script')
	const set_func = pyscript.interpreter.globals.get('set_g_values');
	set_func(JSON.stringify({
		g_mapi_key: VerifyUtil.getMapiKey(),
		g_base_uri: getBaseUri(),
		g_base_port: getBasePort()
	}));
}

function getBasePort(): number {
  let origin = 'https://moa-engineers.midasit.com:443'
 
  let basePort = 0;
  const splitOrigin = origin.split(':');
  const length = splitOrigin.length;
  if (length === 3 || length === 2) {
    basePort = Number(origin.split(':')[length - 1]);
  } else {
    console.error(`Invalid origin (current origin is ${origin === "" ? "undefined" : origin})`);
    return -1;
  }
 
  return basePort;
}

function getBaseUri(): string {
  let origin = 'https://moa-engineers.midasit.com:443'
 
  let baseUri = '';
  const splitOrigin = origin.split(':');
  if (splitOrigin.length >= 2) {
    const protocol = splitOrigin[0];
    if (protocol !== 'http' && protocol !== 'https') {
      console.error(`Invalid origin (current origin is ${origin === "" ? "undefined" : origin})`);
      return '';
    }
 
    const domain = splitOrigin[1].replace('//', '');
    if (domain !== 'localhost' && !domain.includes('-dv') && !domain.includes('-st') && !domain.includes('moa-engineers.midasit.com')) {
      console.error(`Invalid origin (current origin is ${origin === "" ? "undefined" : origin})`);
      return '';
    }
 
    //https : moa-engineers.midasit.com : 443
    baseUri = `${domain}`;
  } else {
    console.error(`Invalid origin (current origin is ${origin === "" ? "undefined" : origin})`);
    return '';
  }
 
  return baseUri;
}

export function getGlobalVariable() {
	const get_func = pyscript.interpreter.globals.get('get_g_values');
	const g_values = JSON.parse(get_func());
	console.log('g_mapi_key: ', g_values.g_mapi_key);
	console.log('g_base_uri: ', g_values.g_base_uri);
	console.log('g_base_port: ', g_values.g_base_port);
}