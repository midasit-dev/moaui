import { VerifyUtil } from '@midasit-dev/moaui';
export {midasAPI, NEParser, listToLength, stringTolist};

async function midasAPI(method, subURL, body) {
  const baseURL = await VerifyUtil.getBaseUrlAsync();
  const Mapi_Key = VerifyUtil.getMapiKey();
  let res;
  if (method === "POST" || method === "PUT") {
    res = await fetch(baseURL + subURL, {
      method: method,
      headers: {
          "Content-Type": "application/json",
          "MAPI-Key": Mapi_Key
      },
      body: JSON.stringify(body)
    })
  } else {
    res = await fetch(baseURL + subURL, {
      method: method,
      headers: {
          "Content-Type": "application/json",
          "MAPI-Key": Mapi_Key
      }
    })
  }
  console.log(subURL, res.status)
  return await res.json();
}

//Pasring Node Number
function NEParser(NEString) {
	console.log(NEString);
	if (!NEString.includes("to") && 
			!NEString.includes("by")) {
		return NEString;
	}

  let origin = (NEString||"").split(" ");
  let result = "";
  for (let i = 0; i < origin.length;i++) {
    let Str = origin[i];
    let InclTo = Str.indexOf("to");
    let InclBy = Str.indexOf("by");
    if (InclTo !== -1) {
      let FirstNum = parseInt(Str.substring(0, InclTo));
      let SecondNum;
      let LoopBy = 1;
      if (InclBy!== -1) {
        SecondNum = parseInt(Str.substring(InclTo + 2,InclBy));
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
  NEParserResult = NEParserResult.slice(0,-1);
  return NEParserResult;
}

async function listToLength(elemList) {
  let elemSplit = elemList.split(",").map(Number);
  let elemRes = await midasAPI("GET","/db/elem")
  let nodeRes = await midasAPI("GET","/db/node")
  if (elemRes.hasOwnProperty("error")) {
    return false
  }
  
  let nodeIJ = new Array(elemSplit.length)
  for (let i = 0; i < elemSplit.length; i++) {
    nodeIJ[i] = [elemRes["ELEM"][elemSplit[i]]["NODE"][0], elemRes["ELEM"][elemSplit[i]]["NODE"][1]];
  }

  let xi,yi,zi;
  let xj,yj,zj;
  let dLen = 0;
  let tLen = 0;
  for (let i = 0; i < elemSplit.length; i++) {
    xi = nodeRes["NODE"][nodeIJ[i][0]]["X"];
    yi = nodeRes["NODE"][nodeIJ[i][0]]["Y"];
    zi = nodeRes["NODE"][nodeIJ[i][0]]["Z"];
    xj = nodeRes["NODE"][nodeIJ[i][1]]["X"];
    yj = nodeRes["NODE"][nodeIJ[i][1]]["Y"];
    zj = nodeRes["NODE"][nodeIJ[i][1]]["Z"];
    dLen = Math.sqrt((xi-xj)**2 + (yi-yj)**2 + (zi-zj)**2);
    tLen = tLen + dLen;
  }
  tLen = Math.round(tLen*10)/10;
  return tLen;
}

//Convert pasred node to list
function stringTolist(string) {
  let nblist = string.split(",").map(Number);
  return nblist
}