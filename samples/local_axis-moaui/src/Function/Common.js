export { midasAPI, NEParser, stringTolist, listTochartData, chartScale };

function getParam() {
	let url = window.location.search.substring(1);
	let paramItems = url.split("&");
	let paramMap = new Map();

	for (let i = 0; i < paramItems.length; i++) {
		let item = paramItems[i].split("=");
		paramMap.set(item[0], item[1]);
	}

	return paramMap;
}

async function midasAPI(method, subURL, body) {
	const param = getParam();
	const baseURL = param.get("baseURL") || "https://api-beta.midasit.com:443/civil";
	const mapiKey = param.get("mapiKey");

	let res;
	if (method === "POST" || method === "PUT") {
		res = await fetch(baseURL + subURL, {
			method: method,
			headers: {
				"Content-Type": "application/json",
				"MAPI-Key": mapiKey,
			},
			body: JSON.stringify(body),
		});
	} else {
		res = await fetch(baseURL + subURL, {
			method: method,
			headers: {
				"Content-Type": "application/json",
				"MAPI-Key": mapiKey,
			},
		});
	}
	return await res.json();
}

//Pasring Node Number
function NEParser(NEString) {
	let origin = NEString.split(" ");
	let result = "";
	for (let i = 0; i < origin.length; i++) {
		let Str = origin[i];
		let InclTo = Str.indexOf("to");
		let InclBy = Str.indexOf("by");
		if (InclTo !== -1) {
			let FirstNum = parseInt(Str.substring(0, InclTo));
			let SecondNum;
			let LoopBy = 1;
			if (InclBy !== -1) {
				SecondNum = parseInt(Str.substring(InclTo + 2, InclBy));
				LoopBy = parseInt(Str.substring(InclBy + 2));
			} else {
				SecondNum = parseInt(Str.substring(InclTo + 2));
			}
			for (let Number = FirstNum; Number <= SecondNum; Number += LoopBy) {
				result += " " + Number;
			}
		} else {
			result += " " + Str;
		}
	}
	let Parser = result.substring(1);
	let SingleParse = Parser.split(" ");
	let NEParserResult = "";

	for (let i = 0; i < SingleParse.length; i++) {
		NEParserResult += SingleParse[i] + ",";
	}
	NEParserResult = NEParserResult.slice(0, -1);
	return NEParserResult;
}

//Convert pasred node to list
function stringTolist(string) {
	let nblist = string.split(",").map(Number);
	return nblist;
}

// Make Chart data from node list
async function listTochartData(nblist) {
	let resNode = await midasAPI("GET", "/db/node", "");
	if ("error" in resNode) {
		return resNode.error.message;
	} else if ("message" in resNode) {
		return resNode.message;
	}
	let chartData = new Array(nblist.length);
	let xlist = new Array(nblist.length);
	let ylist = new Array(nblist.length);
	let rnblist = new Array(nblist.length);

	let hasAllKeys = nblist.every(function (element) {
		let key = element.toString();
		return resNode["NODE"].hasOwnProperty(key);
	});
	if (hasAllKeys === false) {
		return false;
	}

	for (let i = 0; i < chartData.length; i++) {
		xlist[i] = resNode["NODE"][nblist[i]]["X"];
		ylist[i] = resNode["NODE"][nblist[i]]["Y"];
		rnblist[i] = nblist[i];
	}
	let indices = Array.from(xlist.keys());
	indices.sort(function (a, b) {
		return xlist[a] - xlist[b];
	});
	xlist = indices.map(function (index) {
		return xlist[index];
	});
	ylist = indices.map(function (index) {
		return ylist[index];
	});
	rnblist = indices.map(function (index) {
		return rnblist[index];
	});

	for (let i = 0; i < chartData.length; i++) {
		chartData[i] = {
			x: xlist[i],
			y: ylist[i],
		};
	}
	return [chartData, rnblist, xlist, ylist];
}

//Chart Scale
function chartScale(NodeVertix) {
	let maxX = NodeVertix.reduce(function (max, obj) {
		return Math.max(max, obj.x);
	}, -Infinity);
	let maxY = NodeVertix.reduce(function (max, obj) {
		return Math.max(max, obj.y);
	}, -Infinity);
	let minX = NodeVertix.reduce(function (min, obj) {
		return Math.min(min, obj.x);
	}, Infinity);
	let minY = NodeVertix.reduce(function (min, obj) {
		return Math.min(min, obj.y);
	}, Infinity);

	const tolerence = 0.1;
	let xlen = Math.abs(maxX - minX);
	let ylen = Math.abs(maxY - minY);

	maxX = maxX + xlen * tolerence;
	minX = minX - xlen * tolerence;
	maxY = maxY + ylen * tolerence;
	minY = minY - ylen * tolerence;

	const scale = 2.0;
	xlen = Math.abs(maxX - minX);
	ylen = Math.abs(maxY - minY);

	if (xlen / ylen < scale) {
		maxX = maxX + (ylen * scale - xlen) / 2;
		minX = minX - (ylen * scale - xlen) / 2;
	} else if (xlen / ylen > scale) {
		maxY = maxY + (xlen / scale - ylen) / 2;
		minY = minY - (xlen / scale - ylen) / 2;
	}

	return [maxX, minX, maxY, minY];
}
