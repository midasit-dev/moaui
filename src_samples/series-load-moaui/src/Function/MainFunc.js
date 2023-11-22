import * as Common from './Common'
import * as Spline from './Spline'

export{AxleLoads}

async function AxleLoads(
  axleLoads, distLoads, distLenFor, distLenBak, imptFac,
  maxSpeed, grvAccel, centFac, radioOp, startPt, endPt, 
  lcName, nbCases, distSeries, firLoadPos, horEccen, verEccen,
  orgPtStrPt, strPtDist1, strPtDist2, 
  elemList,
  axeLoadChk, dstLoadChk, impLoadChk, cntLoadChk
  ) {
  
  let resultAPI = [];
  //Element and Node List
  let res_unit = await Common.midasAPI("PUT","/db/unit", {
    "Assign": {
        "1": {
            "FORCE": "KN",
            "DIST": "M",
            "HEAT": "J",
            "TEMPER": "C"
        }
    }
  });

  // return message of unit
  if (res_unit.hasOwnProperty("UNIT")){
    resultAPI.push(["unit", true])
  } else {
    resultAPI.push(["unit", false])
  }

  let elemParsing = Common.NEParser(elemList);
  let elemSplit = elemParsing.split(",").map(Number);
  let elemRes = await Common.midasAPI("GET","/db/elem");
  let ElemNodeList = new Array(elemSplit.length);
  for (let i = 0; i < elemSplit.length; i++) {
    ElemNodeList[i] = [
      elemSplit[i],
      elemRes["ELEM"][elemSplit[i]]["NODE"][0],
      elemRes["ELEM"][elemSplit[i]]["NODE"][1]
    ]
  }
  //Length List
  let xSeries = new Array(elemSplit.length + 1);
  let ySeries = new Array(elemSplit.length + 1);
  let xi, yi, zi;
  let xj, yj, zj;
  let dLen;
  let AccI = 0;
  let AccJ = 0;
  let nodeRes = await Common.midasAPI("GET","/db/node");
  let Length = new Array(elemSplit.length);
  for (let i = 0; i < elemSplit.length; i++) {
    xi = nodeRes["NODE"][ElemNodeList[i][1]]["X"]
    yi = nodeRes["NODE"][ElemNodeList[i][1]]["Y"]
    zi = nodeRes["NODE"][ElemNodeList[i][1]]["Z"]
    xj = nodeRes["NODE"][ElemNodeList[i][2]]["X"]
    yj = nodeRes["NODE"][ElemNodeList[i][2]]["Y"]
    zj = nodeRes["NODE"][ElemNodeList[i][2]]["Z"]
    dLen = Math.sqrt((xi-xj)**2 + (yi-yj)**2 + (zi-zj)**2);
    AccJ = AccJ + dLen
    AccI = AccJ - dLen
    Length[i] = [
      dLen,
      AccI,
      AccJ
    ];
    xSeries[i] = xi;
    ySeries[i] = yi;
  }
  xSeries[elemSplit.length] = xj
  ySeries[elemSplit.length] = yj
  // Radius List
  let Radius;
  let div = 1;
  if (radioOp === "MCS") {
    Radius = Spline.MonotoneCubicSpline(xSeries,ySeries,div)
  } else if (radioOp === "NCS") {
    Radius = Spline.NaturalCubicSpline(xSeries,ySeries,div)
  } else if (radioOp === "CCS") {
    Radius = Spline.ClampedCubicSpline(xSeries, ySeries, div, startPt, endPt)
  }
  let CalcRadius = new Array(Radius.length);
  for (let i = 0; i < Radius.length; i++) {
    if (Math.round(Radius[i][3]*(10**12))/(10**12) === 0) {
      CalcRadius[i] = 0;
    } else {
      CalcRadius[i] = ((1 + Radius[i][2]**2)**(3/2)) / Radius[i][3];
    }
  }
  let RadiusIJ = new Array(elemSplit.length);
  for (let i = 0; i < elemSplit.length; i++) {
    RadiusIJ[i] = [
      CalcRadius[i],
      CalcRadius[i+1],
    ];
  }
  //Create Matrix
  Array.matrix = function (x,y,z=NaN) {
    let a, i, final = [];
    if (isNaN(z)) {
      for (i = 0; i < x; i ++){
        a = Array.matrix(y);
        final[i] = a;
      }
    } else {
      for (i = 0; i < x; i ++){
        a = Array.matrix(y,z);
        final[i] = a;
      }  
    }
    return final;
  }
  //Variable
  let LoadCaseName = new Array(nbCases);
  let nAxle = axleLoads.length;
  let TempDist;
  let BmldInputP = Array.matrix(nbCases,nAxle,8);
  let BmldInputW = Array.matrix(nbCases,10);
  
  //Create Input Data for Concentrate Loads
  for (let i = 0; i < nbCases; i++) {
    LoadCaseName[i] = lcName + "_#" + (i + 1);
    for (let j = 0; j < nAxle; j++) {
      if (j === 0) {
        TempDist = 0
      } else {
        TempDist = TempDist + axleLoads[j-1]["dist"]
      }
      BmldInputP[i][j][0] = i * distSeries + orgPtStrPt - TempDist;      //Load Position of Start Number
      BmldInputP[i][j][1] = axleLoads[j]["loads"];                       //Axle loads
      BmldInputP[i][j][2] = axleLoads[j]["loads"] * (1 + imptFac / 100); //Impact loads
      for (let k = 0; k < ElemNodeList.length; k++) {
        if (BmldInputP[i][j][0] > Length[k][1] && BmldInputP[i][j][0] <= Length[k][2]) {
          BmldInputP[i][j][3] = ElemNodeList[k][0];
          BmldInputP[i][j][4] = (BmldInputP[i][j][0] - Length[k][1]) / (Length[k][2] - Length[k][1]);
          BmldInputP[i][j][5] = (RadiusIJ[k][0] + RadiusIJ[k][1]) / 2;
          if (BmldInputP[i][j][5] !== 0 ) {
            BmldInputP[i][j][6] = (maxSpeed * 1000 / 3600)**2 / (grvAccel*BmldInputP[i][j][5])*BmldInputP[i][j][1];
            BmldInputP[i][j][7] = BmldInputP[i][j][6] * centFac;
          }
        }
      }
    }
  }
  
  //Create Input Data for Distributions Loads
  let k = 0
  let TempElem = [];
  let TempRatio = [];
  for (let i = 0; i < nbCases; i++) {
    BmldInputW[i][0] = distLoads;
    BmldInputW[i][1] = distLoads * (1 + imptFac / 100);
    BmldInputW[i][2] = i * distSeries + strPtDist1;
    BmldInputW[i][3] = BmldInputW[i][2] + distLenFor;
    k = 0
    for (let j = 0; j < ElemNodeList.length; j++) {
      if (BmldInputW[i][2] > Length[j][1] && BmldInputW[i][2] < Length[j][2]) {
        TempElem[k] = ElemNodeList[j][0];
        TempRatio[k] = (BmldInputW[i][2] - Length[j][1]) / (Length[j][2] - Length[j][1]);
        k = k + 1;
      }
      if (BmldInputW[i][2] <= Length[j][1] && BmldInputW[i][3] >= Length[j][2]) {
        TempElem[k] = ElemNodeList[j][0];
        TempRatio[k] = 1;
        k = k + 1;
      }
      if (BmldInputW[i][3] > Length[j][1] && BmldInputW[i][3] < Length[j][2]) {
        TempElem[k] = ElemNodeList[j][0];
        TempRatio[k] = (BmldInputW[i][3] - Length[j][1]) / (Length[j][2] - Length[j][1]);
        k = k + 1;
      }
    }
    BmldInputW[i][4] = TempElem;
    BmldInputW[i][5] = TempRatio;
    TempElem = [];
    TempRatio = [];
    BmldInputW[i][7] = i * distSeries + strPtDist2 * -1;
    BmldInputW[i][6] = BmldInputW[i][7] - distLenBak;
    k = 0
    for (let j = 0; j < ElemNodeList.length; j++) {
      if (BmldInputW[i][6] > Length[j][1] && BmldInputW[i][6] < Length[j][2]) {
        TempElem[k] = ElemNodeList[j][0];
        TempRatio[k] = (BmldInputW[i][6] - Length[j][1]) / (Length[j][2] - Length[j][1]);
        k = k + 1;
      }
      if (BmldInputW[i][6] <= Length[j][1] && BmldInputW[i][7] >= Length[j][2]) {
        TempElem[k] = ElemNodeList[j][0];
        TempRatio[k] = 1;
        k = k + 1;
      }
      if (BmldInputW[i][7] > Length[j][1] && BmldInputW[i][7] < Length[j][2]) {
        TempElem[k] = ElemNodeList[j][0];
        TempRatio[k] = (BmldInputW[i][7] - Length[j][1]) / (Length[j][2] - Length[j][1]);
        k = k + 1;
      }
    }
    BmldInputW[i][8] = TempElem;
    BmldInputW[i][9] = TempRatio;
    TempElem = [];
    TempRatio = [];
  }

  let TotalElemNo = [];
  for (let i = 0; i < nbCases; i++) {
    for (let j = 0; j < nAxle; j++) {
      TotalElemNo.push(BmldInputP[i][j][3]);
    }
  }
  for (let i = 0; i < nbCases; i++) {
    for (let j = 0; j < BmldInputW[i][4].length; j++) {
      TotalElemNo.push(BmldInputW[i][4][j]);
    }
    for (let j = 0; j < BmldInputW[i][8].length; j++) {
      TotalElemNo.push(BmldInputW[i][8][j]);
    }
  }
  let UniquElemArray = [...new Set(TotalElemNo)];
  let UniquElemCount = UniquElemArray.filter(element => !Array.isArray(element) || element.length > 0);
  let bmldRes = await Common.midasAPI("GET", "/db/bmld");
  let ExistElemNo = [];
  let UniquElemNo = [];
  let TempNo, TempID;
  if ("error" in bmldRes) {
    UniquElemNo = [...UniquElemCount];
  } else {
    ExistElemNo = Object.keys(bmldRes["BMLD"]);
    UniquElemNo = [...UniquElemCount];
    for (let i = 0; i < UniquElemCount.length; i++) {
      for (let j = 0; j < bmldRes["BMLD"].length; j++){
        TempNo = bmldRes["BMLD"][ExistElemNo[j]]["ITEMS"].length;
        TempID = bmldRes["BMLD"][ExistElemNo[j]]["ITEMS"][TempNo]["ID"];
        UniquElemCount[UniquElemNo[i]] = TempID;
      }
    }
  }
  //Axle Loads!!!!!
  let axleLoadBody = {"Assign" : {}};
  let tempBody = {};
  let tempArray = [];
  if (axeLoadChk) {
    for (let i = 0; i < UniquElemCount.length; i++) {
        tempArray = [];
        for (let j = 0; j < nbCases; j++) {
          for (let k = 0; k < nAxle; k++) {
            if (BmldInputP[j][k][3] === UniquElemNo[i]) {
              tempBody = {};
              TempID = UniquElemCount[UniquElemNo[i]] + 1;
              UniquElemCount[UniquElemNo[i]] = TempID;
              tempBody["ID"] = TempID;
              tempBody["LCNAME"] = LoadCaseName[j];
              tempBody["CMD"] = "BEAM";
              tempBody["TYPE"] = "CONLOAD";
              tempBody["DIRECTION"] = "LZ";
              tempBody["USE_PROJECTION"] = false;
              tempBody["USE_ECCEN"] = true;
              tempBody["ECCEN_TYPE"] = 1;
              tempBody["ECCEN_DIR"] = "LY";
              tempBody["I_END"] = horEccen;
              tempBody["J_END"] = horEccen;
              tempBody["USE_J_END"] = false;
              tempBody["D"] = [BmldInputP[j][k][4],0,0,0];
              if (impLoadChk) {
                tempBody["P"] = [BmldInputP[j][k][2]*-1,0,0,0];
              } else {
                tempBody["P"] = [BmldInputP[j][k][1]*-1,0,0,0];
              }
              tempBody["USE_ADDITIONAL"] = false;
              tempBody["ADDITIONAL_I_END"] = 0;
              tempBody["ADDITIONAL_J_END"] = 0;
              tempBody["USE_ADDITIONAL_J_END"] = false;
              tempArray.push(tempBody);
            }
          }
        }
        axleLoadBody["Assign"][UniquElemNo[i]] = {
          "ITEMS" : tempArray
        }
    }
    let res_axle = await Common.midasAPI("PUT","/db/bmld",axleLoadBody)
    // return message of unit
    if (res_axle.hasOwnProperty("BMLD")){
      resultAPI.push(["axle loads", true])
    } else {
      resultAPI.push(["axle loads", false])
    }
  }

  //Distribution Loads
  let distLoadBody = {"Assign" : {}};
  if (dstLoadChk) {
    for (let i = 0; i < UniquElemCount.length; i++) {
      tempArray = [];
      for (let j = 0; j < nbCases; j++) {
        for (let k = 0; k < BmldInputW[j][4].length; k++) {
          if (BmldInputW[j][4][k] === UniquElemNo[i]) {
            tempBody = {};
            TempID = UniquElemCount[UniquElemNo[i]] + 1;
            UniquElemCount[UniquElemNo[i]] = TempID;
            tempBody["ID"] = TempID;
            tempBody["LCNAME"] = LoadCaseName[j];
            tempBody["CMD"] = "BEAM";
            tempBody["TYPE"] = "UNILOAD";
            tempBody["DIRECTION"] = "LZ";
            tempBody["USE_PROJECTION"] = false;
            tempBody["USE_ECCEN"] = true;
            tempBody["ECCEN_TYPE"] = 1;
            tempBody["ECCEN_DIR"] = "LY";
            tempBody["I_END"] = horEccen;
            tempBody["J_END"] = horEccen;
            tempBody["USE_J_END"] = false;
            if (k === 0 && BmldInputW[j][5][k] < 1) {
              tempBody["D"] = [BmldInputW[j][5][k], 1, 0, 0];
            } else {
              tempBody["D"] = [0, BmldInputW[j][5][k], 0, 0];
            }
            if (impLoadChk) {
              tempBody["P"] = [BmldInputW[j][0]*-1,BmldInputW[j][0]*-1,0,0];
            } else {
              tempBody["P"] = [BmldInputW[j][1]*-1,BmldInputW[j][0]*-1,0,0];
            }
            tempBody["USE_ADDITIONAL"] = false;
            tempBody["ADDITIONAL_I_END"] = 0;
            tempBody["ADDITIONAL_J_END"] = 0;
            tempBody["USE_ADDITIONAL_J_END"] = false;
            tempArray.push(tempBody);
          }
        }
        for (let k = 0; k < BmldInputW[j][8].length; k++) {
          if (BmldInputW[j][8][k] === UniquElemNo[i]) {
            tempBody = {};
            TempID = UniquElemCount[UniquElemNo[i]] + 1;
            UniquElemCount[UniquElemNo[i]] = TempID;
            tempBody["ID"] = TempID;
            tempBody["LCNAME"] = LoadCaseName[j];
            tempBody["CMD"] = "BEAM";
            tempBody["TYPE"] = "UNILOAD";
            tempBody["DIRECTION"] = "LZ";
            tempBody["USE_PROJECTION"] = false;
            tempBody["USE_ECCEN"] = true;
            tempBody["ECCEN_TYPE"] = 1;
            tempBody["ECCEN_DIR"] = "LY";
            tempBody["I_END"] = horEccen;
            tempBody["J_END"] = horEccen;
            tempBody["USE_J_END"] = false;
            if (k === 0 && BmldInputW[j][9][k] < 1) {
              tempBody["D"] = [BmldInputW[j][9][k], 1, 0, 0];
            } else {
              tempBody["D"] = [0, BmldInputW[j][9][k], 0, 0];
            }
            if (impLoadChk) {
              tempBody["P"] = [BmldInputW[j][0]*-1,BmldInputW[j][0]*-1,0,0];
            } else {
              tempBody["P"] = [BmldInputW[j][1]*-1,BmldInputW[j][0]*-1,0,0];
            }
            tempBody["USE_ADDITIONAL"] = false;
            tempBody["ADDITIONAL_I_END"] = 0;
            tempBody["ADDITIONAL_J_END"] = 0;
            tempBody["USE_ADDITIONAL_J_END"] = false;
            tempArray.push(tempBody);
          }
        }
      }
      distLoadBody["Assign"][UniquElemNo[i]] = {
        "ITEMS" : tempArray
      }
    }
    let res_dist = await Common.midasAPI("PUT","/db/bmld",distLoadBody)
    // return message of unit
    if (res_dist.hasOwnProperty("BMLD")){
      resultAPI.push(["distributed loads", true])
    } else {
      resultAPI.push(["distributed loads", false])
    }
  }
  
  //Centrifugal
  let centLoadBody = {"Assign" : {}};
  if (cntLoadChk) {
    for (let i = 0; i < UniquElemCount.length; i++) {
      tempArray = [];
      for (let j = 0; j < nbCases; j++) {
        for (let k = 0; k < nAxle; k++) {
          if (BmldInputP[j][k][3] === UniquElemNo[i] && BmldInputP[j][k][7].length !== 0) {
            tempBody = {};
            TempID = UniquElemCount[UniquElemNo[i]] + 1;
            UniquElemCount[UniquElemNo[i]] = TempID;
            tempBody["ID"] = TempID;
            tempBody["LCNAME"] = LoadCaseName[j];
            tempBody["CMD"] = "BEAM";
            tempBody["TYPE"] = "CONLOAD";
            tempBody["DIRECTION"] = "LY";
            tempBody["USE_PROJECTION"] = false;
            tempBody["USE_ECCEN"] = true;
            tempBody["ECCEN_TYPE"] = 1;
            tempBody["ECCEN_DIR"] = "LZ";
            tempBody["I_END"] = verEccen;
            tempBody["J_END"] = verEccen;
            tempBody["USE_J_END"] = false;
            tempBody["D"] = [BmldInputP[j][k][4], 0, 0, 0];
            tempBody["P"] = [BmldInputP[j][k][7]*-1, 0, 0, 0];
            tempBody["USE_ADDITIONAL"] = false;
            tempBody["ADDITIONAL_I_END"] = 0;
            tempBody["ADDITIONAL_J_END"] = 0;
            tempBody["USE_ADDITIONAL_J_END"] = false;
            tempArray.push(tempBody);
          }
        }
      }
      centLoadBody["Assign"][UniquElemNo[i]] = {
        "ITEMS" : tempArray
      }
    }
    let res_cent = await Common.midasAPI("PUT","/db/bmld",centLoadBody)
    // return message of unit
    if (res_cent.hasOwnProperty("BMLD")){
      resultAPI.push(["centrifugal loads", true])
    } else {
      resultAPI.push(["centrifugal loads", false])
    }
  }
  return resultAPI;
}
