import * as React from "react";
import { GuideBox, DataGrid, Typography, Color } from "@midasit-dev/moaui";
import Scrollbars from "rc-scrollbars";
import { motion } from "framer-motion";

const BeamTable = ({ beamData, onCellSelect }) => {
  const [selectedCell, setSelectedCell] = React.useState( null );
  const BeamTableColumns = React.useMemo(
    () => [
      { flex: 0.75, field: "ELEMENT", headerName: "ELEM.", editable: false, sortable: false },
      { flex: 1, field: "LOAD", headerName: "L/C", editable: false, sortable: false },
      { flex: 0.75, field: "I_J", headerName: "I/J", editable: false, sortable: false },
      { flex: 1, field: "FX", headerName: "FX", editable: false, sortable: false, renderCell: (params) => <MotionCell params={params} /> },
      { flex: 1, field: "FY", headerName: "FY", editable: false, sortable: false, renderCell: (params) => <MotionCell params={params} /> },
      { flex: 1, field: "FZ", headerName: "FZ", editable: false, sortable: false, renderCell: (params) => <MotionCell params={params} /> },
      { flex: 1, field: "MX", headerName: "MX", editable: false, sortable: false, renderCell: (params) => <MotionCell params={params} /> },
      { flex: 1, field: "MY", headerName: "MY", editable: false, sortable: false, renderCell: (params) => <MotionCell params={params} /> },
      { flex: 1, field: "MZ", headerName: "MZ", editable: false, sortable: false, renderCell: (params) => <MotionCell params={params} /> },
    ],
    []
  );

  const handleCellClick = (params, event, details) => {
    const { id, field, value } = params;
    if (["FX", "FY", "FZ", "MX", "MY", "MZ"].includes(field)) {
      setSelectedCell({ id, field, value });
      onCellSelect(id, field, value);
      console.log("Selected Cell: ", { id, field, value });
    } else {
      setSelectedCell(null);
    }
  };

  const getCellClassName = (params) => {
    const { id, field } = params;
    return selectedCell && selectedCell.id === id && selectedCell.field === field ? "selected-cell" : "";
  };

  return (
    <>
      <GuideBox show fill='1' width="100%" center padding={0} borderRadius={1}>
        <Typography verCenter variant="h1" height={30} color={Color.secondary.main}>
          Force Table
        </Typography>
      </GuideBox>
      <GuideBox padding={1} spacing={1} height={120} verSpaceBetween>
        <Scrollbars autoHide autoHeight autoHeightMax={"100px"}>
          <DataGrid
            rows={beamData}
            columns={BeamTableColumns}
            getRowId={(row) => row.INDEX}
            density="compact"
            disableColumnMenu
            sx={{ width: "100%", height: "150px" }}
            hideFooter
            onCellClick={handleCellClick}
            getCellClassName={getCellClassName}
          />
        </Scrollbars>
        <style jsx>{`
        .selected-cell {
          background-color: green !important;
          color: white !important;
        }
      `}</style>
      </GuideBox>
    </>
  );
};

const MotionCell = ({ params }) => {
  const { value } = params;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {value}
    </motion.div>
    
  );
};

export default BeamTable;
