import * as ExcelJS from "exceljs";
import { CSSProperties } from "react";

export interface RawCellInfo {
  effectiveType: ExcelJS.ValueType;
  isMerged: boolean;
  isHyperlink: boolean;
  hyperlink: string;
  text: string;
  fullAddress: ExcelJS.Cell["fullAddress"];
  model: ExcelJS.CellModel;
  name: string;
  names: string[];
  dataValidation: ExcelJS.DataValidation;
  value: ExcelJS.CellValue;
  note: string | ExcelJS.Comment;
  formula: string;
  result: ExcelJS.CellValue;
  type: ExcelJS.ValueType;
  formulaType: ExcelJS.FormulaType;
  style: Partial<ExcelJS.Style>;
  width: number;
  height: number;
}

export interface CSSCellInfo {
  sheetName: string;
  row: number;
  col: number;
  type: string;
  name: string;
  address: ExcelJS.Address;
  width: number;
  height: number;
  style: Partial<{
    color: CSSProperties["color"];
    fontWeight: CSSProperties["fontWeight"];
    textAlign: CSSProperties["textAlign"];
    fontSize: CSSProperties["fontSize"];
    verticalAlign: CSSProperties["verticalAlign"];
    backgroundColor: CSSProperties["backgroundColor"];
    border: CSSProperties["border"];
    borderTop: CSSProperties["borderTop"];
    borderRight: CSSProperties["borderRight"];
    borderBottom: CSSProperties["borderBottom"];
    borderLeft: CSSProperties["borderLeft"];
  }>;
  text?: string;
  hyperlink?: string;
  value?: ExcelJS.CellValue;
  master: string;
  formula?: string;
  sharedFormula?: string;
  result?: string | number | any;
  comment: ExcelJS.Comment;
}

export interface CSSCellOption {
  rawParse?: boolean;
  defaultNumFmt?: boolean;
  defaultBorder?: boolean;
}

export function defaultOptions(): CSSCellOption {
  return {
    rawParse: false,
    defaultNumFmt: true,
    defaultBorder: false,
  };
}

export interface WorkSheet<T> {
  rowCount: number;
  colCount: number;

  cells: {
    [name: string]: T;
  };
}

export async function toJson(
  excelBuffer: ArrayBuffer,
  option?: CSSCellOption
): Promise<WorkSheet<Partial<CSSCellInfo>> | WorkSheet<Partial<RawCellInfo>>> {
  // default options
  if (!option) option = defaultOptions();

  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(excelBuffer);

  //우선 첫번째 시트부터 조져보자
  const worksheet = workbook.worksheets[0];

  let convertedSheet:
    | WorkSheet<Partial<CSSCellInfo>>
    | WorkSheet<Partial<RawCellInfo>> = {
    rowCount: worksheet.rowCount,
    colCount: worksheet.columnCount,
    cells: {},
  };

  worksheet.eachRow(
    { includeEmpty: true },
    (row: ExcelJS.Row, rowNumber: number) => {
      const rowHeight = excelHeightToPixels(row.height ?? 17);

      row.eachCell(
        { includeEmpty: true },
        (cell: ExcelJS.Cell, colNumber: number) => {
          const colWidth = excelWidthToPixels(
            worksheet.getColumn(colNumber).width ?? 8.08
          );

          if (option?.rawParse) {
            convertedSheet.cells[cellUniqueName(cell)] = toRawCell(
              cell,
              colWidth,
              rowHeight,
              option
            );
          } else {
            convertedSheet.cells[cellUniqueName(cell)] = toCSSCell(
              cell,
              colWidth,
              rowHeight,
              option
            );
          }
        }
      );
    }
  );

  return convertedSheet;
}

function cellUniqueName(cell: ExcelJS.Cell): string {
  return cell.name ? cell.name : cell.address;
}

function toCSSCell(
  cell: ExcelJS.Cell,
  width: number,
  height: number,
  option?: CSSCellOption
): Partial<CSSCellInfo> {
  const rCell: ReturnType<typeof toCSSCell> = {};

  rCell.sheetName = cell.fullAddress.sheetName;
  rCell.row = cell.fullAddress.row;
  rCell.col = cell.fullAddress.col;
  rCell.type = valueTypeToString(cell.model.type);
  rCell.name = cell.name ? cell.name : cell.address;
  rCell.address = cell.model.address;
  rCell.width = width;
  rCell.height = height;
  rCell.style = {
    ...styleFontToCss(cell.style.font),
    ...styleFillToCss(cell.style.fill),
    ...(option?.defaultBorder
      ? { border: "1px solid rgba(0, 0, 0, 0.1)" }
      : {}),
    ...styleBorderToCss(cell.style.border),
  };
  rCell.text = cell.model.text;
  rCell.hyperlink = cell.model.hyperlink;

  rCell.value = cell.model.value;
  if (typeof rCell.value === "number" && hasDecimalPlace(rCell.value)) {
    if (cell.numFmt) {
      rCell.value = formatNumber(rCell.value, cell.numFmt);
    } else {
      if (option?.defaultNumFmt) {
        rCell.value = formatNumber(rCell.value, "0.00");
      }
    }
  }

  rCell.master = cell.model.master;
  rCell.formula = cell.model.formula;
  rCell.sharedFormula = cell.model.sharedFormula;
  rCell.result = cell.model.result;
  rCell.comment = cell.model.comment;

  return rCell;
}

function toRawCell(
  cell: ExcelJS.Cell,
  width: number,
  height: number,
  option?: CSSCellOption
): Partial<RawCellInfo> {
  const {
    effectiveType,
    isMerged,
    isHyperlink,
    hyperlink,
    text,
    fullAddress,
    model,
    name,
    names,
    dataValidation,
    value,
    note,
    formula,
    result,
    type,
    formulaType,
    style,
    ...rest
  } = cell;

  return {
    effectiveType,
    isMerged,
    isHyperlink,
    hyperlink,
    text,
    fullAddress,
    model,
    name,
    names,
    dataValidation,
    value,
    note,
    formula,
    result,
    type,
    formulaType,
    style,
    width,
    height,
  };
}

function hasDecimalPlace(num: number): boolean {
  return num % 1 !== 0;
}

function formatNumber(value: number, numFmt: string): string {
  // This function should be implemented to format the number based on numFmt
  // This is a simplified example for demonstration purposes
  const decimalPlaces = () => {
    const match = numFmt.match(/\.0+/g);
    return match ? match[0].length - 1 : 0;
  };

  return value.toFixed(decimalPlaces());
}

function excelWidthToPixels(excelWidth: number | undefined): number {
  if (excelWidth === undefined) return 0;
  // 일반적인 변환 공식
  const pixels = Math.round(excelWidth * 7 + 5);
  return pixels;
}

function excelHeightToPixels(excelHeight: number | undefined): number {
  if (excelHeight === undefined) return 0;
  // 1 포인트는 1.333 픽셀 (96/72)
  const pointsToPixels = 96 / 72;
  const pixels = excelHeight * pointsToPixels;
  return Math.round(pixels);
}

function valueTypeToString(type: ExcelJS.ValueType): string {
  switch (type) {
    case ExcelJS.ValueType.Null:
      return "Null";
    case ExcelJS.ValueType.Merge:
      return "Merge";
    case ExcelJS.ValueType.Number:
      return "Number";
    case ExcelJS.ValueType.String:
      return "String";
    case ExcelJS.ValueType.Date:
      return "Date";
    case ExcelJS.ValueType.Hyperlink:
      return "Hyperlink";
    case ExcelJS.ValueType.Formula:
      return "Formula";
    case ExcelJS.ValueType.SharedString:
      return "SharedString";
    case ExcelJS.ValueType.RichText:
      return "RichText";
    case ExcelJS.ValueType.Boolean:
      return "Boolean";
    case ExcelJS.ValueType.Error:
      return "Error";
    default:
      return "Unknown";
  }
}

function hexToRgba(hex: string | undefined): string {
  if (!hex) return "";

  if (hex.length !== 8) {
    console.error("Invalid hex string length. Expected 8 characters.");
  }

  const a = parseInt(hex.slice(0, 2), 16) / 255;
  const r = parseInt(hex.slice(2, 4), 16);
  const g = parseInt(hex.slice(4, 6), 16);
  const b = parseInt(hex.slice(6, 8), 16);

  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

function styleFontToCss(
  font: Partial<ExcelJS.Font> | undefined
): Partial<React.CSSProperties> {
  if (!font) return {};

  return {
    color: font.color ? hexToRgba(font.color.argb) || "inherit" : "inherit",
    fontWeight: font.bold ? "bold" : "normal",
    textAlign: "left",
    fontSize: `${(font.size || 12) * 1.5}px`,
    verticalAlign: font.vertAlign || "middle",
  };
}

function styleFillToCss(
  fill: ExcelJS.Fill | undefined
): Partial<React.CSSProperties> {
  let cssObj: any = {
    backgroundColor: "inherit",
  };

  if (!fill) return cssObj;

  // ref: ExcelJS.FillPattern
  if (fill.type === "pattern") {
    if (fill.pattern === "none") return cssObj;

    if (fill.pattern === "solid") {
      if (fill.fgColor) {
        cssObj.backgroundColor = hexToRgba(fill.fgColor.argb) || "inherit";
        return cssObj;
      }
    }

    console.error("!Unsupported fill pattern type:", fill.pattern);
  }

  console.error("!Unsupported fill type:", fill.type);
  return cssObj;
}

function styleBorderToCss(
  borders: Partial<ExcelJS.Borders> | undefined
): Partial<{
  borderTop: string;
  borderRight: string;
  borderBottom: string;
  borderLeft: string;
}> {
  // 색상 인덱스와 그에 해당하는 색상 코드 매핑
  const colorIndexToHex = (indexed: any | undefined): string | undefined => {
    if (indexed === undefined) return undefined;

    const num = Number(indexed);
    if (num === 64) return "black";

    return "#d9d9d9";
  };

  const cssObj: any = {};

  if (!borders) return cssObj;

  const toCssIndividual = (
    border: Partial<ExcelJS.Border> | undefined
  ): string => {
    let ss = "none";
    if (!border) return ss;

    switch (border.style) {
      case "thin": {
        ss = "1px solid";
        break;
      }
      case "dotted": {
        ss = "1px dotted";
        break;
      }
      case "hair": {
        ss = "1px solid";
        break;
      }
      case "medium": {
        ss = "2px solid";
        break;
      }
      case "double": {
        ss = "2px double";
        break;
      }
      case "thick": {
        ss = "3px solid";
        break;
      }
      case "dashed": {
        ss = "1px dashed";
        break;
      }
      case "dashDot": {
        ss = "1px dashed";
        break;
      }
      case "dashDotDot": {
        ss = "1px dashed";
        break;
      }
      case "slantDashDot": {
        ss = "1px dashed";
        break;
      }
      case "mediumDashed": {
        ss = "2px dashed";
        break;
      }
      case "mediumDashDotDot": {
        ss = "2px dashed";
        break;
      }
      case "mediumDashDot": {
        ss = "2px dashed";
        break;
      }
      default:
        break;
    }

    if (border.color) {
      if ("indexed" in border.color) {
        ss += ` ${colorIndexToHex(border.color.indexed)}`;
      }
    } else {
      ss += " blue";
    }

    return ss;
  };

  if ("top" in borders) cssObj.borderTop = `${toCssIndividual(borders.top)}`;
  if ("right" in borders)
    cssObj.borderRight = `${toCssIndividual(borders.right)}`;
  if ("bottom" in borders)
    cssObj.borderBottom = `${toCssIndividual(borders.bottom)}`;
  if ("left" in borders) cssObj.borderLeft = `${toCssIndividual(borders.left)}`;

  return cssObj;
}
