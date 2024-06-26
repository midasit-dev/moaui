import React from "react";
import { GuideBox, Button, Typography, TextField } from "@midasit-dev/moaui";
import { GetElementNumbers } from "../Workers/GetElementNumber";
import { useSnackbar } from "notistack";
import { loadData } from "../utils";
import { BeamType } from "../Workers/BeamType";

const ElementList = ({ element, onElementSelect = () => {} }) => {
  const DefaultElements = {
    elements: element,
  };
  const { enqueueSnackbar } = useSnackbar();
  const [selectedElements, setSelectedElements] = React.useState(DefaultElements.elements);

  const FetchingElements = async () => {
    const FetchingResults = await GetElementNumbers();
    const FetchingBeamType = await BeamType();
    

    console.log("FetchingResults", FetchingResults);
    console.log("FetchingBeamType", FetchingBeamType);

    if (FetchingResults.length === 0) {
      setSelectedElements(''); // 선택된 요소 초기화
      enqueueSnackbar('There is no element. Select An Element', { variant: 'error', autoHideDuration: 1500 });
      throw Error('No element selected');
    }

    console.log("FetchingResults의 타입", typeof FetchingResults); // object
    console.log("FetchingBeamType의 타입", typeof FetchingBeamType); // object

    const beamElement = FetchingResults.find(element => FetchingBeamType.includes(element));

    console.log("beamElement:", beamElement);

    if (beamElement === undefined || !beamElement) {
      enqueueSnackbar('None of the selected elements are beams.', { variant: 'error', autoHideDuration: 1500 });
      throw Error('None of the selected elements are beams');
    }
    if (FetchingResults.length > 1) {
      enqueueSnackbar('Multiple elements are selected. A beam element is selected.', { variant: 'warning', autoHideDuration: 1500 });
    }

    setSelectedElements(beamElement);
    enqueueSnackbar(`No.${beamElement} is imported`, { variant: 'success',autoHideDuration: 1500 }); // 성공 메시지 추가
    return beamElement; // 첫 번째 BEAM 요소 반환
  };

  const SetElementData = async () => {
    try {
      const element = await FetchingElements();
      handleGetElement(element); // 선택된 요소를 가져오기 위한 함수 호출
      onElementSelect("element", element);  // 선택된 요소를 상위 컴포넌트로 전달
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleGetElement = React.useCallback(async (element) => {
    const targetUrl1 = `/view/select?ele_list=${element}`;
    const result1 = await loadData(targetUrl1);

    const targetUrl2 = `/db/elem/${element}`;
    const result2 = await loadData(targetUrl2);

    if (result1 && result2) {
      console.log('imported data:', { result1, result2 });
    } else {
      enqueueSnackbar('Failed to retrieve data', { variant: 'error', autoHideDuration: 1500 });
    }
  }, [enqueueSnackbar]);

  return (
    <GuideBox column width="100%" verCenter horLeft spacing={2}>
      <Typography variant="h1">Target Element</Typography>
      <GuideBox row spacing={2} width="100%" verCenter horSpaceBetween>
        <TextField
          width="75%"
          value={selectedElements}
          disabled={true}
          onChange={(e) => { setSelectedElements(e.target.value) }}
          inputProps={{
            onClick: FetchingElements,
          }}
        />
        <Button
          variant="contained"
          width="6%"
          onClick={SetElementData}
        >Import</Button>
      </GuideBox>
    </GuideBox>
  );
};

export default ElementList;
