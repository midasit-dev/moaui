import { atom } from 'recoil';
import { ItemTypes } from '../Components/ItemTypes';

export const TemplateWidth = atom<string>({
	key: 'TemplateWidth',
	default: "",
});

export const TemplateHeight = atom<string>({
	key: 'TemplateHeight',
	default: "",
});

export const RowCount = atom<number>({
	key: 'RowCount',
	default: 0,
});

export const ColumnCount = atom<number>({
	key: 'ColumnCount',
	default: 0,
});

// version 1
export const CodeString = atom<any>({
	key: 'CodeString',
	default: [],
});

// version 2
export const LayoutsInfo = atom<any>({
	key: 'LayoutsInfo',
	default: [],
});