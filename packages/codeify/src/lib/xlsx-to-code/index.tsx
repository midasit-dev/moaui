import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import * as ExcelJS from 'exceljs';
import { Box, Container, Paper, Typography, Grid, Alert, Tabs, Tab, AlertTitle, Button, TextField, Stack } from '@mui/material';
import MonacoEditor from '@monaco-editor/react';
import { toCssObjBorder, toCssObjFont, toCssObjFill } from './to-css';
import { transform } from '@babel/standalone';
import { Android12Switch } from './switch';

function excelWidthToPixels(excelWidth: number): number {
	// 일반적인 변환 공식
	const pixels = Math.round(excelWidth * 7 + 5);
	return pixels;
};

function excelHeightToPixels(excelHeight: number): number {
	// 1 포인트는 1.333 픽셀 (96/72)
	const pointsToPixels = 96 / 72;
	const pixels = excelHeight * pointsToPixels;
	return Math.round(pixels);
};

function toCellAddress(rowIndex: number, colIndex: number): string {
	// 열 인덱스를 엑셀 열 이름으로 변환하는 함수
	function colIndexToExcel(colIndex: number): string {
			let result = '';
			let tempIndex = colIndex;

			while (tempIndex >= 0) {
					const charCode = (tempIndex % 26) + 'A'.charCodeAt(0);
					result = String.fromCharCode(charCode) + result;
					tempIndex = Math.floor(tempIndex / 26) - 1;
			}

			return result;
	}

	// 행 인덱스는 1부터 시작하므로 rowIndex + 1
	const colLetter = colIndexToExcel(colIndex);
	const rowNumber = rowIndex + 1;

	return `${colLetter}${rowNumber}`;
}

function toValue(value: ExcelJS.CellValue): string | number {
	if (value === null) {
		return '';
	}

	if (typeof value === 'string') {
		return value
			.replaceAll('>','&gt;')
			.replaceAll('<','&lt;')
			.replaceAll('&','&amp;')
			.replaceAll('"','&quot;')
			.replaceAll(`'`, '&apos;');
	}

	if (typeof value === 'number') {
		return value;
	}

	if (typeof value === 'object') {
		//ExcelJS.CellFormulaValue
		if ('formula' in value) {
		}

		if ('result' in value) {
			const result = value.result;
			if (!result) return '';
			if (typeof result === 'string') return result;
			if (typeof result === 'number') return result;
			return 'toValue Error - Unsupported Type in [object]';
		}
	}

	return 'toValue Error - Unsupported Type';
}

interface CellWidthHeight {
	width: number;
	height: number;
}

const ExcelToDiv: React.FC = () => {
  const [values, setValues] = useState<ExcelJS.CellValue[][]>([]);
  const [styles, setStyles] = useState<Partial<ExcelJS.Style>[][]>([]);
	const [widthHeights, setWidthHeights] = useState<CellWidthHeight[][]>([]);
	const [formulas, setFormulas] = useState<string[][]>([]);
  const [tabIndex, setTabIndex] = useState<number>(0);

  // Determine max number of columns to handle missing cells
  const maxColumns = values.reduce((max, row) => Math.max(max, row.length), 0);
	const [previewByCode, setPreviewByCode] = useState<boolean>(false);
	const [includedGridLines, setIncludedGridLines] = useState<boolean>(true);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = async (e: ProgressEvent<FileReader>) => {
			function formatNumber(value: number, numFmt: string): string {
				// This function should be implemented to format the number based on numFmt
				// This is a simplified example for demonstration purposes
				const decimalPlaces = (numFmt.match(/0/g) || []).length;
				return value.toFixed(decimalPlaces);
			}

			console.log('onDrop -> e.target', e.target);

      if (e.target && e.target.result) {
        const arrayBuffer = e.target.result as ArrayBuffer;
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(arrayBuffer);
        const worksheet = workbook.worksheets[0];

        const cellValues: ExcelJS.CellValue[][] = [];
        const cellStyles: Partial<ExcelJS.Style>[][] = [];
				const cellWidthHeights: CellWidthHeight[][] = [];
				const cellFormulas: string[][] = [];

        worksheet.eachRow({ includeEmpty: true }, (row: ExcelJS.Row, rowNumber: number) => {
          const rowValues: ExcelJS.CellValue[] = [];
          const rowStyles: Partial<ExcelJS.Style>[] = [];
					const rowWidthHeights: CellWidthHeight[] = [];
					const rowFormulas: string[] = [];

					const rowHeight = excelHeightToPixels(row.height ?? 17);

          row.eachCell({ includeEmpty: true }, (cell: ExcelJS.Cell, colNumber: number) => {
						const colWidth = excelWidthToPixels(worksheet.getColumn(colNumber).width ?? 8.08);

						// style
						const style = cell.style;
            rowStyles[colNumber - 1] = style;

						// value
						let value = cell.value;
						const numFmt = cell.numFmt;
						if (typeof value === 'number') {
							if (numFmt) {
								const formattedValue = formatNumber(value, numFmt);
								value = formattedValue;
							}
						}

						if (typeof value === null) {
							value = '';
						}

            rowValues[colNumber - 1] = value;
						rowWidthHeights[colNumber - 1] = { width: colWidth ?? 25, height: rowHeight ?? 25 };

						// formula
						if (cell.formula) {
							console.log('cell.formula', cell.formula);
							const formula = cell.formula;
							rowFormulas[colNumber - 1] = formula;
						}
          });

          cellValues[rowNumber - 1] = rowValues;
          cellStyles[rowNumber - 1] = rowStyles;
					cellWidthHeights[rowNumber - 1] = rowWidthHeights;
					cellFormulas[rowNumber - 1] = rowFormulas;
        });

        setValues(cellValues);
        setStyles(cellStyles); // Save styles to state
				setWidthHeights(cellWidthHeights);
				setFormulas(cellFormulas);
      }
    };

    reader.readAsArrayBuffer(file);
  }, []);

	const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const generateCode = useCallback((
			data: ExcelJS.CellValue[][], 
			styles: Partial<ExcelJS.Style>[][], 
			widthHeights: CellWidthHeight[][],
			formulas: string[][]
		): string => {
			let codeString = `import React from 'react';\nconst App = () => {\n`;
			codeString += `  return (\n`
			codeString += `    <div style={{ display: 'flex', flexDirection: 'column' }}>\n`;

			data.forEach((row: ExcelJS.CellValue[], rowIndex: number) => {
				codeString += `      <div id={\`ROW-${rowIndex + 1}\`} style={{ display: 'flex' }}>\n`;

				row.forEach((cell: ExcelJS.CellValue, cellIndex: number) => {
					const width = widthHeights[rowIndex]?.[cellIndex]?.width ?? 25;
					const height = widthHeights[rowIndex]?.[cellIndex]?.height ?? 25;
					const style = styles[rowIndex]?.[cellIndex] || {};

					// *** BOX RELATIVE ***
					codeString += `        <div\n`;
					codeString += `          id={\`${toCellAddress(rowIndex, cellIndex)}\`}\n`;
					codeString += `          style={{ /* default */ position: 'relative',\n`;
					codeString += `            /* cell style */\n`;
					codeString += `            width: '${width}px',\n`;
					codeString += `            height: '${height}px',\n`;
					codeString += `            boxSizing: 'border-box',\n`;

					// Apply border styles
					const borderStyle = toCssObjBorder(style.border);
					if (borderStyle) {
						// default border add!
						codeString += `            border: '${includedGridLines ? '1px solid rgba(0, 0, 0, 0.1)' : 'none'}',\n`;
						Object.entries(borderStyle).forEach(([key, value]) => {
							codeString += `            ${key}: '${value}',\n`;
						});
					}

					// Apply fill styles
					const fillStyle = toCssObjFill(style.fill);
					if (fillStyle) {
						Object.entries(fillStyle).forEach(([key, value]) => {
							codeString += `            ${key}: '${value}',\n`;
						});
					}

					codeString += `          }}\n`;

					// Add formula
					const formula = formulas[rowIndex]?.[cellIndex];
					if (formula) {
						codeString += `          data-formula="${formula}"\n`;
					}

					codeString += `				 >\n`;

					// *** BOX ABSOLUTE ***
					codeString += `          <div\n`;
					codeString += `            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',\n`;
					codeString += `            /* font style */\n`;

					// Apply font styles
					const fontStyle = toCssObjFont(style.font);
					if (fontStyle) {
						Object.entries(fontStyle).forEach(([key, value]) => {
							codeString += `              ${key}: '${value}',\n`;
						});
					}

					codeString += `						}}\n`;
					codeString += `					>\n`;
					codeString += `            ${toValue(cell)}\n`;
					codeString += `          </div>\n`;
					// *** BOX ABSOLUTE ***

					codeString += `        </div>\n`;
					// *** BOX RELATIVE ***
				});

				codeString += `      </div>\n`;
			});

			codeString += `    </div>\n`;
			codeString += `  );\n`;
			codeString += `};\n`;
			codeString += `export default App;\n`;
			return codeString;
	} ,[includedGridLines]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

	const [clickedCellInfo, setClickedCellInfo] = useState<{ 
		rowIndex: number, 
		cellIndex: number 
	}>({ rowIndex: 0, cellIndex: 0 });

  return (
    <Container>

      <Paper
        {...getRootProps()}
        sx={{
          border: "2px dashed #007bff",
          padding: "40px",
          textAlign: "center",
          cursor: "pointer",
          marginBottom: "20px",
          backgroundColor: "#f9f9f9",
          borderRadius: "8px",
          transition: "background-color 0.3s",
          "&:hover": {
            backgroundColor: "#e0f7fa",
          },
        }}
      >
        <input {...getInputProps()} />
        <Typography variant="h6" color="textSecondary" sx={{ fontWeight: "bold" }}>
          여기에 파일을 드롭하거나 클릭하여 파일을 선택하세요.
        </Typography>
      </Paper>
      <Box>
        {values.length > 0 ? (
					<Box sx={{ display: "flex", justifyContent: "center", alignItems: 'center' }}>
						<Tabs value={tabIndex} onChange={handleTabChange} centered>
							<Tab label="Preview" />
							<Tab label="Code" />
						</Tabs>
						<Typography>눈금선</Typography>
						<Android12Switch
							checked={includedGridLines}
							onChange={() => {
								setIncludedGridLines(!includedGridLines);
								setPreviewByCode(false);
							}}
						/>
					</Box>
        ) : (
          <Alert
            severity="info"
            sx={{
              marginTop: "20px",
              borderRadius: "8px",
              backgroundColor: "#e3f2fd",
            }}
          >
            <AlertTitle>알림</AlertTitle>
            업로드된 파일이 없습니다.
          </Alert>
        )}

				{/** Preview Tab */}
        {values.length > 0 && tabIndex === 0 && (
          <Grid container spacing={0} sx={{ marginTop: "20px", }}>
						<Stack direction='row' spacing={2} justifyItems='center'>
							<TextField 
								label='cell address'
								variant='outlined'
								size='small'
								value={toCellAddress(clickedCellInfo.rowIndex, clickedCellInfo.cellIndex)}
							/>
							<TextField 
								label='formula'
								variant='outlined'
								size='small'
								value={formulas[clickedCellInfo.rowIndex]?.[clickedCellInfo.cellIndex] ?? '-'}
							/>
						</Stack>
            {values.length > 0 && tabIndex === 0 && (
							<Grid container spacing={0} sx={{ marginTop: "20px" }}>
								{values.map((row: ExcelJS.CellValue[], rowIndex: number) => (
									<Grid item xs={12} key={rowIndex}>
										<Box className="row" sx={{ display: "flex" }}>
											{Array.from({ length: maxColumns }).map((_, cellIndex) => {
												return (
													<Box
														key={cellIndex}
														sx={{
															position: "relative",
															width: widthHeights[rowIndex]?.[cellIndex]?.width ?? 25,
															height: widthHeights[rowIndex]?.[cellIndex]?.height ?? 25,
															overflow: "visible",
															whiteSpace: "nowrap",
															boxSizing: "border-box",
															border: includedGridLines ? "1px solid rgba(0, 0, 0, 0.1)" : "none",
															...toCssObjBorder(styles[rowIndex]?.[cellIndex]?.border),
															...toCssObjFill(styles[rowIndex]?.[cellIndex]?.fill),
															cursor: 'pointer',
															'&:hover': {
																border: '1px solid #217346',
															},
															'&:active': {
																transform: 'scale(0.95)',
															},
															...(clickedCellInfo.rowIndex === rowIndex && clickedCellInfo.cellIndex === cellIndex ? { border: '1px solid #217346' } : {}),
														}}
														onClick={() => setClickedCellInfo({ rowIndex, cellIndex })}
													>
														<Box
															sx={{
																position: "absolute",
																top: 0,
																left: 0,
																zIndex: 1,
																...toCssObjFont(styles[rowIndex]?.[cellIndex]?.font),
															}}
														>
															{toValue(row[cellIndex])}
														</Box>
													</Box>
												)
											})}
										</Box>
									</Grid>
								))}
							</Grid>
						)}
          </Grid>
        )}

				{/** Code Tab */}
        {values.length > 0 && tabIndex === 1 && (() => {
					const tsxString = generateCode(values, styles, widthHeights, formulas);
					return (
						<Box sx={{ height: "400px", marginTop: "20px" }}>
							<Typography sx={{ mb: 2 }}>테스트 해보기 <a href='https://codesandbox.io/p/sandbox/xlsx-to-code-viewer-zzw54n?layout=%257B%2522sidebarPanel%2522%253A%2522EXPLORER%2522%252C%2522rootPanelGroup%2522%253A%257B%2522direction%2522%253A%2522horizontal%2522%252C%2522contentType%2522%253A%2522UNKNOWN%2522%252C%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522id%2522%253A%2522ROOT_LAYOUT%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522UNKNOWN%2522%252C%2522direction%2522%253A%2522vertical%2522%252C%2522id%2522%253A%2522clzjfwql900063j6iobtkjc9p%2522%252C%2522sizes%2522%253A%255B100%252C0%255D%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522EDITOR%2522%252C%2522direction%2522%253A%2522horizontal%2522%252C%2522id%2522%253A%2522EDITOR%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522EDITOR%2522%252C%2522id%2522%253A%2522clzjfwql900023j6ifkhs5bn8%2522%257D%255D%257D%252C%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522SHELLS%2522%252C%2522direction%2522%253A%2522horizontal%2522%252C%2522id%2522%253A%2522SHELLS%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522SHELLS%2522%252C%2522id%2522%253A%2522clzjfwql900033j6iczvgnt7h%2522%257D%255D%257D%255D%257D%252C%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522DEVTOOLS%2522%252C%2522direction%2522%253A%2522vertical%2522%252C%2522id%2522%253A%2522DEVTOOLS%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522DEVTOOLS%2522%252C%2522id%2522%253A%2522clzjfwql900053j6idnzo4uo8%2522%257D%255D%257D%255D%252C%2522sizes%2522%253A%255B50%252C50%255D%257D%252C%2522tabbedPanels%2522%253A%257B%2522clzjfwql900023j6ifkhs5bn8%2522%253A%257B%2522tabs%2522%253A%255B%257B%2522id%2522%253A%2522clzjfwql800013j6isx52y8gf%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522FILE%2522%252C%2522filepath%2522%253A%2522%252Fsrc%252Findex.tsx%2522%257D%255D%252C%2522id%2522%253A%2522clzjfwql900023j6ifkhs5bn8%2522%252C%2522activeTabId%2522%253A%2522clzjfwql800013j6isx52y8gf%2522%257D%252C%2522clzjfwql900053j6idnzo4uo8%2522%253A%257B%2522tabs%2522%253A%255B%257B%2522id%2522%253A%2522clzjfwql900043j6itdenx1e2%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522UNASSIGNED_PORT%2522%252C%2522port%2522%253A0%257D%255D%252C%2522id%2522%253A%2522clzjfwql900053j6idnzo4uo8%2522%252C%2522activeTabId%2522%253A%2522clzjfwql900043j6itdenx1e2%2522%257D%252C%2522clzjfwql900033j6iczvgnt7h%2522%253A%257B%2522tabs%2522%253A%255B%255D%252C%2522id%2522%253A%2522clzjfwql900033j6iczvgnt7h%2522%257D%257D%252C%2522showDevtools%2522%253Atrue%252C%2522showShells%2522%253Atrue%252C%2522showSidebar%2522%253Atrue%252C%2522sidebarPanelSize%2522%253A15%257D' target='_blank'>Code Sandbox</a></Typography>
							<MonacoEditor
								theme="vs-dark"
								height="100%"
								language="typescript"
								value={tsxString}
								options={{
									readOnly: false,
									minimap: { enabled: false },
								}}
							/>
							<Button onClick={() => setPreviewByCode(!previewByCode)} sx={{ mt: "10px" }}>Preview By Code Toggle</Button>
							{previewByCode && (compileJSX(tsxString.match(regex)![1]))}
						</Box>
					)
				})()}
      </Box>

    </Container>
  );
};

export default ExcelToDiv;

// return ( ... )만 추출하기 위한 패턴
const regex = /return\s*\(\s*([\s\S]*?)\s*\)\s*;/;
const jsxString = `
import React from 'react';
const XlsxToCodeApp: React.FC = () => {
  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
};
export default XlsxToCodeApp;
`;

const compileJSX = (jsx: string) => {
  const code = transform(jsx, {
    presets: ['react', 'typescript'],
		filename: 'file.tsx'
  }).code;

	const component = new Function('React', `return ${code}`)(React);
  return component;
};