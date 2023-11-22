import { loadData, hasError, isDemo } from "../utils";
import { DBVARIANT } from "./dictionary";

export const DataLoader = async () => {
	const DBNAME = DBVARIANT.CONSTRUCTION_STAGE;
	const DBCODE = DBVARIANT.CONSTRUCTION_STAGE_CHECK;

	const checkPathResult = await loadData(DBVARIANT.PATH + DBCODE);
	if (hasError(checkPathResult)) return [];

	const rawData = isDemo()
		? {
				STCT: {
					1: {
						vEREC: [],
					},
				},
		  }
		: await loadData(DBVARIANT.PATH + DBNAME);
	if (hasError(rawData)) return [];

	const registeredNames = [];
	registeredNames.push("Dead Load");

	try {
		const vEREC = rawData[1]["vEREC"];
		registeredNames.push(...vEREC.map((value) => value.LTYPECC));
	} catch (_) {}

	registeredNames.push("Tendon Primary");
	registeredNames.push("Tendon Secondary");
	registeredNames.push("Creep Primary");
	registeredNames.push("Creep Secondary");
	registeredNames.push("Shrinkage Primary");
	registeredNames.push("Shrinkage Secondary");
	registeredNames.push("Summation");
	return registeredNames;
};
