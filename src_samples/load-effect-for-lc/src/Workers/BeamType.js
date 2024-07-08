import { loadData, hasError, isDemo } from "../utils";
// import { DBVARIANT } from "./dictionary";
const DBVARIANT = {
  PATH: "/db/",
  ELEM: "elem"
};

export const BeamType = async () => {
  const DBNAME = DBVARIANT.ELEM;
  const rawData = isDemo()
    ? {
        "ELEM": {
          "1": { // "1" is element number
            "TYPE": "BEAM",  // "BEAM" is element type
            "MATL": 1,
            "SECT": 1,
            "NODE": [
              1,
              2,
              0,
              0,
              0,
              0,
              0,
              0
            ],
            "ANGLE": 0,
            "STYPE": 0
          }
        }
      }
    : await loadData(DBVARIANT.PATH + DBNAME); // DBVARIANT.PATH = /db/, DBNAME = elem
  
  if (hasError(rawData)) return [];

  const elements = rawData.ELEM;
  const beamTypes = [];

  for (const key in elements) {
    if (elements[key].TYPE === "BEAM") {
      beamTypes.push(Number(key)); // Return element number instead of type
    }
  }
  return beamTypes; // Return element numbers that are of type "BEAM"
};
