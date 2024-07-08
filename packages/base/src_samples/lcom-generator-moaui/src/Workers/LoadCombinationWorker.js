import { loadData, hasError, isDemo } from "../utils";
import { DBVARIANT } from "./dictionary";

export const DataLoader = async ({user}) => {
	const DBNAME = DBVARIANT.LOAD_COMBINATION;
    const rawData = isDemo()
			? {
					"LCOM-GEN": {
						1: {
							NAME: "cLCB1",
							KIND: "GEN",
							ACTIVE: "ACTIVE",
							bES: false,
							bCB: false,
							iTYPE: 0,
							DESC: "Load Combination 1",
							iSERV_TYPE: 0,
							nLCOMTYPE: 0,
							nSEISTYPE: 0,
							vCOMB: [
								{
									ANAL: "ST",
									LCNAME: "USER",
									FACTOR: 1.4,
								},
							],
						},
						2: {
							NAME: "cLCB2",
							KIND: "GEN",
							ACTIVE: "INACTIVE",
							bES: false,
							bCB: false,
							iTYPE: 0,
							DESC: "Load Combination 2",
							iSERV_TYPE: 0,
							nLCOMTYPE: 0,
							nSEISTYPE: 0,
							vCOMB: [
								{
									ANAL: "ST",
									LCNAME: "USER",
									FACTOR: 1,
								},
							],
						},
					},
			  }
			: await loadData(DBVARIANT.PATH + DBNAME);
    if (hasError(rawData)) return [];
    if (rawData[DBNAME] === undefined) return [];
    
    let registeredItems = [];
    const dbData = rawData[DBNAME];

    for (const value in dbData) {
		const targetData = dbData[value];
        const findResult = user.findIndex((value) => (value.NAME === targetData.NAME));
        if (findResult === -1)
			registeredItems.push(targetData);
		else if (!user[findResult].markAsRemoved)
			registeredItems.push(user[findResult]);
	}

    return registeredItems.map((value) => (value.NAME));
};

DataLoader.defaultProps = {user: []};

export const DataRawLoader = async ({user}) => {
	const DBNAME = DBVARIANT.LOAD_COMBINATION;
    const rawData = isDemo()
			? {
					'LCOM-GEN': {
						1: {
							NAME: "cLCB1",
							KIND: "GEN",
							ACTIVE: "ACTIVE",
							bES: false,
							bCB: false,
							iTYPE: 0,
							DESC: "Load Combination 1",
							iSERV_TYPE: 0,
							nLCOMTYPE: 0,
							nSEISTYPE: 0,
							vCOMB: [
								{
									ANAL: "ST",
									LCNAME: "USER",
									FACTOR: 1.4,
								},
							],
						},
						2: {
							NAME: "cLCB2",
							KIND: "GEN",
							ACTIVE: "INACTIVE",
							bES: false,
							bCB: false,
							iTYPE: 0,
							DESC: "Load Combination 2",
							iSERV_TYPE: 0,
							nLCOMTYPE: 0,
							nSEISTYPE: 0,
							vCOMB: [
								{
									ANAL: "ST",
									LCNAME: "USER",
									FACTOR: 1,
								},
							],
						},
					},
			  }
			: await loadData(DBVARIANT.PATH + DBNAME);
    if (hasError(rawData)) return [];
    if (rawData[DBNAME] === undefined) return [];
    
    let registeredItems = [];
    const dbData = rawData[DBNAME];

    for (const value in dbData) {
        const targetData = dbData[value];
        registeredItems.push({key: value, ...targetData, isPending: true});
    }

    if (user.length > 0) {
        for (const value of user) {
            const findResult = registeredItems.findIndex((registeredItem) => (registeredItem.key === value.key));
			if (findResult === -1) {
				if (value.markAsRemoved) continue;
				else registeredItems.push(value);
			} else {
				if (value.markAsRemoved) registeredItems.splice(findResult, 1);
				else registeredItems[findResult] = value;
			}
        }
    }
    
    return registeredItems;
};

DataRawLoader.defaultProps = {user: []};