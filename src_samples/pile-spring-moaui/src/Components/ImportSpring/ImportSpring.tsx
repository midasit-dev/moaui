import { py_db_get_maxid, CalculateMatrix, dbCreateItem } from "../../utils_pyscript";

function ImportSpring(
  projectName: string, piletableData: any, soilData : any,
  topLevel : any, GroundLevel : any, Waterlevel : any,
  GroupEffectValue : any, SlopeEffectState : any, foundationwidth : any, sidelength : any
  ){
  const NormalXResult = CalculateMatrix(piletableData, foundationwidth, sidelength, GroundLevel, topLevel, soilData, SlopeEffectState, "normal", "X", GroupEffectValue)
  const NormalZResult = CalculateMatrix(piletableData, foundationwidth, sidelength, GroundLevel, topLevel, soilData, SlopeEffectState, "normal", "Z", GroupEffectValue)
  
  const SeismicXResult = CalculateMatrix(piletableData, foundationwidth, sidelength, GroundLevel, topLevel, soilData, SlopeEffectState, "seismic", "X", GroupEffectValue)
  const SeismicZResult = CalculateMatrix(piletableData, foundationwidth, sidelength, GroundLevel, topLevel, soilData, SlopeEffectState, "seismic", "Z", GroupEffectValue)

  const PeriodXResult = CalculateMatrix(piletableData, foundationwidth, sidelength, GroundLevel, topLevel, soilData, SlopeEffectState, "period", "X", GroupEffectValue)
  const PeriodZResult = CalculateMatrix(piletableData, foundationwidth, sidelength, GroundLevel, topLevel, soilData, SlopeEffectState, "period", "Z", GroupEffectValue)

  const MaxID = py_db_get_maxid("GSTP")
  console.log('MaxID')
  console.log(MaxID)
  const Normal_Name = projectName + "_Normal"
  const Seismic_Name = projectName + "_Seismic"
  const Period_Name = projectName + "_Period"
  
  const NormalMatrix = CombineMatrix(NormalXResult, NormalZResult)
  const NormalInput = {'NAME':Normal_Name, "SPRING":NormalMatrix, "MASS": [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          "DAMPING": [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          "OPT_STIFFNESS": true,
          "OPT_MASS": false,
          "OPT_DAMPING": false}
  
  const SeismicMatrix = CombineMatrix(SeismicXResult, SeismicZResult)
  const SeismicInput = {'NAME':Seismic_Name, "SPRING":SeismicMatrix, "MASS": [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          "DAMPING": [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          "OPT_STIFFNESS": true,
          "OPT_MASS": false,
          "OPT_DAMPING": false}

  const PeriodMatrix = CombineMatrix(PeriodXResult, PeriodZResult)
  const PeriodInput = {'NAME':Period_Name, "SPRING":PeriodMatrix, "MASS": [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          "DAMPING": [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          "OPT_STIFFNESS": true,
          "OPT_MASS": false,
          "OPT_DAMPING": false}
  
  const NormalImport = dbCreateItem("GSTP", MaxID+1, NormalInput)
  const SeismicImport = dbCreateItem("GSTP", MaxID+2, SeismicInput)
  const PeriodImport = dbCreateItem("GSTP", MaxID+3, PeriodInput)
}

function CombineMatrix(XResult:any, ZResult:any){
  let result = []
  result = [XResult[0],ZResult[0],XResult[3],ZResult[5],XResult[5],1000000000000,0,XResult[1],0,XResult[2],0,ZResult[1],-ZResult[2],0,0,ZResult[4],-XResult[4],0,0,0,0]
  return result
}
  

export default ImportSpring;