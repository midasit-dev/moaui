import * as ExcelJS from 'exceljs';

export default function toCssObj(fill: ExcelJS.Fill | undefined): Partial<{
	backgroundColor: string;
}> {
	let cssObj: any = {
		backgroundColor: 'inherit',
	};

	if (!fill) return cssObj;

	// ref: ExcelJS.FillPattern
	if (fill.type === 'pattern') {
		if (fill.pattern === 'none') return cssObj;

		if (fill.pattern === 'solid') {
			if (fill.fgColor) {
				cssObj.backgroundColor = hexToRgba(fill.fgColor.argb) || 'inherit';
				return cssObj;
			}
		}
		
		console.error('!Unsupported fill pattern type:', fill.pattern);
	}

	console.error('!Unsupported fill type:', fill.type);
	return cssObj;
}

/**
 * Converts a hex string (ARGB format) to RGBA format.
 * @param hex - Hex string in the format AARRGGBB (e.g., FF00FF00)
 * @returns RGBA color string
 */
function hexToRgba(hex: string | undefined): string {
	if (!hex) return '';

	if (hex.length !== 8) {
			console.error("Invalid hex string length. Expected 8 characters.");
	}
	
	const a = parseInt(hex.slice(0, 2), 16) / 255;
	const r = parseInt(hex.slice(2, 4), 16);
	const g = parseInt(hex.slice(4, 6), 16);
	const b = parseInt(hex.slice(6, 8), 16);

	return `rgba(${r}, ${g}, ${b}, ${a})`;
}