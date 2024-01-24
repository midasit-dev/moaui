import { isDevServerListening } from "./ServerListening";

export const IsDevEnv = () => {
	const b1 = process.env.NODE_ENV === 'development';
	const b2 = isDevServerListening();

	return b1 && b2;
};

const Utils = {
	isDevServerListening,
	IsDevEnv,
};

export default Utils;