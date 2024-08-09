import React from "react";
import "./cell.css";

const groupCellsByRow = (cells: any) => {
  const rows: { [key: number]: any[] } = {};

  Object.values(cells).forEach((cell: any) => {
    if (!rows[cell.row]) {
      rows[cell.row] = [];
    }
    rows[cell.row][cell.col - 1] = cell; // col - 1 to match array index
  });

  return rows;
};

const ExcelTable = (props: any) => {
  const { json } = props;

  if (!json || Object.keys(json).length === 0) return null;

  const rows = groupCellsByRow(json.cells);

  return (
    <div style={{ borderCollapse: "collapse" }}>
      {Object.keys(rows).map((rowNumber) => {
        const row = rows[parseInt(rowNumber, 10)];

        return (
          <div key={rowNumber} style={{ display: "flex" }}>
            {row.map((cell: any, index: number) =>
              cell ? (
                <div
                  key={cell.name}
                  className="cell"
                  style={{
                    width: `${cell.width}px`,
                    height: `${cell.height}px`,
                    ...(cell.style || {}),
                    zIndex: row.length - index,
                  }}
                >
                  {cell.type === "Formula" ? cell.formula : cell.value}
                </div>
              ) : null
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ExcelTable;
