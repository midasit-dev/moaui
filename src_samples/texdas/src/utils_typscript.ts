/**
 * 
 * ██╗   ██╗████████╗██╗██╗      ██████╗      ██╗████████╗███████╗██╗ 
 * ██║   ██║╚══██╔══╝██║██║      ╚════██╗    ██╔╝╚══██╔══╝██╔════╝╚██╗
 * ██║   ██║   ██║   ██║██║█████╗ █████╔╝    ██║    ██║   ███████╗ ██║
 * ██║   ██║   ██║   ██║██║╚════╝██╔═══╝     ██║    ██║   ╚════██║ ██║
 * ╚██████╔╝   ██║   ██║███████╗ ███████╗    ╚██╗   ██║   ███████║██╔╝
 *  ╚═════╝    ╚═╝   ╚═╝╚══════╝ ╚══════╝     ╚═╝   ╚═╝   ╚══════╝╚═╝ 
 * 
 * @description utils in typscript
 */

// example) 1: NAME
export const idItemString = (value: any, index: number) => {
	return `${value.ids[index]}: ${value.items[index]}`;
}

// example) "1: NAME" -> 1 (number)
export const parseId = (idItemStr: string) => {
	return parseInt(idItemStr.split(':')[0]);
}

export function isLargerThanZero(value: string) {
	const val = parseFloat(value);
	return val > 0;
}

export function isInteger(value: string) {
	return Number.isInteger(+value);
}

export function isFloat(value: string) {
	const val = parseFloat(value);
	return typeof val === 'number' && !Number.isNaN(val);
}

export function isBetween1And1000000(value: string) {
	const val = parseFloat(value);
	return val >= 1 && val <= 1000000;
}

export const deletePyscriptTerminalTag = () => {
	// Get all elements with the py-terminal tag
	const pyTerminals = document.querySelectorAll('py-terminal');

	// Remove all py-terminal elements
	pyTerminals.forEach(pyTerminal => {
		pyTerminal.remove();
	});
}
