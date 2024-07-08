import { atom } from 'recoil';
import { type Schema } from '@midasit-dev/playground';

export const CurrentMenuState = atom<'Home' | 'Playground'>({
	key: 'CurrentMenuState',
	default: 'Home',
});

export const AppSchemaStateForImport = atom<Schema>({
	key: 'AppSchemaStateForImport',
	default: {},
});

export const AppSchemaStateForExport = atom<Schema>({
	key: 'AppSchemaStateForExport',
	default: {},
});
