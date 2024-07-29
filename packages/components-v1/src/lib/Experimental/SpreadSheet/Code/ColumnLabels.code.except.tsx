import { useState, useEffect, useCallback } from "react";
import {
  ExperimentalSpreadSheet,
  GuideBox,
  Typography,
  DropList,
} from "@midasit-dev/moaui-components-v1";

const sampleDataByColumns = [
  {
    label: "Sect ID",
    values: [{ value: "Vanilla" }, { value: "Vanilla" }],
  },
  {
    label: "Sect Name",
    values: [
      {
        value: "Chocolate",
        readOnly: true,
      },
      { value: "Vanilla" },
    ],
  },
  { label: "C1", values: [ { className: 'Spreadsheet__width', value: ''} ], },
	{ label: "St1-No", values: [], },
	{ label: "St1-Dia", values: [], },
	{ label: "Md1-No", values: [], },
	{ label: "Md1-Dia", values: [], },
	{ label: "Ed1-No", values: [], },
	{ label: "Ed1-Dia", values: [], },
];

// const sampleColumnLabels = [
// 	"Sect ID", "Sect Name", "C1"
// ]

// const sampleRows = [
// 	[ { value: "Vanilla" }, { value: "Chocolate", readOnly: true }, { value: "40.00" } ]
// ]

function transformData(dataByColumns: any) {
  const result = [];
  let rowLength = 0;

  // 최대 길이를 가진 values 배열의 길이를 찾습니다.
  dataByColumns.forEach((column: any) => {
    if (column.values.length > rowLength) {
      rowLength = column.values.length;
    }
  });

  // 각 행마다 값을 추출하여 결과 배열을 구성합니다.
  for (let i = 0; i < rowLength; i++) {
    const row = dataByColumns.map((column: any) => column.values[i] || {});
    result.push(row);
  }

  return result;
}

function convertDataToSpreadsheetFormat(dataByColumns: any) {
  const _columnLabels = dataByColumns.map((column: any) => column.label);
  const _rows = transformData(dataByColumns);

  return { _columnLabels, _rows };
}

const ComponentsSpreadSheetColumnLabels = () => {
  const [dataByColumns, ] = useState(sampleDataByColumns);
  const [columnLabels, setColumnLabels] = useState([]);
  const [rows, setRows] = useState<any[]>([]);

  useEffect(() => {
    const { _columnLabels, _rows } =
      convertDataToSpreadsheetFormat(dataByColumns);
    setColumnLabels(_columnLabels);
    setRows(_rows);
  }, [dataByColumns]);

	//Layer DropList
	const [curLayer, setCurLayer] = useState(1);
	const [, setCurColumnVisibility] = useState([]);
	const onChangeCurLayer = useCallback((event: any) => {
		setCurLayer(event.target.value);
		setCurColumnVisibility([]);
	}, []);

  return (
    <>
      <GuideBox width="100%" row verCenter horSpaceBetween>
        <GuideBox row spacing={2} verCenter>
          <Typography variant="body1">Select Layer</Typography>
          <DropList
            itemList={[
              ["1", 1],
              ["2", 2],
              ["3", 3],
            ]}
            width="50px"
            defaultValue="1"
            value={curLayer}
            onChange={onChangeCurLayer}
          />
        </GuideBox>
        <GuideBox>
          <Typography variant="body1">Unit: (mm)</Typography>
        </GuideBox>
      </GuideBox>

      <ExperimentalSpreadSheet data={rows} columnLabels={columnLabels} onChange={setRows} />
      <pre>{JSON.stringify(rows, null, 2)}</pre>
      <style>
        {`
					.Spreadsheet__width {
						width: 50px;
					}
					.Spreadsheet__cell {
						font-weight: 400;
						font-size: 0.75rem;
						font-family: Pretendard, sans-serif;
						min-width: 1rem;
					}
					.Spreadsheet__header {
						font-weight: 400;
						font-size: 0.75rem;
						font-family: Pretendard, sans-serif;
						min-width: 1rem;
					}
				`}
      </style>
    </>
  );
};

export default ComponentsSpreadSheetColumnLabels;
