import {GuideBox, ChartLine, Typography} from '@midasit-dev/moaui';
import React, { useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Node_BP_Data, SelectedColumnIndex, SelectedColumnIndex_DBName } from '../variables';
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


  // Scale 지정
  let scale = 0
  scale = canvasSize * 0.95 / Math.max(MaxXCord-MinXCord, MaxYCord-MinYCord);

  const drawHBeam = (ctx:any, BP_Data:any) => {
    let SectionDBName = ''
    for (let key in selectedColumnIndex_DBName){
      if (key == selectedColumnIndex.toString()){
        SectionDBName = selectedColumnIndex_DBName[key]
      }
    }
    if (SectionDBName == BP_Data.BASEPLATE.COLUMN.DB){
      console.log('Selected Column', BP_Data.BASEPLATE.COLUMN.DB)
      ctx.strokeStyle = '#FF0000';
    }
    else{
      ctx.strokeStyle = '#000000';
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
    ctx.fillStyle = '#F7FF9E';
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

    ctx.strokeStyle = '#000000';
  }
  const drawColumn = (ctx:any) => {
    let BPData = JSON.parse(JSON.stringify(node_BP_Data))
    ctx.translate(canvasSize / 2, canvasSize / 2);
    for (let key in BPData){
      ctx.lineWidth = 1.5
      ctx.beginPath();
      ctx.translate((node_BP_Data[key].NODECORD[0]-CenterXCord)*scale, (CenterYCord-node_BP_Data[key].NODECORD[1])*scale);
      drawHBeam(ctx, node_BP_Data[key])
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
    drawColumn(context)

    
  }, [node_BP_Data, selectedColumnIndex])

return (
  <div>
    <canvas ref={canvasRef} width={canvasSize} height={canvasSize} />
  </div>
);
}

export default PlanViewDrawing;