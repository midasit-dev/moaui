import { loadData, hasError, isDemo } from "../utils";
import { DBVARIANT } from "./dictionary";

export const DataLoader = async () => {
	const DBNAME = DBVARIANT.STATIC_LOAD;
	const rawData = isDemo()
		? {
				STLD: {
					1: {
						NAME: "Dead Load",
					},
					2: {
						NAME: "Live Load",
					},
					3: {
						NAME: "Wind Load",
					},
					4: {
						NAME: "Seismic Load",
					},
					5: {
						NAME: "Temperature Load",
					},
					6: {
						NAME: "Shrinkage Load",
					},
					7: {
						NAME: "Creep Load",
					},
					8: {
						NAME: "Tendon Load",
					},
				},
		  }
		: await loadData(DBVARIANT.PATH + DBNAME);
	if (hasError(rawData)) return [];
	if (rawData[DBNAME] === undefined) return [];

	let registeredNames = [];
	const dbData = rawData[DBNAME];
	for (const value in dbData) {
		const targetData = dbData[value];
		if (targetData.TYPE !== "CS") registeredNames.push(targetData.NAME);
	}

	return registeredNames;
};
