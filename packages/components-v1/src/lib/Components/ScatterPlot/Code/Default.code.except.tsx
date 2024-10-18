import { useState, useCallback } from "react";
import {
  TextFieldV2,
  // ScatterPlot,
  GuideBox,
  Typography,
  Button,
} from "@midasit-dev/moaui-components-v1";

const ComponentsScatterPlotCodeDefault = () => {
  const [data, setData] = useState(circleData);
  const [groupSize, setGroupSize] = useState(3);
  const onApplyHanlder = useCallback(() => {
    setData(groupData(circleData, groupSize));
  }, [groupSize]);

  return (
    <>
      <GuideBox row spacing={2} verCenter>
        <Typography variant="h1">Group Size</Typography>
        <TextFieldV2
          width={50}
          type="number"
          value={groupSize.toString()}
          onChange={(e: any) => setGroupSize(Number(e.target.value))}
          numberOptions={{
            min: 1,
            max: 31,
            step: 1,
          }}
        />
        <Button color="negative" onClick={onApplyHanlder}>
          Apply
        </Button>
      </GuideBox>
      {/* <ScatterPlot 
				data={data}
				margin={{
					top: 		50,
					right: 	50,
					bottom: 50,
					left: 	50,
				}}
				nodeSize={{
					key: 'data.x',
					values: [0, 2],
					sizes: [8, 32]
				}}
			/> */}
    </>
  );
};

export default ComponentsScatterPlotCodeDefault;

const circleData = [
  { id: "dot1", data: [{ x: 1.1, y: 2.1 }] },
  { id: "dot2", data: [{ x: 1.358819, y: 2.065926 }] },
  { id: "dot3", data: [{ x: 1.6, y: 1.966025 }] },
  { id: "dot4", data: [{ x: 1.807107, y: 1.807107 }] },
  { id: "dot5", data: [{ x: 1.966025, y: 1.6 }] },
  { id: "dot6", data: [{ x: 2.065926, y: 1.358819 }] },
  { id: "dot7", data: [{ x: 2.1, y: 1.1 }] },
  { id: "dot8", data: [{ x: 2.065926, y: 0.841181 }] },
  { id: "dot9", data: [{ x: 1.966025, y: 0.6 }] },
  { id: "dot10", data: [{ x: 1.807107, y: 0.392893 }] },
  { id: "dot11", data: [{ x: 1.6, y: 0.233975 }] },
  { id: "dot12", data: [{ x: 1.358819, y: 0.134074 }] },
  { id: "dot13", data: [{ x: 1.1, y: 0.1 }] },
  { id: "dot14", data: [{ x: 0.841181, y: 0.134074 }] },
  { id: "dot15", data: [{ x: 0.6, y: 0.233975 }] },
  { id: "dot16", data: [{ x: 0.392893, y: 0.392893 }] },
  { id: "dot17", data: [{ x: 0.233975, y: 0.6 }] },
  { id: "dot18", data: [{ x: 0.134074, y: 0.841181 }] },
  { id: "dot19", data: [{ x: 0.1, y: 1.1 }] },
  { id: "dot20", data: [{ x: 0.134074, y: 1.358819 }] },
  { id: "dot21", data: [{ x: 0.233975, y: 1.6 }] },
  { id: "dot22", data: [{ x: 0.392893, y: 1.807107 }] },
  { id: "dot23", data: [{ x: 0.6, y: 1.966025 }] },
  { id: "dot24", data: [{ x: 0.841181, y: 2.065926 }] },
  { id: "dot25", data: [{ x: 1.1, y: 2.1 }] },
  { id: "dot26", data: [{ x: 1.358819, y: 2.065926 }] },
  { id: "dot27", data: [{ x: 1.6, y: 1.966025 }] },
  { id: "dot28", data: [{ x: 1.807107, y: 1.807107 }] },
  { id: "dot29", data: [{ x: 1.966025, y: 1.6 }] },
  { id: "dot30", data: [{ x: 2.065926, y: 1.358819 }] },
];

function groupData(data: any, groupSize: number) {
  const groupedData = [];
  for (let i = 0; i < data.length; i += groupSize) {
    const group = data.slice(i, i + groupSize);
    groupedData.push({
      id: `group${i / groupSize + 1}`,
      data: group.map((item: any) => item.data[0]),
    });
  }
  return groupedData;
}
