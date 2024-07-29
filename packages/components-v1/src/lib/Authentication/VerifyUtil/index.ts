/*
  __                                                        __                __     
 /\ \                                                      /\ \__            /\ \    
 \_\ \      __    _____    _ __     __     ___      __     \ \ ,_\     __    \_\ \   
 /'_` \   /'__`\ /\ '__`\ /\`'__\ /'__`\  /'___\  /'__`\    \ \ \/   /'__`\  /'_` \  
/\ \L\ \ /\  __/ \ \ \L\ \\ \ \/ /\  __/ /\ \__/ /\ \L\.\_   \ \ \_ /\  __/ /\ \L\ \ 
\ \___,_\\ \____\ \ \ ,__/ \ \_\ \ \____\\ \____\\ \__/.\_\   \ \__\\ \____\\ \___,_\
 \/__,_ / \/____/  \ \ \/   \/_/  \/____/ \/____/ \/__/\/_/    \/__/ \/____/ \/__,_ /
                    \ \_\                                                            
                     \/_/                                                            
*/
/**
 * @deprecated
 * 함수명이 요상, 곧 폐지될 예정
 */
export function getProductionUrl() {
	const param = new URLSearchParams(window.location.search);
	const redirectToUrl = param.get('redirectTo') || "";
	if (redirectToUrl !== "") { return redirectToUrl; }

	const origin = window.location.origin;
	// if (!origin.includes('localhost') 	&&
	// 		!origin.includes('-dv')	&&
	// 		!origin.includes('-st')	&&
	// 		!origin.includes('moa-engineers.midasit.com')) {
	// 			console.error(`Invalid origin (current origin is ${origin === "" ? "undefined" : origin})`);
	// 			return '';
	// 	}

	if (origin.includes('localhost')) {
		return `http://localhost:7112`;
	}

	return `https://moa-engineers.midasit.com`;
}

/*
                                                                                                            
 ### ###  #######  ######   #######  #######  ### ###    #      ### ###  #######  #######  ####      #####  
 ### ###  ####     ### ###    ###    ####     ### ###   ##      ### ###    ###      ###    ####     ### ### 
 ### ###  ######   ### ###    ###    ######    #####   #######  ### ###    ###      ###    ####      ###    
 ### ###  ####     ######     ###    ####       ###    #######  ### ###    ###      ###    ####        ###  
  #####   ####     ### ###    ###    ####       ###     ##      #######    ###      ###    ####     ### ### 
   ###    #######  ### ###  #######  ####       ###      #       ### ##    ###    #######  # #####   #####  
                                                                                                            
*/
/**
 * @description 쿼리 스트링이 존재하는지 확인하는 함수
 * @param query 
 * @returns boolean
 */
export function isExistQueryStrings(query: string): boolean {
  const params = new URLSearchParams(window.location.search);
  const param = params.get(query) || "";
  return ( param !== "" );
}

/**
 * @description 프로토콜, 도메인, 포트번호를 포함해서 문자열로 반환하는 함수
 * @returns 'https://moa-engineers.midasit.com:443' 형태
 */
export function getProtocolDomainPort(): string {
	const param = new URLSearchParams(window.location.search);
	const redirectToUrl = param.get('redirectTo') || "";
	if (redirectToUrl !== "") { return redirectToUrl; }

	return `https://moa-engineers.midasit.com:443`;
}

/**
 * MAPI-Key Verify용 함수
 * @param mapiKey 
 * @returns verify 결과
 */
export async function getVerifyInfoAsync(mapiKey: string): Promise<any> {
	const res = await fetch(`${getProtocolDomainPort()}/mapikey/verify`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"MAPI-Key": mapiKey
		}
	});

	if (!res.ok) console.error('verify mapikey is failed');
	return await res.json();
}

/**
 * @description MAPI-Key Verify 후, baseUrl을 반환하는 함수
 * @returns 'https://moa-engineers.midasit.com:443/{program}' 형태
 */
export async function getBaseUrlAsync(): Promise<string> {
	const mapiKey = getMapiKey();
	const info = await getVerifyInfoAsync(mapiKey);
	return `${getProtocolDomainPort()}/${info.program}`;
}

/**
 * Query String에 있는 MAPI-Key를 반환하는 함수
 * @returns MAPI-Key
 */
export function getMapiKey(): string {
	const param = new URLSearchParams(window.location.search);
	return param.get('mapiKey') || "";
}

/**
 * @description python global 변수용 함수
 * 위 ProductionUrl과 같은 기능을 하는 함수인데,
 * 현재 Python에서 초기 설정 값의 이름이 baseUri와 basePort라, 이를 맞추기 위해 별도 함수로 추가
 */
export function getBaseUri(): string {
	let origin = getProtocolDomainPort();

	let baseUri = '';
	const splitOrigin = origin.split(':');
	if (splitOrigin.length >= 2) {
		const protocol = splitOrigin[0];
		if (protocol !== 'http' && protocol !== 'https') {
			console.error(`Invalid origin (current origin is ${origin === "" ? "undefined" : origin})`);
			return '';
		}

		const domain = splitOrigin[1].replace('//', '');
		// if (
    //   domain !== "localhost" &&
    //   !domain.includes("-dv") &&
    //   !domain.includes("-st") &&
    //   !domain.includes("moa-engineers.midasit.com")
    // ) {
    //   console.error(
    //     `Invalid origin (current origin is ${
    //       origin === "" ? "undefined" : origin
    //     })`
    //   );
    //   return "";
    // }

		//https : moa-engineers.midasit.com : 443
		baseUri = `${domain}`;
	} else {
		console.error(`Invalid origin (current origin is ${origin === "" ? "undefined" : origin})`);
		return '';
	}

	return baseUri;
}

/**
 * redirectTo에 있는 port를 반환하는 함수
 * @returns basePort
 */
export function getBasePort(): number {
	let origin = getProtocolDomainPort();

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

type ExtractedUrlType = {
  protocol: string;
  domain: string;
  port: string;
} | null;
/**
 * @description 주어진 url에서 프로토콜, 도메인, 포트번호를 추출하는 함수
 * ```typescript
 * const result = {
 *   protocol: 'https',
 *   domain: 'moa-engineers.midasit.com',
 *   port: '443'
 * }
 * ```
 */
export function extractProtocolDomainPort(url: string): ExtractedUrlType {
	// 정규식 패턴을 사용하여 프로토콜, 도메인, 포트번호 추출
	const match = url.match(/^(https?):\/\/([^:/]+)(?::(\d+))?/);

	if (match) {
			const protocol = match[1];
			const domain = match[2];
			const port = match[3] || (protocol === "https" ? "443" : "80"); // 프로토콜에 따라 기본 포트 설정

			return { 
				protocol, 
				domain, 
				port 
			};
	} else {
			return null; // 일치하는 부분이 없을 경우
	}
}

const utils = {
	getProductionUrl,
	isExistQueryStrings,
	getProtocolDomainPort,
	getVerifyInfoAsync,
	getBaseUrlAsync,
	getMapiKey,
	getBaseUri,
	getBasePort,
	extractProtocolDomainPort,
}

export default utils;