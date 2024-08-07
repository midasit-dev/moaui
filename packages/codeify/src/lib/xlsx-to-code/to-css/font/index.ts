import * as ExcelJS from 'exceljs';

const fontScale = 1.5;

export default function toCssObj(font: Partial<ExcelJS.Font> | undefined): Partial<{
	color: string;
	fontWeight: string;
	textAlign: string;
	fontSize: string;
	verticalAlign: string;
}> {
	const cssObj: any = {};

	if (!font) return cssObj;

	//font to css
	if ('name' in font) cssObj.fontFamily = `${font.name}`;
	if ('size' in font) cssObj.fontSize = `${(font.size || 12) * fontScale}px`;
	if ('bold' in font) cssObj.fontWeight = font.bold ? 'bold' : 'normal';
	if ('color' in font) cssObj.color = hexToRgba(font.color?.argb) || 'inherit';
	if ('vertAlign' in font) cssObj.verticalAlign = font.vertAlign || 'middle';

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

// color: styles[rowIndex]?.[cellIndex]?.font?.color || "inherit",
// fontWeight: styles[rowIndex]?.[cellIndex]?.font?.bold ? "bold" : "normal",
// textAlign: styles[rowIndex]?.[cellIndex]?.alignment?.horizontal || "left",
// fontSize: styles[rowIndex]?.[cellIndex]?.font?.size ? `${(styles[rowIndex]?.[cellIndex]?.font?.size || 12) * 1.5}px` : "inherit",
// verticalAlign: styles[rowIndex]?.[cellIndex]?.alignment?.vertical || "middle",