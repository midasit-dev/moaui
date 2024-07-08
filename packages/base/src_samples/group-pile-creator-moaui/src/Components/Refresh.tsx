import React from "react";
import { Button } from "@midasit-dev/moaui";
import { useSetRecoilState } from "recoil";
import {
	VarGrupID,
	VarBngrID,
	VarPileMatlID,
	VarPileSectID,
	VarCapMatlID,
	VarCapSectID,
  VarGrupIDList,
  VarBngrIDList,
  VarPileMatlIDList,
  VarPileSectIDList,
  VarCapMatlIDList,
  VarCapSectIDList,
} from "./variables";

import { useSnackbar } from "notistack";
import { dbRead } from "../pyscript_utils";

const CompRefresh = () => {
	const { enqueueSnackbar } = useSnackbar();

	//Setter select of DropList
	const setGrupID = useSetRecoilState(VarGrupID);
	const setBngrID = useSetRecoilState(VarBngrID);
	const setPileMatlID = useSetRecoilState(VarPileMatlID);
	const setPileSectID = useSetRecoilState(VarPileSectID);
	const setCapMatlID = useSetRecoilState(VarCapMatlID);
	const setCapSectID = useSetRecoilState(VarCapSectID);

	//Setter list of DropList
  const setGrupIDList = useSetRecoilState(VarGrupIDList);
  const setBngrIDList = useSetRecoilState(VarBngrIDList);
  const setPileMatlIDList = useSetRecoilState(VarPileMatlIDList);
  const setPileSectIDList = useSetRecoilState(VarPileSectIDList);
  const setCapMatlIDList = useSetRecoilState(VarCapMatlIDList);
  const setCapSectIDList = useSetRecoilState(VarCapSectIDList);

  const updateDB = React.useCallback(() => {
		const bundles = [
			{ dbName: "GRUP", findKey: "NAME", setState: setGrupID, setList: setGrupIDList },
			{ dbName: "BNGR", findKey: "NAME", setState: setBngrID, setList: setBngrIDList },
			{ dbName: "MATL", findKey: "NAME", setState: setPileMatlID, setList: setPileMatlIDList },
			{ dbName: "SECT", findKey: "SECT_NAME", setState: setPileSectID, setList: setPileSectIDList },
			{ dbName: "MATL", findKey: "NAME", setState: setCapMatlID, setList: setCapMatlIDList },
			{ dbName: "SECT", findKey: "SECT_NAME", setState: setCapSectID, setList: setCapSectIDList },
		];

		for (const bundle of bundles) {
			const dbData: { [key: number | string]: any; } = dbRead(bundle.dbName);
			if (dbData.hasOwnProperty("error")) {
				enqueueSnackbar(dbData["error"], { variant: "error" });
				bundle.setList([['NONE', 0]]);
				continue;
			}

			let arr: [string, number][] = [];
			for (const [key, value] of Object.entries(dbData)) {
				arr.push([`${key}: ${value[bundle.findKey]}`, +key]);
			}

			bundle.setList(arr);

			if (arr.length !== 0) {
				bundle.setState(arr[0][1]);
			}
		}

		enqueueSnackbar("The Group Pile Options is updated.", { variant: "success", autoHideDuration: 1500 });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

  React.useEffect(() => {
    updateDB();
  }, [updateDB]);

  return <Button onClick={updateDB}>Refresh</Button>;
};

export default CompRefresh;
