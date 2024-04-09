import {GuideBox, ChartLine, Typography} from '@midasit-dev/moaui';
import React, { useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { BasePlateWidth, BasePlateHeight, HBeamVertices, PedestalCheck, PedestalHeight, PedestalWidth, Node_BP_Data } from '../variables';
const PlanViewDrawing = ({
  panelSize = 500,
  MinMaxCord = [1,1,1,1]
}:any) => {

  const MaxXCord = MinMaxCord[2]
  const MaxYCord = MinMaxCord[3]
  const canvasRef = useRef(null);
  const canvasSize = panelSize-20;

  // Scale 지정
  let scale = 0
  scale = canvasSize / Math.max(MaxXCord, MaxYCord);

  // Outline Drawing

  const drawOutline = (ctx:any) => {
    
  }

  const drawCordSystem = (ctx:any) => {
    ctx.fillStyle = "#000000"
    ctx.lineWidth = 0.5;
    
    ctx.moveTo(0.01*canvasSize, 0.99 * canvasSize);
    ctx.lineTo(0.01*canvasSize, 0.95 * canvasSize);
    ctx.moveTo(0.01*canvasSize, 0.99 * canvasSize);
    ctx.lineTo(0.05*canvasSize, 0.99 * canvasSize);
    console.log('stroke')
    ctx.stroke()
    console.log('MaxXCord', MaxXCord, 'MaxYCord', MaxYCord)
    ctx.fillStyle = '#F5F9FF';
    ctx.translate(canvasSize / 2, canvasSize / 2);
    ctx.fillRect(-MaxXCord/2*scale, -MaxYCord/2*scale, MaxXCord*scale, MaxYCord*scale);
    ctx.stroke();
    ctx.translate(-canvasSize / 2, -canvasSize / 2);
  }
  useEffect(() => {
    const canvas:any = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawCordSystem(context);
  }, [])

return (
  <div>
    <canvas ref={canvasRef} width={canvasSize} height={canvasSize} />
  </div>
);
}

export default PlanViewDrawing;