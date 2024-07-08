import React, { useEffect, useRef, useState } from 'react';
import { FoundationWidth, SideLength, PileDataSelector, PileTableData } from '../variables';
import { useRecoilValue } from 'recoil';
import { CalculateProperties, CalculatePileCenterCoordinates, ExtractNumbers } from '../../utils_pyscript';
const FronView = () => {
  const canvasRef = useRef(null);

  const canvasSize = 350;
  
  const width = Number(useRecoilValue(SideLength))
  const height = Number(useRecoilValue(FoundationWidth))
  const InputPileData = useRecoilValue(PileDataSelector)
  const pileTableData = useRecoilValue(PileTableData)

  const InputPileLength = InputPileData['pileLength']
  const InputDegrees = ExtractNumbers(InputPileData['majorDegree'])
  let TableMaxPileLength = 0
  let YEndCoordinate = 0

  pileTableData.map((row: any) => {
    TableMaxPileLength = Math.max(TableMaxPileLength, row.pileLength)
  })

  const MaxPileLength = Math.max(InputPileLength, TableMaxPileLength)
  const YAmplifyRatio = (canvasSize*0.8)/(MaxPileLength+width*0.1)
  console.log('YAmplifyRatio', YAmplifyRatio)

  const drawAxis = (axis:any) => {
    axis.clearRect(0, 0, axis.canvas.width, axis.canvas.height);
    const headlen = 6; // 화살표 머리 부분의 길이입니다.
    // X축 (우에서 좌로)
    axis.beginPath();
    axis.strokeStyle = "#BFBFBF"; // 외곽선 색상 설정
    axis.lineWidth=1.5
    axis.setLineDash([5, 2]);
    axis.moveTo(canvasSize*0.6, canvasSize*0.04);
    axis.lineTo(canvasSize*0.4, canvasSize*0.04);
    //y축 (상에서 하로)
    axis.moveTo(canvasSize*0.96, canvasSize*0.4);
    axis.lineTo(canvasSize*0.96, canvasSize*0.6);

    axis.font = '10px Arial';
    axis.textAlign = 'center';
    axis.textBaseline = 'middle';
    
    // X축 화살표
    axis.moveTo(canvasSize*0.4, canvasSize*0.04);
    axis.lineTo(canvasSize*0.4 + headlen * Math.cos(-Math.PI / 6), canvasSize*0.04 + headlen * Math.sin( - Math.PI / 6));
    axis.moveTo(canvasSize*0.4, canvasSize*0.04);
    axis.lineTo(canvasSize*0.4 + headlen * Math.cos(Math.PI / 6), canvasSize*0.04 + headlen * Math.sin(Math.PI / 6))

    // Y축 화살표
    axis.moveTo(canvasSize*0.96, canvasSize*0.6);
    axis.lineTo(canvasSize*0.96 + headlen * Math.cos(-Math.PI / 3), canvasSize*0.6 - headlen * Math.sin(Math.PI / 3));
    axis.moveTo(canvasSize*0.96, canvasSize*0.6);
    axis.lineTo(canvasSize*0.96 - headlen * Math.cos(Math.PI / 3), canvasSize*0.6 - headlen * Math.sin(Math.PI / 3))
    axis.fillText('재하방향', canvasSize*0.5, canvasSize*0.03)
    axis.save();
    axis.translate(canvasSize*0.97, canvasSize*0.5);
    axis.rotate(Math.PI / 2);
    axis.fillText('수직방향', 0,0)
    axis.restore();
    axis.stroke();
    axis.closePath();
  }


  const drawInputs = (ctx:any) => {
    ctx.strokeStyle = "#FF0000"; // 외곽선 색상 설정
    ctx.lineWidth = 2;
    const PileProperty = CalculateProperties(InputPileData, 'top', 'reinforced')
    const Diameter = Number(PileProperty[3])*YAmplifyRatio
    const pilecoordinate = CalculatePileCenterCoordinates(InputPileData, height, width)
    const orginX = canvasSize/2 + width/2*YAmplifyRatio
    for (let i = 0; i < pilecoordinate.length; i++) {
      // 윗면
      ctx.beginPath();
      ctx.moveTo(orginX - pilecoordinate[i][0]*YAmplifyRatio-Diameter/2, canvasSize*0.1+YEndCoordinate);
      ctx.lineTo(orginX - pilecoordinate[i][0]*YAmplifyRatio+Diameter/2, canvasSize*0.1+YEndCoordinate);
      // 우측면
      ctx.moveTo(orginX - pilecoordinate[i][0]*YAmplifyRatio+Diameter/2, canvasSize*0.1+YEndCoordinate);
      ctx.lineTo(orginX - pilecoordinate[i][0]*YAmplifyRatio+Diameter/2+Math.tan(Math.PI/180*(InputDegrees[i]))*InputPileData['pileLength']*YAmplifyRatio, canvasSize*0.1+YEndCoordinate+InputPileData['pileLength']*YAmplifyRatio);
      console.log(orginX)
      console.log(pilecoordinate[i][0]*YAmplifyRatio)

      console.log(Math.tan(Math.PI/180*(InputDegrees[i]))*InputPileData['pileLength']*YAmplifyRatio)
      
      // 아랫면
      ctx.moveTo(orginX - pilecoordinate[i][0]*YAmplifyRatio+Diameter/2+Math.tan(Math.PI/180*(InputDegrees[i]))*InputPileData['pileLength']*YAmplifyRatio, canvasSize*0.1+YEndCoordinate+InputPileData['pileLength']*YAmplifyRatio);
      ctx.lineTo(orginX - pilecoordinate[i][0]*YAmplifyRatio-Diameter/2+Math.tan(Math.PI/180*(InputDegrees[i]))*InputPileData['pileLength']*YAmplifyRatio, canvasSize*0.1+YEndCoordinate+InputPileData['pileLength']*YAmplifyRatio);
      // 좌측면
      ctx.moveTo(orginX - pilecoordinate[i][0]*YAmplifyRatio-Diameter/2+Math.tan(Math.PI/180*(InputDegrees[i]))*InputPileData['pileLength']*YAmplifyRatio, canvasSize*0.1+YEndCoordinate+InputPileData['pileLength']*YAmplifyRatio);
      ctx.lineTo(orginX - pilecoordinate[i][0]*YAmplifyRatio-Diameter/2, canvasSize*0.1+YEndCoordinate)
      ctx.stroke();
      ctx.closePath();      
    }
    //치수선
    ctx.beginPath();
    ctx.setLineDash([5, 3]);
    ctx.lineWidth = 0.5;
    ctx.moveTo(canvasSize*0.9, canvasSize*0.1+YEndCoordinate);
    ctx.lineTo(canvasSize*0.9, canvasSize*0.9)
    ctx.stroke()
    ctx.fillText(`${InputPileData['pileLength']*1000}`, canvasSize*0.9, canvasSize*0.1+YEndCoordinate+InputPileData['pileLength']*YAmplifyRatio/2)
    ctx.closePath();
  };

  const drawTables = (ctx:any) => {
    ctx.strokeSyle = "#000000";
    ctx.lineWidth = 1;

    for (let i = 0; i < pileTableData.length; i++) {
      const PileProperty = CalculateProperties(pileTableData[i], 'top', 'reinforced')
      const Diameter = Number(PileProperty[3])*YAmplifyRatio
      const pilecoordinate = CalculatePileCenterCoordinates(pileTableData[i], height, width)
      const orginX = canvasSize/2 + width/2*YAmplifyRatio
      for (let j = 0; j < pilecoordinate.length; j++) {
        // 윗면
        ctx.beginPath();
        ctx.moveTo(orginX - pilecoordinate[j][0]*YAmplifyRatio-Diameter/2, canvasSize*0.1+YEndCoordinate);
        ctx.lineTo(orginX - pilecoordinate[j][0]*YAmplifyRatio+Diameter/2, canvasSize*0.1+YEndCoordinate);
        // 우측면
        ctx.moveTo(orginX - pilecoordinate[j][0]*YAmplifyRatio+Diameter/2, canvasSize*0.1+YEndCoordinate);
        ctx.lineTo(orginX - pilecoordinate[j][0]*YAmplifyRatio+Diameter/2+Math.tan(Math.PI/180*(ExtractNumbers(pileTableData[i]['majorDegree'])[j]))*pileTableData[i]['pileLength']*YAmplifyRatio, canvasSize*0.1+YEndCoordinate+pileTableData[i]['pileLength']*YAmplifyRatio);
        // 아랫면
        ctx.moveTo(orginX - pilecoordinate[j][0]*YAmplifyRatio+Diameter/2+Math.tan(Math.PI/180*(ExtractNumbers(pileTableData[i]['majorDegree'])[j]))*pileTableData[i]['pileLength']*YAmplifyRatio, canvasSize*0.1+YEndCoordinate+pileTableData[i]['pileLength']*YAmplifyRatio);
        ctx.lineTo(orginX - pilecoordinate[j][0]*YAmplifyRatio-Diameter/2+Math.tan(Math.PI/180*(ExtractNumbers(pileTableData[i]['majorDegree'])[j]))*pileTableData[i]['pileLength']*YAmplifyRatio, canvasSize*0.1+YEndCoordinate+pileTableData[i]['pileLength']*YAmplifyRatio);
        // 좌측면
        ctx.moveTo(orginX - pilecoordinate[j][0]*YAmplifyRatio-Diameter/2+Math.tan(Math.PI/180*(ExtractNumbers(pileTableData[i]['majorDegree'])[j]))*pileTableData[i]['pileLength']*YAmplifyRatio, canvasSize*0.1+YEndCoordinate+pileTableData[i]['pileLength']*YAmplifyRatio);
        ctx.lineTo(orginX - pilecoordinate[j][0]*YAmplifyRatio-Diameter/2, canvasSize*0.1+YEndCoordinate)
        ctx.stroke();
        ctx.closePath();

      }
    }
  }
  
  const drawOutlines = (ctx:any) => {
    ctx.setLineDash([0, 0]);
    ctx.strokeStyle = "#000000"; // 외곽선 색상 설정
    ctx.lineWidth = 1;
    const newWidth = width*YAmplifyRatio

    const x = (canvasSize - newWidth) / 2;
    const y = canvasSize*0.1
    ctx.beginPath();
    YEndCoordinate = newWidth*0.1
    ctx.strokeRect(x, y, newWidth, YEndCoordinate); // 외곽선 그리기
    
    // 기초 치수선 그리기
    ctx.lineWidth = 0.5;
    const dimOffset = 5;
    const dimTickSize = 2;
    // X 축
    ctx.beginPath();
    ctx.moveTo(x, y - dimOffset);
    ctx.lineTo(x + newWidth, y - dimOffset);
    ctx.moveTo(x, y - dimOffset - dimTickSize);
    ctx.lineTo(x, y - dimOffset + dimTickSize);
    ctx.moveTo(x + newWidth, y - dimOffset - dimTickSize);
    ctx.lineTo(x + newWidth, y - dimOffset + dimTickSize);
    ctx.stroke();
    

    // 치수선 글씨 스타일 설정
    ctx.font = '10px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // 가로 치수선 글씨 (텍스트와 치수선 사이에 약간의 여백 주기 위해 offsetY 사용)
    const offsetY = 5
    ctx.fillText(`${width*1000}`, x + newWidth / 2, y - dimOffset - offsetY);
  };

  useEffect(() => {
    const canvas:any = canvasRef.current;
    const context = canvas.getContext('2d');
    drawAxis(context);
    drawOutlines(context);
    drawTables(context);
    // 원들을 그리는 함수를 호출합니다.
    const circleCenters = [[100, 100], [150, 100]]; // 원의 중심 좌표 배열입니다.
    const circleRadius = 30; // 원의 반지름입니다.
    //drawTables(context);
    drawInputs(context);
  }, [width, height, InputPileData]);

  return (
    <div>
      <canvas ref={canvasRef} width={canvasSize} height={canvasSize} />
    </div>
  );
};

export default FronView;