import * as Common from './Common'

export {CreateLoadCases, CreateLcom, DeleteLoadCases, ShowLoads, ExistLoadCases}

async function CreateLoadCases(nameCases, noCases) {
  // Call response of STLD
  let stldRes = await Common.midasAPI("GET","/db/stld")
  
  // Assign Number of LoadCases
  let nb;
  let tempN
  if ("error" in stldRes) {
    nb = 1
  } else {
    tempN = Object.keys(stldRes["STLD"])
    for (let i = 0; i < tempN.length; i++) {
      tempN[i] = parseFloat(tempN[i])
    }
    nb = Math.max(...tempN) + 1
  }
  //Error message - Check Load Case Name Duplication
  if ("STLD" in stldRes) {
    for (let i = 0; i < Object.keys(stldRes["STLD"]).length; i++) {
      for (let j = 0; j < noCases; j++) {
        if (stldRes["STLD"][tempN[i]]["NAME"] === (nameCases + "_#" + j + 1)) {
          return "10"
        }
      }
    }
  }
  //Create Json Body
  let stldBody = {"Assign" : {}}
  for (let i = 0; i < noCases; i++) {
    stldBody["Assign"][nb + i] = {
      "NAME" : nameCases + "_#" + (i + 1).toString(),
      "TYPE" : "USER",
      "DESC" : "Series Loads_#" + (i + 1).toString(),
    }
  }
  
  let newStldRes = await Common.midasAPI("PUT","/db/stld",stldBody)
  if ("STLD" in newStldRes) {
    return "00"
  } else {
    return "20"
  }
}

async function CreateLcom(nameCases, noCases) {
  let lcomRes = await Common.midasAPI("GET","/db/lcom-gen");
  
  // Assign Number of Load Combinations
  let nb;
  let tempN;
  if ("error" in lcomRes) {
    nb = 1
  } else {
    tempN = Object.keys(lcomRes["LCOM-GEN"])
    for (let i = 0; i < tempN.length; i++) {
      tempN[i] = parseFloat(tempN[i])
    }
    nb = Math.max(...tempN) + 1
  }
  //Error message - Check Load Case Name Duplication
  if ("LCOM-GEN" in lcomRes) {
    for (let i = 0; i < Object.keys(lcomRes["LCOM-GEN"]).length; i++) {
      if (lcomRes["LCOM-GEN"][tempN[i]]["NAME"] === (nameCases)) {
        return "10"
      }
    }
  }
  //Create Json Body
  let vCombBody = new Array(noCases);
  for (let i = 0; i < noCases; i++) {
    vCombBody[i] = {
      "ANAL": "ST",
      "LCNAME" : nameCases + "_#" + (i + 1).toString(),
      "FACTOR": 1
    }
  }
  let lcomBody = { "Assign" : {} }
  lcomBody["Assign"][nb] =  {
    "NAME" : nameCases,
    "ACTIVE" : "ACTIVE",
    "iTYPE" : 1,
    "DESC" : "SeriesLoad",
    "vCOMB":[
      ...vCombBody
    ]
  }
  
  let newLcomRes = await Common.midasAPI("PUT","/db/lcom-gen",lcomBody);
  if ("LCOM-GEN" in newLcomRes) {
    return "00"
  } else {
    return "20"
  }
}

async function ExistLoadCases(lcName, nbCases) {
  // Call response of STLD
  let stldRes = await Common.midasAPI("GET","/db/stld")
  if (stldRes.hasOwnProperty("STLD")){
    let stldName = Object.values(stldRes.STLD).map(item=>item.NAME);
    let newStldName = [];
    for (let i = 0; i < nbCases; i++) {
      newStldName.push(lcName + "_#" + i);
    }
    for (const value of newStldName) {
      if (!stldName.includes(value)) {
        return "20"
      } else {
        return "00"
      }
    }
  } else {
    return "10"
  }
}

async function DeleteLoadCases() {
  // Call response of STLD
  let stldRes = await Common.midasAPI("GET","/db/stld")

  // Assign Number of LoadCases
  let tempN
  if ("error" in stldRes) {
    return "10"
  } else {
    tempN = Object.keys(stldRes["STLD"])
    for (let i = 0; i < tempN.length; i++) {
      tempN[i] = parseFloat(tempN[i])
    }
  }

  let newStldRes;
  for (let i = tempN.length-1; i >= 0; i--) {
    if (stldRes["STLD"][tempN[i]]["DESC"].substr(0,6) === "Series") {
      newStldRes = await Common.midasAPI("DELETE","/db/stld/"+tempN[i]);
    }
  }
  if ("STLD" in newStldRes) {
    return "00"
  } else {
    return "20"
  }
}

async function ShowLoads(lcName, nbCases) {
  let loadCaseCheck = await ExistLoadCases(lcName, nbCases);
  if (loadCaseCheck === "10" && loadCaseCheck === "20") {
    return false
  }
  let viewName;
  let viewBody = {
    "Argument": {
        "UFIG_LIST": [
            {
                "RUN_ANALYSIS": false,
                "IS_PRE_MODE": true,
                "HIDDEN": true,
                "VIEW_HORIZONTAL": 30,
                "VIEW_VERTICAL": 45,
                "LOADCASE_TYPE": "ST",
                "LOADCASE_NAME": "KL-510TRK_#1",
                "LOAD_DISP_OPT": {
                    "LOAD_VALUE_LABEL": true,
                    "LOAD_VALUE_EXP": false,
                    "LOAD_VALUE_DECIMAL_PT": 3,
                    "LOAD_DISP_OPT_LIST": [
                        "BMLD"
                    ]
                }
            }
        ]
    }
}
  for (let i = 0; i < nbCases; i++) {
    viewName = lcName + "_#" + (i+1);
    viewBody.Argument.UFIG_LIST[0].LOADCASE_NAME = viewName
    await Common.midasAPI("POST","/view/capture/",viewBody);
  }
}