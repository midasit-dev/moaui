import { atom } from 'recoil';

export const TemplateWidth = atom<string>({
	key: 'TemplateWidth',
	default: "",
});

export const TemplateHeight = atom<string>({
	key: 'TemplateHeight',
	default: "",
});

export const CodeString = atom<any>({
	key: 'CodeString',
	default: [[],[],[],[]],
});