import { loadData, hasError, isDemo } from "../utils";
import { DBVARIANT } from "./dictionary";

export const DataLoader = async () => {
	const DBNAME = DBVARIANT.SETTLEMENT;
	const rawData = isDemo()
		? {
				SMLC: {
					1: {
						NAME: "Settlement Load 1",
					},
					2: {
						NAME: "Settlement Load 2",
					},
				},
		  }
		: await loadData(DBVARIANT.PATH + DBNAME);
	if (hasError(rawData)) return [];
	if (rawData[DBNAME] === undefined) return [];

	let registeredNames = [];
	const dbData = rawData[DBNAME];
	registeredNames = Object.keys(dbData).map((value) => dbData[value].NAME);
	return registeredNames;
};
