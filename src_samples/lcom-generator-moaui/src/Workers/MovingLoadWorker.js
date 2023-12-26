import { loadData, hasError, isDemo } from "../utils";
import { DBVARIANT } from "./dictionary";

const NationalDefinitions = {
	TRANS: "TR",
	EUROCODE: "EU",
	CHINA: "CH",
	INDIA: "ID",
	JAPAN: "JP",
	POLAND: "PL",
	BS: "BS",
};

export const DataLoader = async () => {
	const DBNAME = DBVARIANT.MOVING_LOAD;
	const DBCODE = DBVARIANT.MOVING_LOAD_VARIANT;

	const natlCodeData = isDemo()
		? {
				MVCD: {
					1: {
						CODE: "EUROCODE",
					},
				},
		  }
		: await loadData(DBVARIANT.PATH + DBCODE);
	if (hasError(natlCodeData)) return [];

	const natlCode = natlCodeData[DBCODE][1]["CODE"];

	let natlCodePostFix = "";
	if (NationalDefinitions[natlCode] !== undefined)
		natlCodePostFix = NationalDefinitions[natlCode];

	const rawData = isDemo()
		? {
				MVLD: {
					1: {
						LCNAME: "Moving Load 1",
					},
					2: {
						LCNAME: "Moving Load 2",
					},
					3: {
						LCNAME: "Moving Load 3",
					},
				},
		  }
		: await loadData(DBVARIANT.PATH + DBNAME + natlCodePostFix);
	if (hasError(rawData)) return [];
	if (rawData[DBNAME] === undefined) return [];

	let registeredNames = [];
	const dbData = rawData[DBNAME];
	for (const value in dbData) {
		const targetData = dbData[value];
		registeredNames.push(targetData.LCNAME);
	}

	return registeredNames;
};
