//ComponentCreateBeamForce.js
import React from 'react';
import { GuideBox, Button } from "@midasit-dev/moaui";
import { GetBeamforceData } from '../Workers/Beamforce';
import { useSnackbar } from 'notistack';



function CreateBeamForce({ part, style, unit, element, combName, combData, setBeamForceData = () => {},onUpdateUnit,onUpdateStyle}) {
  const { enqueueSnackbar } = useSnackbar();
  

  const handleCreateForce = async () => {
    if (!element || element.length === 0) {
      enqueueSnackbar('There is no element. Select An Element', { variant: 'error', autoHideDuration: 1000 });
      return;
    }
    
    let hasCS = false;
    let hasMV = false;
    let hasCB = false;
   

    combData.forEach((value) => {
      if (value.NAME.includes("(CS)")) hasCS = true;
      if (value.NAME.includes("(MV)")) hasMV = true;
      if (value.NAME.includes("(CB)")) hasCB = true;
      
    });
    console.log("CombData",combData)
    
    
    try {
      const data = await GetBeamforceData({ part, style, unit, element, lcomName: combName, lcomData: combData, hasCS, hasMV, hasCB });
      if (data.length === 0) {
        enqueueSnackbar('Cannot generate table data as there is no analysis result. Try again after analysis', { variant: 'error', autoHideDuration: 1000 });
        return;
      }
      setBeamForceData(data);
      onUpdateUnit(unit); // Create Force 버튼 클릭 시 단위 값 업데이트
      onUpdateStyle(style); // Create Force 버튼 클릭 시 스타일 값 업데이트
      console.log("DATA is:",data);
      enqueueSnackbar('Force Data Created', { variant: 'success', autoHideDuration: 1000 });
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error', autoHideDuration: 1000 });
    }
  };
 
  return (
    
    <GuideBox row spacing={2} width="100%" verCenter horSpaceBetween>
      <Button
        color='negative'
        variant="contained"
        width="100%"
        onClick={handleCreateForce}
      >
        Create Force
      </Button>
    </GuideBox>
  );
}

export default CreateBeamForce;
