import { useCallback } from "react";
import { checkPyScriptReady } from "./utils_pyscript";

const usePython = () => {
	const insert = useCallback((componentId: string, value: string) => {
		const element = document.getElementById(componentId) as HTMLInputElement;
		if (element) {
			element.innerHTML = value;
		} else {
			console.error(`Element ${componentId} not found`);
		}
	}, []);

	const get = useCallback((componentId: string): string | null => {
		const element = document.getElementById(componentId) as HTMLInputElement;
		if (element) {
			return element.getAttribute('data-current-value');
		} else {
			console.error(`Element ${componentId} not found`);
			return null;
		}
	}, []);

	const doPyMain = useCallback((funcName: string, ...args: any[]) => {
		let valid = true;
		for (let i = 0; i < args.length; i++) {
			if (args[i] === null) valid = false;
		}

		if (!valid) {
			console.error(`Invalid arguments`);
			return null;
		} else {
			return checkPyScriptReady(() => {
				const func = pyscript.interpreter.globals.get(funcName);
				if (func) {
					return func(...args);
				}
			});
		}
	}, []);

	return { insert, get, doPyMain };
}

export {
	usePython
}