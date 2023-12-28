// example) 1: NAME
export const idItemString = (value: any, index: number) => {
	return `${value.ids[index]}: ${value.items[index]}`;
}

// example) "1: NAME" -> 1 (number)
export const parseId = (idItemStr: string) => {
	return parseInt(idItemStr.split(':')[0]);
}