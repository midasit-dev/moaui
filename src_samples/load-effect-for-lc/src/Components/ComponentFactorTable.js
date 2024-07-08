import * as React from "react";
import { GuideBox, DataGrid, Typography, Color } from "@midasit-dev/moaui";
import Scrollbars from "rc-scrollbars";

const FactorTable = ({ combData: _combData, selectedData, beamData, style, sortOption }) => {
  const [combData, setCombData] = React.useState([]);
  const [maxValueId, setMaxValueId] = React.useState(null);
  const [minValueId, setMinValueId] = React.useState(null);

  React.useEffect(() => {
    if (selectedData && _combData.length > 0) {
      const { id, field } = selectedData;
      console.log("Selected Data: ", selectedData);
      console.log("Beam Data: ", beamData);
      console.log("Comb Data: ", _combData);

      const newCombData = _combData.map((value) => {
        let newValue = { ...value };
        let unfactoredValue;
        console.log("VALUE is:",value);
        console.log("newValue is:",newValue);
        if (newValue.NAME.includes("(MV)")) {
          const newNamePostfix = Number(id) === 1 ? "(MV:max)" : "(MV:min)";
          const newName = value.NAME.replace("(MV)", newNamePostfix);
          unfactoredValue = beamData?.[Number(id) - 1]?.[`${field}_DATA`]?.[newName] || beamData?.[Number(id) - 1]?.[`${field}_DATA`]?.[value.NAME] || 0;
        } else if (newValue.NAME.includes("(CB)")) {
          const newNamePostfix = Number(id) === 1 ? "(CB:max)" : "(CB:min)";
          const newName = value.NAME.replace("(CB)", newNamePostfix);

          unfactoredValue = beamData?.[Number(id) - 1]?.[`${field}_DATA`]?.[newName] || beamData?.[Number(id) - 1]?.[`${field}_DATA`]?.[value.NAME] || 0;
        } else {
          unfactoredValue = beamData?.[Number(id) - 1]?.[`${field}_DATA`]?.[value.NAME] || 0;
        }

        newValue.UNFACTORED_VALUE = unfactoredValue;
        
        newValue.FACTORED_VALUE = parseFloat((unfactoredValue * newValue.FACTOR).toFixed(style.place)); // Ensure FACTORED_VALUE is a number

        return newValue;
      });

      console.log(newCombData);
      setCombData(newCombData);

      if (newCombData.length > 0) {
        const factoredValues = newCombData.map(item => sortOption === 0 ? Math.abs(item.FACTORED_VALUE) : item.FACTORED_VALUE);
        const maxValue = Math.max(...factoredValues);
        const minValue = Math.min(...factoredValues);

        if (maxValue === minValue || factoredValues.every(value => value === 0)) {
          setMaxValueId(null);
          setMinValueId(null);
        } else {
          const maxId = newCombData.find(item => sortOption === 0 ? Math.abs(item.FACTORED_VALUE) === maxValue : item.FACTORED_VALUE === maxValue)?.NAME;
          const minId = newCombData.find(item => sortOption === 0 ? Math.abs(item.FACTORED_VALUE) === minValue : item.FACTORED_VALUE === minValue)?.NAME;
          setMaxValueId(maxId);
          setMinValueId(minId);
        }
      }
    }
  }, [_combData, selectedData, beamData, style.place, sortOption]);

  const FactorGridTable = React.useMemo(
    () => [
      {
        flex: 1,
        field: "NAME",
        headerName: "Load Case",
        editable: false,
        sortable: false,
      },
      {
        flex: 1,
        field: "UNFACTORED_VALUE",
        headerName: "Unfactored Value",
        editable: false,
        sortable: false,
      },
      {
        flex: 1,
        field: "FACTOR",
        headerName: "Factor",
        editable: false,
        sortable: false,
      },
      {
        flex: 1,
        field: "FACTORED_VALUE",
        headerName: "Factored Value",
        editable: false,
        sortable: false,
        cellClassName: (params) => {
          if (params.row.NAME === maxValueId) return 'max-value-cell';
          if (params.row.NAME === minValueId) return 'min-value-cell';
          return '';
        }
      },
    ],
    [maxValueId, minValueId]
  );

  const handleOnCellEditCommit = (params, event) => {
    let newCombData = [...combData];
    const findIndex = newCombData.findIndex((value) => value["No."] === params.id);
    if (findIndex >= 0) {
      newCombData[findIndex] = {
        ...newCombData[findIndex],
        [params.field]: params.value,
      };
      setCombData(newCombData);
    }
  };

  return (
    <>
      <GuideBox show fill='1' width="100%" center padding={0} borderRadius={1}>
        <Typography verCenter variant="h1" height={30} color={Color.secondary.main}>
          Factored Value Table
        </Typography>
      </GuideBox>
      <GuideBox padding={1} spacing={1} height={265} verSpaceBetween>
        <Scrollbars autoHide autoHeight autoHeightMax={"250px"}>
          <DataGrid
            rows={combData}
            columns={FactorGridTable}
            getRowId={(row) => row.NAME}
            density="compact"
            disableColumnMenu
            sx={{ width: "100%", height: "250px" }}
            onCellEditCommit={handleOnCellEditCommit}
            experimentalFeatures={{ newEditingApi: true }}
            hideFooter
          />
        </Scrollbars>
        <style jsx>{`
          .max-value-cell {
            background-color: red !important;
            color: white !important;
          }
          .min-value-cell {
            background-color: blue !important;
            color: white !important;
          }
        `}</style>
      </GuideBox>
    </>
  );
}

export default FactorTable;
