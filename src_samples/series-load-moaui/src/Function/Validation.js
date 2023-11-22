export{ checkAllTrue, VerticalLoadValid, NumberCheckValue}

function checkAllTrue(arr) {
  return arr.every(item => item.valid === true);
}

function VerticalLoadValid(axleloads) {
  let ValidCheck;
  let AxleValid = [];
  ValidCheck = true;
  for (let i = 0; i < axleloads.length; i++) {
    if (axleloads[i].loads === null || axleloads[i].loads === "" || axleloads[i].dist === null || axleloads[i].dist === "" ) {
      ValidCheck = false
      AxleValid.push({
        'message' : "Review row #" + i + " of the Vertical load data",
        'valid' : ValidCheck
      })
    } else {
      ValidCheck = true
      AxleValid.push({
        'message' : "success",
        'valid' : ValidCheck
      })
    }
  }
  return AxleValid
}

function NumberCheckValue(value) {
  if (isNaN(value) === false || value === "") {
    return false 
  }
}