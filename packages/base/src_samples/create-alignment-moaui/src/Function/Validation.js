export{ checkAllTrue, AlignDataValid, SegmDataValid, NodeElemValid }

function checkAllTrue(arr) {
  return arr.every(item => item.valid === true);
}

function AlignDataValid(alignData) {
  let ltype, len, rads, rade;
  let ValidCheck;
  let AlignValid = [];

  for (let i = 0; i < alignData.length ; i++) {
    ValidCheck = true;
    len = alignData[i].linelength;
    rads = alignData[i].linerads;
    rade = alignData[i].linerade;
    ltype = alignData[i].linetype;
    switch (ltype) {
      case "Straight":
        if (len === 0) {
          ValidCheck = false;
        }
        break;
      case "Arc":
        if (len === 0 || rads === 0) {
          ValidCheck = false;
        }
        break;
      case "Clothoid":
        if (len === 0 || (rads === 0 && rade === 0) || (rads > 0 && rade < 0) || (rads > 0 && rade < 0)) {
          ValidCheck = false;
        }
        break;
      case "Cubic Parabola":
        if (len === 0 || (rads === 0 && rade === 0) || (rads > 0 && rade > 0) || (rads < 0 && rade < 0) || (rads > 0 && rade < 0) || (rads < 0 && rade > 0)){
          ValidCheck = false;
        }
        break;
      default:
        break;
    }
    AlignValid.push(
      {
        'line' : i + 1,
        'type' : ltype,
        'valid' : ValidCheck
      }
    );
  }
  return AlignValid;
}

function SegmDataValid(segmData){
  let len, num, group, matlid, sectid;
  let ValidCheck;
  let SegmValid = [];

  for (let i = 0; i < segmData.length ; i++) {
    ValidCheck = true;
    len = segmData[i].seglength;
    num = segmData[i].segNumber;
    group = segmData[i].strgroup;
    matlid = segmData[i].matlid;
    sectid = segmData[i].sectid;
    
    if (len <= 0) {
      ValidCheck = false;
    }
    if (Number.isInteger(num) === false || Number(num) === 0) {
      ValidCheck = false;
    }
    if (group.length > 90) {
      ValidCheck = false;
    }
    if (matlid <= 0 || matlid > 999999 || Number.isInteger(matlid) === false ) {
      ValidCheck = false;
    }
    if (sectid <= 0 || sectid > 999999 || Number.isInteger(sectid) === false ) {
      ValidCheck = false;
    }
    SegmValid.push(
      {
        'line' : i + 1,
        'valid' : ValidCheck
      }
    );
  }
  return SegmValid;
}

function NodeElemValid(nodeStart, elemStart) {
  
  let nbValid = [{ "message": "", "valid" : true }, {"message": "", "valid" : true}];

  if (nodeStart <= 0 || nodeStart > 999999) {
    nbValid[0].message = "The possible node data entry ranges from 1 to 999999";
    nbValid[0].valid = false;
  }
  if (elemStart <= 0 || elemStart > 999999) {
    nbValid[1].message = "The possible element data entry ranges from 1 to 999999";
    nbValid[1].valid = false;
  }
  return nbValid;
}