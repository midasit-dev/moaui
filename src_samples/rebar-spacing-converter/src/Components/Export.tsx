import React from 'react';
import { Button } from '@midasit-dev/moaui';

// tableData의 타입 정의
type TableDataType = {
  id: number;
  BeforeRebarSize: string;
  BeforeRebarSpacing: string;
  AfterRebarSize: string;
  AfterRebarSpacing: string;
};

// tableData props에 타입 적용
type Props = {
  tableData: TableDataType[];
};

const ExportTableToJsonButton = ({ tableData }: Props) => {
  const exportTableToJson = () => {
    const jsonData = JSON.stringify(tableData, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'table_data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Button variant="contained" color="negative" onClick={exportTableToJson}>
      Export JSON
    </Button>
  );
};

export default ExportTableToJsonButton;
