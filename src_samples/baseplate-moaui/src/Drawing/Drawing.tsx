import { GuideBox, Button} from "@midasit-dev/moaui";
import { useRecoilValue } from "recoil";
import { BP_Node, Node_BP_Data } from "../variables";
import { useEffect, useState, useRef } from "react";
import { ReactSVGPanZoom, TOOL_NONE } from "react-svg-pan-zoom";
import { ReactSvgPanZoomLoader } from "react-svg-pan-zoom-loader";
import Viewer from "./svgViewer";
function Drawing(){

  
  const baseurl = "https://api.job-runner.dwg.kr-dv-midasit.com/basePlatePrototype";
  const bp_Node:any = useRecoilValue(BP_Node);
  const node_BP_Data = useRecoilValue(Node_BP_Data);

  useEffect (() => {
    const formData = new FormData();
    let Node_List = [0,0,0,0]
    //1. BP Node 에서 BP 이름 가져오기
    const bp_Name_Arr:any = Object.keys(bp_Node)
    for (let i = 0; i<bp_Name_Arr.length; i++){
      Node_List[i] = bp_Node[bp_Name_Arr[i]]['NODE'][0]
    }

    for (let i = 0; i<Node_List.length; i++){
      let item = {}
      let objectName = ''
      //만약 node_BP_Data[Node_List[i]] 가 없다면 모든 값 0
      if (node_BP_Data[Node_List[i]] == undefined){
        item = {
          "HBeamType" : 'H-400X200X8X13',
          "HBeamMAT" : 'SS400',
          "BasePlateW": 0,
          "BasePlateL": 0,
          "BasePlateH": 0,
          "RibPlateW": 0,
          "RibPlateH": 0,
          "RibPlateTHK": 0,
          "AnchorBoltOffsetX": 0,
          "AnchorBoltOffsetY": 0,
        }
        objectName = 'BP0' + (i+1).toString()
      }
      else{
        let DBName = node_BP_Data[Node_List[i]]['BASEPLATE']['COLUMN']['DB']
        // H 400x200x8/13 형식을 H-400X200X8X13 으로 변경
        DBName = DBName.replace('x','X')
        DBName = DBName.replace('/','X')
        DBName = DBName.replace(' ','-')

        item = {
          "HBeamType" : DBName,
          "HBeamMAT" : node_BP_Data[Node_List[i]]['BASEPLATE']['PLATE']['MATL'],
          "BasePlateW": Number(node_BP_Data[Node_List[i]]['BASEPLATE']['PLATE']['WIDTH']),
          "BasePlateL": Number(node_BP_Data[Node_List[i]]['BASEPLATE']['PLATE']['HEIGHT']),
          "BasePlateH": Number(node_BP_Data[Node_List[i]]['BASEPLATE']['PLATE']['THIK']),
          "RibPlateW": 0,
          "RibPlateH": 0,
          "RibPlateTHK": 0,
          "AnchorBoltOffsetX": Number(node_BP_Data[Node_List[i]]['BASEPLATE']['ANCHOR']['XPOSITION']),
          "AnchorBoltOffsetY": Number(node_BP_Data[Node_List[i]]['BASEPLATE']['ANCHOR']['YPOSITION']),
        }
        objectName = 'BP0' + (i+1).toString()
      }
      formData.append(objectName, JSON.stringify(item))
    }
    fetch(baseurl, {
      method: 'POST',
      body: formData,
    })
    .then(response => response.json())
    .catch(error => console.error('Error:', error));

  }, [bp_Node, node_BP_Data])

  const handleDownLoad = () => { 
    const url = "https://api.job-runner.dwg.kr-dv-midasit.com/result.dwg";
    fetch(url)
    .then(response => response.blob())
    .then(blob => {
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'result.dwg');
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
    })
    .catch(error => console.error('Error:', error));
  }

  
  return (
    <GuideBox width={1000} height={550}>
      <Viewer width={1000} height={550} />
      <GuideBox width={1000} horRight marginTop={1}>
        <Button
        variant="contained"
        onClick={handleDownLoad}
        >
          Download DWG
        </Button>
      </GuideBox>
      
    </GuideBox>
  )
}

export default Drawing;