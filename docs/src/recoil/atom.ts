import { atom } from 'recoil';

export const selectedMenu = atom<string>({
	key: 'selectedMenu',
	default: 'Installation',
});