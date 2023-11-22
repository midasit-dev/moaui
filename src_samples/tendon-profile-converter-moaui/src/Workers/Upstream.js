/* global pyscript */
import React from "react";
import { loadData, sendData } from "../utils";
import { useSnackbar } from "notistack";

export function useUpstream() {
	const { enqueueSnackbar } = useSnackbar();
	const updateData = React.useCallback(async (selected) => {
		try {
			await updateDataIntoProduct(selected);
			enqueueSnackbar("Successfully updated to product")
		} catch (error) {
			enqueueSnackbar(error, { variant: "error" });
		}
	}, [enqueueSnackbar]);

	const makeData = React.useCallback(async (selected) => {
		try {
			const handleFail = (message) => {
				enqueueSnackbar(message, { variant: "error" });
			};

			const handleSuccess = () => {};

			const successCount = await makeDataIntoProduct(selected, handleSuccess, handleFail);
			enqueueSnackbar(`${successCount}/${Object.keys(selected).length} items Successfully added to product`, { variant: "success" });
		} catch (error) {
			enqueueSnackbar(error, { variant: "error" });
		}
	}, [enqueueSnackbar]);

	return { updateData, makeData };
}

export const updateDataIntoProduct = async (selected, success = () => {}, fail = () => {}) => {
	try {
		const values = await makeMandatoryData(selected);
		const argument = {
			"Assign": {
				...values,
			}
		}

		await sendData("/db/tdna", JSON.stringify(argument), "PUT");
	} catch (error) {
		fail(error);
		console.debug(error);
	}
};

export const makeDataIntoProduct = async (selected, success = () => {}, fail = () => {}) => {
	let successCount = 0;
	try {
		let values = await makeMandatoryData(selected, fail);
		const rawTdnaData = (await loadData("/db/tdna"))["TDNA"];

		let lastKey = 0;
		for (const key of Object.keys(rawTdnaData)) {
			if (Number(lastKey) < Number(key)) lastKey = Number(key);
		}

		let argument = {
			"Assign": {},
		}
		for (let value of Object.values(values)) {
			let newName = value["NAME"];
			
			try {
				if (newName.length + "str".length > 20) {
					console.debug("name is too long");
					fail(`${newName} is too long. (max 20)`);
					continue;
				}
				value["NAME"] = newName + "_str";
				argument["Assign"][++lastKey] = value;
			} catch { continue; }

			successCount++;
		}

		await sendData("/db/tdna", JSON.stringify(argument), "PUT");
	} catch (error) {
		console.debug(error);
	}
	return successCount;
};

const makeMandatoryData = async(tdnaObject, fail = () => {}) => {
	const nodeData = await loadData("/db/node");
	const elemData = await loadData("/db/elem");

	if (!nodeData || !elemData) throw new Error("No suitable data found");

	try {
		const pymain = pyscript.interpreter.globals.get("proc");
		let retValue = {};

		for (const [key, value] of Object.entries(tdnaObject)) {
			const rawResult = pymain(JSON.stringify(value), JSON.stringify(nodeData), JSON.stringify(elemData));
			try {
				retValue[key] = JSON.parse(rawResult);
			} catch(err) {
				console.debug(err);
				fail(`failed to process ${key}`);
				continue;
			}
		}

		return retValue;
	} catch (error) {
		console.debug(error);
		return {};
	};
};