import {GuideBox, ChartLine, Typography} from '@midasit-dev/moaui';
import React, { useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { BasePlateWidth, BasePlateHeight, HBeamVertices, PedestalCheck, PedestalHeight, PedestalWidth } from '../variables';
const SectionDrawing = ({
  panelSize = 200,

}:any) => {
  const basePlateWidth = useRecoilValue(BasePlateWidth);
  const basePlateHeight = useRecoilValue(BasePlateHeight);
  const hBeamVertices = useRecoilValue(HBeamVertices);
  const pedestalCheck = useRecoilValue(PedestalCheck);
  const pedestalHeight = useRecoilValue(PedestalHeight);
  const pedestalWidth = useRecoilValue(PedestalWidth);

  const canvasRef = useRef(null);
  const canvasSize = panelSize-20;
  
  //픽셀 scale
  let scale = 0
  let TopDimLine = 0
  let LeftDimLine = 0
  if (pedestalCheck === true){
    scale = canvasSize*(2/3) / Math.max(basePlateWidth, basePlateHeight, pedestalWidth, pedestalHeight);
    TopDimLine = Math.max(basePlateHeight, pedestalHeight)/2*scale
    LeftDimLine = Math.max(basePlateWidth, pedestalWidth)/2*scale
  }
  else{
    scale = canvasSize*(2/3) / Math.max(basePlateWidth, basePlateHeight);
    TopDimLine = basePlateHeight/2*scale
    LeftDimLine = basePlateWidth/2*scale
  }
  
  
  // 좌표계 변환 함수
  const tfc = (y:number) => {
    const transformedy = - y
    return transformedy
  }

  //Pedestal Drawing
  const drawPedestal = (ctx:any) => {
    ctx.fillStyle = '#F5F9FF';
    ctx.translate(canvasSize / 2, canvasSize / 2);
    ctx.fillRect(-pedestalWidth/2*scale, -pedestalHeight/2*scale, pedestalWidth*scale, pedestalHeight*scale);
    
    //상부 치수선
    ctx.beginPath();
    const dimOffset = 35
    const dimTickSize = 2
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 0.5;
    ctx.moveTo(-LeftDimLine, tfc(TopDimLine + dimOffset));
    ctx.lineTo(LeftDimLine, tfc(TopDimLine + dimOffset));
    ctx.moveTo(-LeftDimLine, tfc(TopDimLine + dimOffset+dimTickSize));
    ctx.lineTo(-LeftDimLine, tfc(TopDimLine + dimOffset-dimTickSize));
    ctx.moveTo(LeftDimLine, tfc(TopDimLine + dimOffset+dimTickSize));
    ctx.lineTo(LeftDimLine, tfc(TopDimLine + dimOffset-dimTickSize));
    ctx.stroke();

    ctx.fillStyle = 'black';
    ctx.font = '10px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(pedestalWidth.toString(), 0, tfc(TopDimLine + dimOffset + 3))
    ctx.closePath();
    
    ctx.translate(-canvasSize / 2, -canvasSize / 2)
  }
  //Base Plate Drawing
  const drawBasePlate = (ctx:any) => {
    
    ctx.fillStyle = '#D0E3FF';

    //좌표계 원점을 캔버스 중앙으로 이동
    ctx.translate(canvasSize / 2, canvasSize / 2);
    ctx.fillRect(-basePlateWidth/2*scale, -basePlateHeight/2*scale, basePlateWidth*scale, basePlateHeight*scale);

    //상부 치수선
    ctx.beginPath();
    const dimOffset = 20
    const dimTickSize = 2
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 0.5;
    ctx.moveTo(-LeftDimLine, tfc(TopDimLine + dimOffset));
    ctx.lineTo(LeftDimLine, tfc(TopDimLine + dimOffset));
    ctx.moveTo(-LeftDimLine, tfc(TopDimLine + dimOffset+dimTickSize));
    ctx.lineTo(-LeftDimLine, tfc(TopDimLine + dimOffset-dimTickSize));
    ctx.moveTo(LeftDimLine, tfc(TopDimLine + dimOffset+dimTickSize));
    ctx.lineTo(LeftDimLine, tfc(TopDimLine + dimOffset-dimTickSize));
    ctx.stroke();
    ctx.fillStyle = 'black';
    ctx.font = '10px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(basePlateWidth.toString(), 0, tfc(TopDimLine + dimOffset + 3))
    ctx.closePath();

    //좌측 치수선
    ctx.beginPath();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 0.5;
    ctx.moveTo(-LeftDimLine - dimOffset, tfc(TopDimLine));
    ctx.lineTo(-LeftDimLine - dimOffset, tfc(-TopDimLine));
    ctx.moveTo(-LeftDimLine - dimOffset+dimTickSize, tfc(TopDimLine));
    ctx.lineTo(-LeftDimLine - dimOffset-dimTickSize, tfc(TopDimLine));
    ctx.moveTo(-LeftDimLine - dimOffset+dimTickSize, tfc(-TopDimLine));
    ctx.lineTo(-LeftDimLine - dimOffset-dimTickSize, tfc(-TopDimLine));
    ctx.stroke();
    ctx.fillStyle = 'black';
    ctx.font = '10px Arial';
    ctx.textAlign = 'center';
    ctx.rotate(-Math.PI/2);
    ctx.fillText(basePlateHeight.toString(), 0, -LeftDimLine - dimOffset - 3)
    ctx.rotate(Math.PI/2);
    ctx.closePath();
    ctx.translate(-canvasSize / 2, -canvasSize / 2)
  };

  //H Beam Drawing
  const drawHBeam = (ctx:any) => {
    
    const dimOffset = 5
    const dimTickSize = 2
    // H Beam Vertex 를 돌며 선을 그림
    ctx.translate(canvasSize / 2, canvasSize / 2)
    ctx.beginPath();
    ctx.moveTo((hBeamVertices.vertices[0].x)*scale, tfc((hBeamVertices.vertices[0].y)*scale));
    ctx.lineTo(hBeamVertices.vertices[1].x*scale, tfc(hBeamVertices.vertices[1].y*scale));
    ctx.lineTo(hBeamVertices.vertices[2].x*scale, tfc(hBeamVertices.vertices[2].y*scale));
    ctx.lineTo(hBeamVertices.vertices[3].x*scale, tfc(hBeamVertices.vertices[3].y*scale));
    ctx.arc(hBeamVertices.vertices[3].x*scale, tfc(hBeamVertices.vertices[4].y*scale), hBeamVertices.vertices[3].y*scale-hBeamVertices.vertices[4].y*scale, -Math.PI/2, -Math.PI, true);
    ctx.lineTo(hBeamVertices.vertices[5].x*scale, tfc(hBeamVertices.vertices[5].y*scale));
    ctx.arc(hBeamVertices.vertices[6].x*scale, tfc(hBeamVertices.vertices[5].y*scale), hBeamVertices.vertices[5].y*scale-hBeamVertices.vertices[6].y*scale, Math.PI, Math.PI/2, true);
    ctx.lineTo(hBeamVertices.vertices[7].x*scale, tfc(hBeamVertices.vertices[7].y*scale));
    ctx.lineTo(hBeamVertices.vertices[8].x*scale, tfc(hBeamVertices.vertices[8].y*scale));
    ctx.lineTo(hBeamVertices.vertices[9].x*scale, tfc(hBeamVertices.vertices[9].y*scale));
    ctx.lineTo(hBeamVertices.vertices[10].x*scale, tfc(hBeamVertices.vertices[10].y*scale));
    ctx.lineTo(hBeamVertices.vertices[11].x*scale, tfc(hBeamVertices.vertices[11].y*scale));
    ctx.arc(hBeamVertices.vertices[11].x*scale, tfc(hBeamVertices.vertices[12].y*scale), hBeamVertices.vertices[12].y*scale-hBeamVertices.vertices[11].y*scale, -Math.PI*3/2, -Math.PI*2, true)
    ctx.lineTo(hBeamVertices.vertices[13].x*scale, tfc(hBeamVertices.vertices[13].y*scale));
    ctx.arc(hBeamVertices.vertices[14].x*scale, tfc(hBeamVertices.vertices[13].y*scale), hBeamVertices.vertices[14].y*scale-hBeamVertices.vertices[13].y*scale, 0, -Math.PI/2, true)
    ctx.lineTo(hBeamVertices.vertices[15].x*scale, tfc(hBeamVertices.vertices[15].y*scale));
    ctx.closePath();
    ctx.fillStyle = '#0064FF';
    ctx.fill();
    
    //상부 치수선
    ctx.moveTo(hBeamVertices.vertices[0].x*scale, tfc(TopDimLine + dimOffset));
    ctx.lineTo(hBeamVertices.vertices[1].x*scale, tfc(TopDimLine + dimOffset));
    ctx.moveTo(hBeamVertices.vertices[0].x*scale, tfc(TopDimLine + dimOffset+dimTickSize));
    ctx.lineTo(hBeamVertices.vertices[0].x*scale, tfc(TopDimLine + dimOffset-dimTickSize));
    ctx.moveTo(hBeamVertices.vertices[1].x*scale, tfc(TopDimLine + dimOffset+dimTickSize));
    ctx.lineTo(hBeamVertices.vertices[1].x*scale, tfc(TopDimLine + dimOffset-dimTickSize));
    ctx.fillStyle = 'black';
    ctx.font = '10px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(hBeamVertices.vertices[1].x-hBeamVertices.vertices[0].x, (hBeamVertices.vertices[0].x+hBeamVertices.vertices[1].x)/2*scale, tfc(TopDimLine + dimOffset + 3))

    //좌측 치수선
    ctx.moveTo(-LeftDimLine - dimOffset, tfc(hBeamVertices.vertices[0].y*scale));
    ctx.lineTo(-LeftDimLine - dimOffset, tfc(hBeamVertices.vertices[8].y*scale));
    ctx.moveTo(-LeftDimLine - dimOffset+dimTickSize, tfc(hBeamVertices.vertices[0].y*scale));
    ctx.lineTo(-LeftDimLine - dimOffset-dimTickSize, tfc(hBeamVertices.vertices[0].y*scale));
    ctx.moveTo(-LeftDimLine - dimOffset+dimTickSize, tfc(hBeamVertices.vertices[8].y*scale));
    ctx.lineTo(-LeftDimLine - dimOffset-dimTickSize, tfc(hBeamVertices.vertices[8].y*scale));
    ctx.fillStyle = 'black';
    ctx.font = '10px Arial';
    ctx.textAlign = 'center';
    ctx.rotate(-Math.PI/2);
    ctx.fillText(hBeamVertices.vertices[0].y-hBeamVertices.vertices[8].y, 0, -LeftDimLine - dimOffset - 3)
    ctx.rotate(Math.PI/2);
    
    ctx.stroke();
    ctx.translate(-canvasSize / 2, -canvasSize / 2);
  }

  useEffect(() => {
    const canvas:any = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    if (pedestalCheck === true){
      drawPedestal(context)
    }
    drawBasePlate(context)
    drawHBeam(context)
  }, [basePlateWidth, basePlateHeight, hBeamVertices, pedestalCheck]);

return (
  <div>
    <canvas ref={canvasRef} width={canvasSize} height={canvasSize} />
  </div>
);
}

export default SectionDrawing;