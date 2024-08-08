import * as ExcelJS from 'exceljs';

interface JsonCellInfo {
	name: string;
	fullAddress: {
		sheetName: string;
		address: string;
		row: number;
		col: number;
	};
	width: number;
	height: number;
	address: ExcelJS.Address;
	style: ExcelJS.Style;
	type: ExcelJS.ValueType;
	text?: string;
	hyperlink?: string;
	value?: ExcelJS.CellValue;
	master: string;
	formula?: string;
	sharedFormula?: string;
	result?: string | number | any;
	comment: ExcelJS.Comment;
}

export interface JsonCells {
	[name: string]: Partial<JsonCellInfo>;
}

export async function toJson(excelBuffer: ArrayBuffer): Promise<Partial<JsonCells>> {
	const workbook = new ExcelJS.Workbook();
	await workbook.xlsx.load(excelBuffer);

	//우선 첫번째 시트부터 조져보자
	const worksheet = workbook.worksheets[0];

	let jsonCells: JsonCells = {};

	worksheet.eachRow({ includeEmpty: true }, (row: ExcelJS.Row, rowNumber: number) => {
		const rowHeight = excelHeightToPixels(row.height ?? 17);

		row.eachCell({ includeEmpty: true }, (cell: ExcelJS.Cell, colNumber: number) => {
			let jsonCellInfo: Partial<JsonCellInfo> = {};

			const colWidth = excelWidthToPixels(worksheet.getColumn(colNumber).width ?? 8.08);

			jsonCellInfo.name = cell.name ? cell.name : cell.address;
			jsonCellInfo.fullAddress = cell.fullAddress;
			jsonCellInfo.width = colWidth;
			jsonCellInfo.height = rowHeight;
			jsonCellInfo.address = cell.model.address;
			jsonCellInfo.style = cell.model.style;
			jsonCellInfo.type = cell.model.type;
			jsonCellInfo.text = cell.model.text;
			jsonCellInfo.hyperlink = cell.model.hyperlink;
			jsonCellInfo.value = cell.model.value;
			jsonCellInfo.master = cell.model.master;
			jsonCellInfo.formula = cell.model.formula;
			jsonCellInfo.sharedFormula = cell.model.sharedFormula;
			jsonCellInfo.result = cell.model.result;
			jsonCellInfo.comment = cell.model.comment;

			jsonCells[jsonCellInfo.name] = jsonCellInfo;
		});
	});

	return jsonCells;
}

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
