import { loadData, hasError, isDemo } from "../utils";
import { DBVARIANT } from "./dictionary";

export const DataLoader = async () => {
	const DBNAME = DBVARIANT.RESPONSE_SPECTRUM;
    const rawData = isDemo()
			? {
					SPLC: {
						1: {
							NAME: "Response Spectrum 1",
						},
						2: {
							NAME: "Response Spectrum 2",
						},
						3: {
							NAME: "Response Spectrum 3",
						},
					},
			  }
			: await loadData(DBVARIANT.PATH + DBNAME);
    if (hasError(rawData)) return [];
    if (rawData[DBNAME] === undefined) return [];
    
    let registeredNames = [];
    const dbData = rawData[DBNAME];
    registeredNames = Object.keys(dbData).map((value) => (dbData[value].NAME));
    return registeredNames;
}
