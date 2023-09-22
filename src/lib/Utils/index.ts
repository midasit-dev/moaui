export function isExistQueryStrings(query: string) {
  const params = new URLSearchParams(window.location.search);
  const param = params.get(query) || "";
  return ( param !== "" );
}

export function getProductionUrl() {
	return 'https://api-beta.midasit.com';
}

export async function getVerifyInfoAsync(mapiKey: string) {
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

export async function getBaseUrlAsync() {
	const mapiKey = getMapiKey();
	const info = await getVerifyInfoAsync(mapiKey);
	return `${getProductionUrl()}/${info.program}`;
}

export function getMapiKey() {
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