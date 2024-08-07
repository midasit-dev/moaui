import * as ExcelJS from 'exceljs';

export default function toCssObj(borders: Partial<ExcelJS.Borders> | undefined): Partial<{
	borderTop: string;
	borderRight: string;
	borderBottom: string;
	borderLeft: string;
}> {
	const cssObj: any = {};

	if (!borders) return cssObj;

	const toCssIndividual = (border: Partial<ExcelJS.Border> | undefined): string => {
		let ss = 'none';
		if (!border) return ss;

		switch (border.style) {
			case 'thin'            : { ss = '1px solid'; } break;
			case 'dotted'          : { ss = '1px dotted'; } break;
			case 'hair'            : { ss = '1px solid'; } break;
			case 'medium'          : { ss = '2px solid'; } break;
			case 'double'          : { ss = '2px double'; } break;
			case 'thick'           : { ss = '3px solid'; } break;
			case 'dashed'          : { ss = '1px dashed'; } break;
			case 'dashDot'         : { ss = '1px dashed'; } break;
			case 'dashDotDot'      : { ss = '1px dashed'; } break;
			case 'slantDashDot'    : { ss = '1px dashed'; } break;
			case 'mediumDashed'    : { ss = '2px dashed'; } break;
			case 'mediumDashDotDot': { ss = '2px dashed'; } break;
			case 'mediumDashDot'   : { ss = '2px dashed'; } break;
			default: break;
		}

		if (border.color) {
			if ('indexed' in border.color) {
				ss += ` ${colorIndexToHex(border.color.indexed)}`;
			}
		} else {
			ss += ' blue';
		}

		return ss;
	};

	if ('top' in borders) cssObj.borderTop = `${toCssIndividual(borders.top)}`;
	if ('right' in borders) cssObj.borderRight = `${toCssIndividual(borders.right)}`;
	if ('bottom' in borders) cssObj.borderBottom = `${toCssIndividual(borders.bottom)}`;
	if ('left' in borders) cssObj.borderLeft = `${toCssIndividual(borders.left)}`;

	return cssObj;
}

// 색상 인덱스와 그에 해당하는 색상 코드 매핑
const colorIndexToHex = (indexed: any | undefined): string | undefined => {
	if (indexed === undefined) return undefined;

	const num = Number(indexed);
	if (num === 64) return 'black';

	return '#d9d9d9';
};