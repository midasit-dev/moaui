import React from "react";
import { Button } from "@midasit-dev/moaui";
import { useSetRecoilState } from "recoil";
import {
	VarGrupID,
	VarBngrID,
	VarColumnSectID,
	VarColumnMatlID,
	VarCapBotSectID,
	VarCapBotMatlID,
	VarCapTopSectID,
	VarCapTopMatlID,
  VarGrupIDList,
  VarBngrIDList,
	VarColumnSectIDList,
	VarColumnMatlIDList,
	VarCapBotSectIDList,
	VarCapBotMatlIDList,
	VarCapTopSectIDList,
	VarCapTopMatlIDList,
} from "./variables";

import { useSnackbar } from "notistack";
import { dbRead } from "../pyscript_utils";

const CompRefresh = () => {
	const { enqueueSnackbar } = useSnackbar();

	//Setter select of DropList
	const setGrupID = useSetRecoilState(VarGrupID);
	const setBngrID = useSetRecoilState(VarBngrID);
	const setColumnSectID = useSetRecoilState(VarColumnSectID);
	const setColumnMatlID = useSetRecoilState(VarColumnMatlID);
	const setCapBotSectID = useSetRecoilState(VarCapBotSectID);
	const setCapBotMatlID = useSetRecoilState(VarCapBotMatlID);
	const setCapTopSectID = useSetRecoilState(VarCapTopSectID);
	const setCapTopMatlID = useSetRecoilState(VarCapTopMatlID);

	//Setter list of DropList
  const setGrupIDList = useSetRecoilState(VarGrupIDList);
  const setBngrIDList = useSetRecoilState(VarBngrIDList);
	const setColumnSectIDList = useSetRecoilState(VarColumnSectIDList);
	const setColumnMatlIDList = useSetRecoilState(VarColumnMatlIDList);
	const setCapBotSectIDList = useSetRecoilState(VarCapBotSectIDList);
	const setCapBotMatlIDList = useSetRecoilState(VarCapBotMatlIDList);
	const setCapTopSectIDList = useSetRecoilState(VarCapTopSectIDList);
	const setCapTopMatlIDList = useSetRecoilState(VarCapTopMatlIDList);

	const [loading, setLoading] = React.useState(false);

  const updateDB = React.useCallback(() => {
		const bundles = [
			{ dbName: "GRUP", findKey: "NAME", setState: setGrupID, setList: setGrupIDList },
			{ dbName: "BNGR", findKey: "NAME", setState: setBngrID, setList: setBngrIDList },
			{ dbName: "SECT", findKey: "SECT_NAME", setState: setColumnSectID, setList: setColumnSectIDList },
			{ dbName: "MATL", findKey: "NAME", setState: setColumnMatlID, setList: setColumnMatlIDList },
			{ dbName: "SECT", findKey: "SECT_NAME", setState: setCapBotSectID, setList: setCapBotSectIDList },
			{ dbName: "MATL", findKey: "NAME", setState: setCapBotMatlID, setList: setCapBotMatlIDList },
			{ dbName: "SECT", findKey: "SECT_NAME", setState: setCapTopSectID, setList: setCapTopSectIDList },
			{ dbName: "MATL", findKey: "NAME", setState: setCapTopMatlID, setList: setCapTopMatlIDList },
		];

		for (const bundle of bundles) {
			const dbData: { [key: number | string]: any; } = dbRead(bundle.dbName);
			if (dbData.hasOwnProperty("error")) {
				enqueueSnackbar(dbData["error"], { variant: "error" });
				bundle.setList([['NONE', 0]]);
				bundle.setState(0);
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

		enqueueSnackbar("The Pier Options is updated.", { variant: "success" });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

  React.useEffect(() => {
    updateDB();
  }, [updateDB]);

  return <Button 
		onClick={() => {
			setLoading(true);

			setTimeout(() => {
				updateDB();
				setLoading(false);
			}, 500);
		}}
		loading={loading}
	>
		Refresh
	</Button>;
};

export default CompRefresh;
