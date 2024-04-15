import React, { useEffect, useRef, useState } from 'react';
import { FoundationWidth, SideLength, PileDataSelector, PileTableData } from '../variables';
import { useRecoilValue } from 'recoil';
import { CalculateProperties, CalculatePileCenterCoordinates, ExtractNumbers } from '../../utils_pyscript';
const PlanView = () => {
  const canvasRef = useRef(null);

  const canvasSize = 350;
  
  const width = Number(useRecoilValue(SideLength))
  const height = Number(useRecoilValue(FoundationWidth))

  const MaxSize = Math.max(width, height)
  const AmplifyRatio = (canvasSize*0.8)/MaxSize

  const InputPileData = useRecoilValue(PileDataSelector)
  const pileTableData = useRecoilValue(PileTableData)

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

    // X축 화살표
    axis.moveTo(canvasSize*0.4, canvasSize*0.04);
    axis.lineTo(canvasSize*0.4 + headlen * Math.cos(-Math.PI / 6), canvasSize*0.04 + headlen * Math.sin( - Math.PI / 6));
    axis.moveTo(canvasSize*0.4, canvasSize*0.04);
    axis.lineTo(canvasSize*0.4 + headlen * Math.cos(Math.PI / 6), canvasSize*0.04 + headlen * Math.sin(Math.PI / 6))
    axis.font = '10px Arial';
    axis.textAlign = 'center';
    axis.textBaseline = 'middle';
    // Y축 화살표
    axis.moveTo(canvasSize*0.96, canvasSize*0.6);
    axis.lineTo(canvasSize*0.96 + headlen * Math.cos(-Math.PI / 3), canvasSize*0.6 - headlen * Math.sin(Math.PI / 3));
    axis.moveTo(canvasSize*0.96, canvasSize*0.6);
    axis.lineTo(canvasSize*0.96 - headlen * Math.cos(Math.PI / 3), canvasSize*0.6 - headlen * Math.sin(Math.PI / 3))
    axis.fillText('재하방향', canvasSize*0.5, canvasSize*0.03)
    axis.save();
    axis.translate(canvasSize*0.97, canvasSize*0.5);
    axis.rotate(Math.PI / 2);
    axis.fillText('재하직각방향', 0,0)
    axis.restore();
    axis.stroke();
    axis.closePath();
  }


  const drawInputs = (ctx:any) => {
    ctx.strokeStyle = "#FF0000"; // 외곽선 색상 설정
    ctx.lineWidth = 2;
    const PileProperty = CalculateProperties(InputPileData, 'top', 'reinforced')
    const Diameter = Number(PileProperty[3])*AmplifyRatio
    const pilecoordinate = CalculatePileCenterCoordinates(InputPileData, height, width)
    const orginX = canvasSize/2 + width/2*AmplifyRatio
    const orginY = canvasSize/2 - height/2*AmplifyRatio
    
    // 첫번째 말뚝 중심 좌표
    const pileStartX = orginX-Number(pilecoordinate[0][0]*AmplifyRatio)
    const pileStartY = orginY+Number(pilecoordinate[0][1]*AmplifyRatio)
    
    // 참조 위치 좌표
    // 참조 위치가 우측
    let RefX = 0
    let RefY = 0
    if (InputPileData['majorRefValue'] == 1){
      RefX = canvasSize*0.5 + width/2*AmplifyRatio
    }
    // 참조 위치가 좌측
    else{
      RefX = canvasSize*0.5 - width/2*AmplifyRatio
    }
    // 참조 위치가 상단
    if (InputPileData['minorRefValue'] == 1){
      RefY = canvasSize*0.5 - height/2*AmplifyRatio
    }
    // 참조 위치가 하단
    else{
      RefY = canvasSize*0.5 + height/2*AmplifyRatio
    }
    
    // 말뚝 시작 중심 위치
    ctx.setLineDash([5, 4]);
    ctx.lineWidth = 0.5
    ctx.beginPath();
    ctx.moveTo(pileStartX, pileStartY); // 말뚝 중심 위치
    ctx.lineTo(RefX, pileStartY); 
    ctx.fillText(`${InputPileData['majorStartPoint']*1000}`, (pileStartX+RefX)/2, pileStartY-10) 
    ctx.moveTo(pileStartX, pileStartY);
    ctx.lineTo(pileStartX, RefY); 
    ctx.stroke(); 
    ctx.fillText(`${InputPileData['minorStartPoint']*1000}`, pileStartX-10, (pileStartY+RefY)/2) 
    ctx.closePath();
    // 말뚝 간격 표시
    const MajorSpace = ExtractNumbers(InputPileData['majorSpace'])
    if (MajorSpace.length > 0){
      for (let i = 0; i < MajorSpace.length; i++){
        const StartX = orginX-Number(pilecoordinate[i][0]*AmplifyRatio)
        const StartY = orginY+Number(pilecoordinate[i][1]*AmplifyRatio)
        const EndX = orginX-Number(pilecoordinate[i+1][0]*AmplifyRatio)
        const EndY = orginY+Number(pilecoordinate[i+1][1]*AmplifyRatio)
        ctx.setLineDash([5, 4]);
        ctx.lineWidth = 0.5
        ctx.beginPath();
        ctx.moveTo(StartX, StartY);
        ctx.lineTo(EndX, EndY);
        ctx.stroke();
        ctx.fillText(`${MajorSpace[i]*1000}`, (StartX+EndX)/2, (StartY+EndY)/2-10)
        ctx.closePath();

      }
    }

    ctx.setLineDash([0, 0]);
    ctx.strokeStyle = "#FF0000"
    ctx.lineWidth = 2
    pilecoordinate.forEach((center: any[]) => {
      ctx.beginPath(); // 경로를 시작합니다.
      ctx.arc(orginX-Number(center[0]*AmplifyRatio), orginY+Number(center[1]*AmplifyRatio), Diameter/2, 0, 2 * Math.PI); // 원을 그립니다.
      ctx.stroke(); // 원의 외곽선을 그립니다.
    });
  };

  const drawTables = (ctx:any) => {
    ctx.strokeStyle = "#000000"; // 외곽선 색상 설정
    ctx.lineWidth = 1;

    for (let i = 0; i < pileTableData.length; i++) {
      const PileProperty = CalculateProperties(pileTableData[i], 'top', 'reinforced')
      const Diameter = Number(PileProperty[3])*AmplifyRatio
      const pilecoordinate = CalculatePileCenterCoordinates(pileTableData[i], height, width)
      const orginX = canvasSize/2 + width/2*AmplifyRatio
      const orginY = canvasSize/2 - height/2*AmplifyRatio
      pilecoordinate.forEach((center: any[]) => {
        ctx.beginPath(); // 경로를 시작합니다.
        ctx.arc(orginX-Number(center[0]*AmplifyRatio), orginY+Number(center[1]*AmplifyRatio), Diameter/2, 0, 2 * Math.PI); // 원을 그립니다.
        ctx.stroke(); // 원의 외곽선을 그립니다.
      });
    }
  }

  
  const drawOutlines = (ctx:any) => {
    ctx.setLineDash([0, 0]);
    ctx.strokeStyle = "#000000"; // 외곽선 색상 설정
    ctx.lineWidth = 1;
    const newWidth = width*AmplifyRatio
    const newHeight = height*AmplifyRatio

    const x = (canvasSize - newWidth) / 2;
    const y = (canvasSize - newHeight) / 2;
    ctx.beginPath();
    ctx.strokeRect(x, y, newWidth, newHeight); // 외곽선 그리기
    
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
    
    //Y 축
    ctx.beginPath();
    ctx.moveTo(x + newWidth + dimOffset, y);
    ctx.lineTo(x + newWidth + dimOffset, y + newHeight);
    ctx.moveTo(x + newWidth + dimOffset - dimTickSize, y);
    ctx.lineTo(x + newWidth + dimOffset + dimTickSize, y);
    ctx.moveTo(x + newWidth + dimOffset - dimTickSize, y + newHeight);
    ctx.lineTo(x + newWidth + dimOffset + dimTickSize, y + newHeight);
    ctx.stroke();
    ctx.closePath();

    // 치수선 글씨 스타일 설정
    ctx.font = '10px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // 가로 치수선 글씨 (텍스트와 치수선 사이에 약간의 여백 주기 위해 offsetY 사용)
    const offsetY = 5
    ctx.fillText(`${width*1000}`, x + newWidth / 2, y - dimOffset - offsetY);

    // 세로 치수선 글씨 (텍스트를 90도 회전)
    ctx.save();
    ctx.translate(x + newWidth + dimOffset + offsetY, y + newHeight / 2);
    ctx.rotate(Math.PI / 2);
    ctx.fillText(`${height*1000}`, 0, 0);
    ctx.restore();
  };

  useEffect(() => {
    const canvas:any = canvasRef.current;
    const context = canvas.getContext('2d');
    drawAxis(context);
    drawOutlines(context);
    
    // 원들을 그리는 함수를 호출합니다.
    const circleCenters = [[100, 100], [150, 100]]; // 원의 중심 좌표 배열입니다.
    const circleRadius = 30; // 원의 반지름입니다.
    drawTables(context);
    drawInputs(context);
  }, [width, height, InputPileData]);

  return (
    <div>
      <canvas ref={canvasRef} width={canvasSize} height={canvasSize} />
    </div>
  );
};

export default PlanView;