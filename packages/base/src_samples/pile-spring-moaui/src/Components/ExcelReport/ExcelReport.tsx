import React, { useState } from "react";
import { GuideBox, Button } from "@midasit-dev/moaui";
import { ReportJsonResult } from "../variables";
import { report } from "process";
import { useRecoilState } from "recoil";

async function ExcelReport(reportJsonResult:any){
  

  const BaseSheetFilePath = "BaseSheet.xlsx"
  await fetch(BaseSheetFilePath)
  .then(response => response.blob())
  .then(async blob => {
    const formData = new FormData();
    formData.append("file", blob, "BaseSheet.xlsx");
    formData.append("parameter", JSON.stringify(reportJsonResult));
    await fetch('https://moa.rpm.kr-dv-midasit.com/backend/function-executor/plugin-execute', {
      method: 'POST',
      body: formData, // 필요에 따라 적절한 formData를 설정해주세요.
    })
    .then(response => response.blob()) // 응답을 blob 형태로 변환
    .then(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; 
      a.download = 'pilespring.xlsx'; // 다운로드할 파일이름 지정
      document.body.appendChild(a); // 이건 UI에 보이지 않게 하기 위함
      a.click(); // 클릭 이벤트 발생
      window.URL.revokeObjectURL(url); // 사용이 끝난 URL 해제
      document.body.removeChild(a); // 추가했던 `<a>` 태그 제거
    })
    .catch(error => console.error('Download error:', error));
    
  })

}

export default ExcelReport;
