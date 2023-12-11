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
	getMapiKey
}

export default utils;