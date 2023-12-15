export function isExistQueryStrings(query: string): boolean {
  const params = new URLSearchParams(window.location.search);
  const param = params.get(query) || "";
  return ( param !== "" );
}

export function getProductionUrl() {
	const param = new URLSearchParams(window.location.search);
	const redirectToUrl = param.get('redirectTo') || "";
	if (redirectToUrl !== "") { return redirectToUrl; }

	const origin = window.location.origin;
	if (!origin.includes('localhost') 	&&
			!origin.includes('-dv')	&&
			!origin.includes('-st')	&&
			!origin.includes('moa-engineers.midasit.com')) {
				console.error(`Invalid origin (current origin is ${origin === "" ? "undefined" : origin})`);
				return '';
		}

	if (origin.includes('localhost')) {
		return `http://localhost:7112`;
	}

	return `${window.location.origin}`;
}

//위 ProductionUrl과 같은 기능을 하는 함수인데
//현재 Python에서 초기 설정 값의 이름이 baseUri와 basePort라, 이를 맞추기 위해 별도 함수로 추가함
export function getBaseUri(): string {
	let origin = getProductionUrl();

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

export function getBasePort(): number {
	let origin = getProductionUrl();

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

export async function getVerifyInfoAsync(mapiKey: string): Promise<any> {
	const res = await fetch(`${getProductionUrl()}/mapikey/verify`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"MAPI-Key": mapiKey
		}
	});

	if (!res.ok) console.error('verify mapikey is failed');
	return await res.json();
}

export async function getBaseUrlAsync(): Promise<string> {
	const mapiKey = getMapiKey();
	const info = await getVerifyInfoAsync(mapiKey);
	return `${getProductionUrl()}/${info.program}`;
}

export function getMapiKey(): string {
	const param = new URLSearchParams(window.location.search);
	return param.get('mapiKey') || "";
}

const utils = {
	isExistQueryStrings,
	getProductionUrl,
	getVerifyInfoAsync,
	getBaseUrlAsync,
	getMapiKey,
	getBaseUri,
	getBasePort,
}

export default utils;