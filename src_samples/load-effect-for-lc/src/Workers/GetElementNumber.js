// GetElementNumber.js

import { loadData, hasError, isDemo } from "../utils";
import { DBVIEWSELECT } from "./dictionary";

export const GetElementNumbers = async () => {
  const DBNAME = DBVIEWSELECT.PATH;
  const rawData = isDemo()
    ? {
        SELECT: {
          NODE_LIST: [],
          ELEM_LIST: [30],
        },
      }
    : await loadData(DBNAME);
  
  if (hasError(rawData)) return [];
  if (rawData.SELECT === undefined) return [];
  
  return rawData.SELECT.ELEM_LIST || [];
};


//   {
//     "SELECT": {
//       "NODE_LIST": [],
//       "ELEM_LIST": [
//           30
//       ]
//   }
// }