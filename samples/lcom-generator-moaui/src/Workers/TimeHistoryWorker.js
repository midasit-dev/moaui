import { hasError, loadData, isDemo } from "../utils";
import { DBVARIANT } from "./dictionary";

export const DataLoader = async () => {
	const DBNAME = DBVARIANT.TIME_HISTORY;
	const rawData = isDemo()
		? {
				THIS: {
					1: {
						COMMON: {
							NAME: "Time History 1",
						},
					},
					2: {
						COMMON: {
							NAME: "Time History 2",
						},
					},
				},
		  }
		: await loadData(DBVARIANT.PATH + DBNAME);
	if (hasError(rawData)) return [];
	if (rawData[DBNAME] === undefined) return [];

	let registeredNames = [];
	const dbData = rawData[DBNAME];
	for (const value in dbData) {
		const targetData = dbData[value]["COMMON"];
		registeredNames.push(targetData.NAME);
	}

	return registeredNames;
};
