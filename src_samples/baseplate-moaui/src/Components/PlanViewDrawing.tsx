import {GuideBox, ChartLine, Typography} from '@midasit-dev/moaui';
import React, { useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Node_BP_Data, SelectedColumnIndex, SelectedColumnIndex_DBName, PlanviewBPNameCheck, 
  PlanviewColumnNameCheck, PlanviewNodeCheck, PlanViewSelectedNode} from '../variables';
import { text } from 'stream/consumers';
const PlanViewDrawing = ({
  panelSize = 500,
  MinMaxCord = [1,1,1,1]
}:any) => {
  const canvasRef = useRef(null);
  

  const MinXCord = MinMaxCord[0]
  const MinYCord = MinMaxCord[1]
  const MaxXCord = MinMaxCord[2]
  const MaxYCord = MinMaxCord[3]
  const CenterXCord = (MaxXCord + MinXCord) / 2
  const CenterYCord = (MaxYCord + MinYCord) / 2
  
  const canvasSize = panelSize-20;
  const selectedColumnIndex = useRecoilValue(SelectedColumnIndex);
  const selectedColumnIndex_DBName = useRecoilValue(SelectedColumnIndex_DBName);
  const [node_BP_Data, setNode_BP_Data] = useRecoilState(Node_BP_Data);

  const planViewNodeCheck = useRecoilValue(PlanviewNodeCheck);
  const planViewColumnNameCheck = useRecoilValue(PlanviewColumnNameCheck);
  const planViewBPNameCheck = useRecoilValue(PlanviewBPNameCheck);

  const [planViewSelectedNode, setPlanViewSelectedNode] = useRecoilState(PlanViewSelectedNode);

  // Scale 지정
  let scale = 0
  scale = canvasSize * 0.90 / Math.max(MaxXCord-MinXCord, MaxYCord-MinYCord);

  const drawHBeam = (ctx:any, BP_Data:any, nodekey : any) => {
    let SectionDBName = ''
    for (let key in selectedColumnIndex_DBName){
      if (key == selectedColumnIndex.toString()){
        SectionDBName = selectedColumnIndex_DBName[key]
      }
    }
    if (SectionDBName == BP_Data.BASEPLATE.COLUMN.DB){
      ctx.strokeStyle = '#FF0000';
      ctx.fillStyle = '#FF0000';
    }
    else{
      ctx.strokeStyle = '#000000';
      ctx.fillStyle = '#000000';
    }

    const DBName = BP_Data.BASEPLATE.COLUMN.DB
    const HBeamHeight = Number(DBName.split(' ')[1].split('x')[0])
    const HBeamWidth = Number(DBName.split(' ')[1].split('x')[1])
    const HBeamtw = Number(DBName.split(' ')[1].split('x')[2].split('/')[0])
    const HBeamtf = Number(DBName.split(' ')[1].split('x')[2].split('/')[1])

    const BaseplateWidth = BP_Data.BASEPLATE.PLATE.WIDTH
    const BaseplateHeight = BP_Data.BASEPLATE.PLATE.HEIGHT
    const HBeamvertex = [
      [HBeamWidth/2, HBeamHeight/2],
      [HBeamWidth/2, HBeamHeight/2-HBeamtf],
      [HBeamtw/2, HBeamHeight/2-HBeamtf],
      [HBeamtw/2, -HBeamHeight/2+HBeamtf],
      [HBeamWidth/2, -HBeamHeight/2+HBeamtf],
      [HBeamWidth/2, -HBeamHeight/2],
      [-HBeamWidth/2, -HBeamHeight/2],
      [-HBeamWidth/2, -HBeamHeight/2+HBeamtf],
      [-HBeamtw/2, -HBeamHeight/2+HBeamtf],
      [-HBeamtw/2, HBeamHeight/2-HBeamtf],
      [-HBeamWidth/2, HBeamHeight/2-HBeamtf],
      [-HBeamWidth/2, HBeamHeight/2],
    ]
    ctx.beginPath();
    ctx.fillStyle = '#8CFFA5';
    ctx.fillRect(-BaseplateWidth/2000*scale, -BaseplateHeight/2000*scale, BaseplateWidth/1000*scale, BaseplateHeight/1000*scale);
    ctx.stroke();
    ctx.closePath();

    ctx.fillStyle = '#FF0000';
    ctx.beginPath();
    ctx.moveTo(HBeamvertex[0][0]/1000*scale, HBeamvertex[0][1]/1000*scale);
    for (let i=1; i<HBeamvertex.length; i++){
      ctx.lineTo(HBeamvertex[i][0]/1000*scale, HBeamvertex[i][1]/1000*scale);
    }
    ctx.stroke();
    ctx.fill();
    ctx.closePath();

    if (SectionDBName == BP_Data.BASEPLATE.COLUMN.DB){
      ctx.strokeStyle = '#FF0000';
      ctx.fillStyle = '#FF0000';
    }
    else{
      ctx.strokeStyle = '#000000';
      ctx.fillStyle = '#000000';
    }
    
    ctx.font = '10px Arial';
    
    ctx.textAlign = 'center';
    let textstring = ''
    if (planViewNodeCheck){
      textstring = textstring + nodekey
    }
    if (planViewColumnNameCheck){
      textstring = textstring + BP_Data.COLUMN_NAME
    }
    const DBSectionName = BP_Data.BASEPLATE.COLUMN.DB
    let sectionid = ''
    for(let key in selectedColumnIndex_DBName){
      if (selectedColumnIndex_DBName[key] === DBSectionName){
        sectionid = key
      }
    }
    let BPName = ''
    if (BP_Data.BASEPLATE.PLATE.NAME == undefined){
      BPName = ''
    }
    else{
      BPName = BP_Data.BASEPLATE.PLATE.NAME
    }
    
    if (planViewBPNameCheck){
      textstring = textstring + BPName
    }
    ctx.fillText(textstring, 0, -HBeamHeight/2000*scale-10);
    ctx.strokeStyle = '#000000';
  }
  const drawColumn = (ctx:any) => {
    let BPData = JSON.parse(JSON.stringify(node_BP_Data))
    ctx.translate(canvasSize / 2, canvasSize / 2);
    for (let key in BPData){
      ctx.lineWidth = 1.5
      ctx.beginPath();
      ctx.translate((node_BP_Data[key].NODECORD[0]-CenterXCord)*scale, (CenterYCord-node_BP_Data[key].NODECORD[1])*scale);
      drawHBeam(ctx, node_BP_Data[key], key)
      ctx.closePath();
      ctx.translate(-(node_BP_Data[key].NODECORD[0]-CenterXCord)*scale, -(CenterYCord-node_BP_Data[key].NODECORD[1])*scale);
      
    }
    ctx.translate(-canvasSize / 2, -canvasSize / 2);
  }

  const drawCordSystem = (ctx:any) => {
    ctx.fillStyle = "#000000"
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    
    ctx.moveTo(0.01*canvasSize, 0.99 * canvasSize);
    ctx.lineTo(0.01*canvasSize, 0.95 * canvasSize);
    ctx.moveTo(0.01*canvasSize, 0.99 * canvasSize);
    ctx.lineTo(0.05*canvasSize, 0.99 * canvasSize);
    ctx.stroke()
    
    ctx.fillStyle = '#EEEEEE';
    ctx.translate(canvasSize / 2, canvasSize / 2);
    ctx.fillRect(-(MaxXCord-MinXCord)/2*scale, -(MaxYCord-MinYCord)/2*scale, (MaxXCord-MinXCord)*scale, (MaxYCord-MinYCord)*scale);
    ctx.translate(-canvasSize / 2, -canvasSize / 2);
    ctx.stroke();
    ctx.closePath()

    ctx.font = '10px Arial';
    ctx.fillStyle = '#000000';
    ctx.textAlign = 'center';
    ctx.fillText('X', 0.06*canvasSize, 0.995*canvasSize);
    ctx.fillText('Y', 0.01*canvasSize, 0.945*canvasSize);
  }

  useEffect(() => {
    const canvas:any = canvasRef.current;
    const context = canvas.getContext('2d');

    context.clearRect(0, 0, canvas.width, canvas.height);
    drawCordSystem(context);
    drawColumn(context);
    
    let isDragging = false;
    let startPoint = { x: 0, y: 0 };
    let endPoint = { x: 0, y: 0 };
    let selectedNodes:any = [];

    // 마우스 움직일 때 동작
    const onMouseMove = (e:any) => {
      if (!isDragging) return;
      endPoint = { x: e.offsetX, y: e.offsetY };
      context.clearRect(0, 0, canvas.width, canvas.height);
      drawCordSystem(context);
      drawColumn(context);
      drawSelectionArea(context, startPoint, endPoint);
    };
    // 마우스 눌렀을 때
    const onMouseDown = (e:any) => {
      isDragging = true;
      startPoint = { x: e.offsetX, y: e.offsetY };
    };
     // 마우스 뗏을 때 동작
    const onMouseUp = (e:any) => {
      isDragging = false;
      endPoint = { x: e.offsetX, y: e.offsetY };
      context.clearRect(0, 0, canvas.width, canvas.height);
      drawCordSystem(context);
      drawColumn(context);
      selectNodesWithinArea(startPoint, endPoint);
    };
    // 선택 영역 그리기
    const drawSelectionArea = (ctx:any, startPoint:any, endPoint:any) => {
      ctx.beginPath();
      ctx.setLineDash([3]);
      ctx.strokeStyle = 'blue';
      ctx.rect(startPoint.x , startPoint.y , endPoint.x - startPoint.x, endPoint.y - startPoint.y);
      ctx.stroke();
      ctx.setLineDash([]);
    };
    // 선택된 노드 찾기
    const selectNodesWithinArea = (start:any, end:any) => {
      selectedNodes = Object.keys(node_BP_Data).filter((key) => {
        let SectionDBName = ''
        for (let key in selectedColumnIndex_DBName){
          if (key == selectedColumnIndex.toString()){
            SectionDBName = selectedColumnIndex_DBName[key]
          }
        }
        if (SectionDBName == node_BP_Data[key].BASEPLATE.COLUMN.DB){
          const nodeCord = node_BP_Data[key].NODECORD;
          const canvasNodeX = (nodeCord[0] - CenterXCord) * scale + canvasSize / 2;
          const canvasNodeY = (CenterYCord - nodeCord[1]) * scale + canvasSize / 2;
          return (
            canvasNodeX >= start.x &&
            canvasNodeX <= end.x &&
            canvasNodeY >= start.y &&
            canvasNodeY <= end.y
          );
        }
      });
      // 기존의 선택된 노드에 추가
      setPlanViewSelectedNode((prevSelectedNodes:any) => {
        // 이전 선택된 노드와 새로 선택된 노드들을 합칩니다.
        const updatedSelectedNodes = [...prevSelectedNodes, ...selectedNodes];
        // Set을 통해 중복을 제거합니다.
        const uniqueSelectedNodes = Array.from(new Set(updatedSelectedNodes));
        return uniqueSelectedNodes;
      });
    };

    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseup', onMouseUp);

    
    return () => {
      canvas.removeEventListener('mousedown', onMouseDown);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseup', onMouseUp);
    };
  }, [node_BP_Data, selectedColumnIndex, planViewNodeCheck, planViewColumnNameCheck, planViewBPNameCheck])

return (
  <div>
    <canvas ref={canvasRef} width={canvasSize} height={canvasSize} />
  </div>
);
}

export default PlanViewDrawing;