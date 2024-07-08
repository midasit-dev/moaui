import { atom } from 'recoil';

export const IsActivatedPyscript = atom<boolean>({
	key: 'IsActivatedPyscript',
	default: true,
});