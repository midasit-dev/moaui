import {GuideBox, ChartLine, Typography} from '@midasit-dev/moaui';
import React, { useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { BasePlateWidth, BasePlateHeight, HBeamVertices
,HBeamB, HBeamH, HBeamtf, HBeamtw, SelectedColumnIndex, ColumnData, AnchorDiameter, AnchorXPitch, AnchorYPitch  } from '../variables';
const SectionDrawing = ({
  panelSize = 200,

}:any) => {

  interface Details {
    SectionID: number;
    DBName: string;
  }

  const basePlateWidth = Number(useRecoilValue(BasePlateWidth));
  const basePlateHeight = Number(useRecoilValue(BasePlateHeight));
  const anchorDiameter = Number(useRecoilValue(AnchorDiameter));
  const anchorXPitch = Number(useRecoilValue(AnchorXPitch));
  const anchorYPitch = Number(useRecoilValue(AnchorYPitch));
  const hBeamVertices = useRecoilValue(HBeamVertices);
  const selectedColumnIndex = useRecoilValue(SelectedColumnIndex);
  const columnData:Record<string, Details> = useRecoilValue(ColumnData);
  const canvasRef = useRef(null);
  const canvasSize = panelSize-20;
  
  //픽셀 scale
  let scale = 0
  let TopDimLine = 0
  let LeftDimLine = 0

  scale = canvasSize*(2/3) / Math.max(basePlateWidth, basePlateHeight, 500);
  TopDimLine = Math.max(basePlateHeight,500)/2*scale
  LeftDimLine = Math.max(basePlateWidth, 500)/2*scale
  
  
  
  // 좌표계 변환 함수
  const tfc = (y:number) => {
    const transformedy = - y
    return transformedy
  }
  //Anchor Drawing
  const drawAnchor = (ctx:any) => {
    const dimOffset = 5
    const dimTickSize = 2
    ctx.translate(canvasSize / 2, canvasSize / 2)
    if (selectedColumnIndex == 0){

    }
    else{
      ctx.beginPath();
      ctx.arc((basePlateWidth/2-anchorXPitch)*scale, (basePlateHeight/2-anchorYPitch)*scale, anchorDiameter/2*scale, 0, 2*Math.PI);
      ctx.stroke();
      ctx.closePath()
      
      ctx.beginPath();
      ctx.arc((basePlateWidth/2-anchorXPitch)*scale, (-basePlateHeight/2+anchorYPitch)*scale, anchorDiameter/2*scale, 0, 2*Math.PI);
      ctx.stroke();
      ctx.closePath();

      ctx.beginPath();
      ctx.arc((-basePlateWidth/2+anchorXPitch)*scale, (basePlateHeight/2-anchorYPitch)*scale, anchorDiameter/2*scale, 0, 2*Math.PI);
      ctx.stroke();
      ctx.closePath();

      ctx.beginPath();
      ctx.arc((-basePlateWidth/2+anchorXPitch)*scale, (-basePlateHeight/2+anchorYPitch)*scale, anchorDiameter/2*scale, 0, 2*Math.PI);
      ctx.stroke();
      ctx.closePath();

      //하부 치수선
      ctx.beginPath();
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 0.5;
      ctx.moveTo(LeftDimLine, tfc(-TopDimLine - dimOffset));
      ctx.lineTo((basePlateWidth/2-anchorXPitch)*scale, tfc(-TopDimLine - dimOffset));
      ctx.moveTo(LeftDimLine, tfc(-TopDimLine - dimOffset+dimTickSize));
      ctx.lineTo(LeftDimLine, tfc(-TopDimLine - dimOffset-dimTickSize));
      ctx.moveTo((basePlateWidth/2-anchorXPitch)*scale, tfc(-TopDimLine - dimOffset+dimTickSize));
      ctx.lineTo((basePlateWidth/2-anchorXPitch)*scale, tfc(-TopDimLine - dimOffset-dimTickSize));
      ctx.fillStyle = 'black';
      ctx.font = '10px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(anchorXPitch.toString(), (basePlateWidth/2-anchorXPitch/2)*scale, tfc(-TopDimLine - dimOffset -15))
      ctx.stroke();

      //우측 치수선
      ctx.beginPath();
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 0.5;
      ctx.moveTo(LeftDimLine + dimOffset, tfc(-TopDimLine));
      ctx.lineTo(LeftDimLine + dimOffset, tfc(-basePlateHeight/2+anchorYPitch)*scale);
      ctx.moveTo(LeftDimLine + dimOffset+dimTickSize, tfc(-TopDimLine));
      ctx.lineTo(LeftDimLine + dimOffset-dimTickSize, tfc(-TopDimLine));
      ctx.moveTo(LeftDimLine + dimOffset+dimTickSize, tfc(-basePlateHeight/2+anchorYPitch)*scale);
      ctx.lineTo(LeftDimLine + dimOffset-dimTickSize, tfc(-basePlateHeight/2+anchorYPitch)*scale);
      ctx.fillStyle = 'black';
      ctx.font = '10px Arial';
      ctx.textAlign = 'center';
      ctx.rotate(-Math.PI/2);
      ctx.fillText(anchorYPitch.toString(), -(basePlateHeight/2-anchorYPitch/2)*scale, LeftDimLine + dimOffset + 15)
      ctx.rotate(Math.PI/2);
      ctx.stroke()
      ctx.closePath()
    }
    ctx.translate(-canvasSize / 2, -canvasSize / 2)
  }
  //Base Plate Drawing
  const drawBasePlate = (ctx:any) => {
    
    ctx.fillStyle = '#E8F1FF';

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
    let SectionDB = ''
    let HBeamHeight = 0
    let HBeamWidth = 0
    let HBeamtw = 0
    let HBeamtf = 0
    if (selectedColumnIndex == 0){

    }
    else{
      for (const [sectionName, details] of Object.entries(columnData)){
        if (details.SectionID === selectedColumnIndex){
          SectionDB = details.DBName
        }
      }
      HBeamHeight = Number(SectionDB.split(' ')[1].split('x')[0])
      HBeamWidth = Number(SectionDB.split(' ')[1].split('x')[1])
      HBeamtw = Number(SectionDB.split(' ')[1].split('x')[2].split('/')[0])
      HBeamtf = Number(SectionDB.split(' ')[1].split('x')[2].split('/')[1])
    }
    
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

    ctx.translate(canvasSize / 2, canvasSize / 2)
    ctx.beginPath();
    ctx.moveTo(HBeamvertex[0][0]*scale, HBeamvertex[0][1]*scale);
    for (let i=1; i<HBeamvertex.length; i++){
      ctx.lineTo(HBeamvertex[i][0]*scale, HBeamvertex[i][1]*scale);
    }
    ctx.stroke();
    ctx.fillStyle = '#000000';
    ctx.fill();
    ctx.closePath();
    
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
    ctx.closePath();
    ctx.translate(-canvasSize / 2, -canvasSize / 2);
  }

  useEffect(() => {
    const canvas:any = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    drawBasePlate(context)
    drawHBeam(context)
    drawAnchor(context)
  }, [basePlateWidth, basePlateHeight, hBeamVertices, SelectedColumnIndex, anchorDiameter, anchorXPitch, anchorYPitch ]);

return (
  <div>
    <canvas ref={canvasRef} width={canvasSize} height={canvasSize} />
  </div>
);
}

export default SectionDrawing;