import React from 'react';
import m from '@midasit-dev/moaui';
import HelpButton from './Help';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { motion, AnimatePresence } from 'framer-motion';

const queryClient = new QueryClient();
const WrappingReactQuery = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<App />
		</QueryClientProvider>
	)
}

export default WrappingReactQuery;

const fetchData = async () => {
	const url = await m.VerifyUtil.getBaseUrlAsync();
	const endpoint = url + '/view/select';
	const mapiKey = m.VerifyUtil.getMapiKey();
	const headers = {
		'Content-Type': 'application/json',
		'MAPI-KEY': mapiKey
	}

	const resGet = await fetch(endpoint, { method: 'GET', headers });
	if (resGet.ok) {
		const data = await resGet.json();
		return data;
	} else {
		console.error('error', resGet.statusText);
	}
}

const App = () => {
	const { data, refetch } = useQuery('getSelect', fetchData, {
    enabled: false,  // 컴포넌트가 마운트될 때 자동으로 실행되지 않도록 설정
  });

	const [selectedElems, setSelectedElems] = React.useState<string>('');
	const [selElemCounts, setSelElemCounts] = React.useState<number>(0);
	const [rows, setRows] = React.useState<any[]>([]);
	const [units, setUnits] = React.useState<string>('');
	const [singleRow, setSingleRow] = React.useState<any[][]>([]);
	const [openDetail, setOpenDetail] = React.useState<boolean>(false);
	const [loading, setLoading] = React.useState<boolean>(false);

	// 페이지가 focus 되었을 때 refetch 실행
	React.useEffect(() => {
		const handleFocus = () => refetch();
		window.addEventListener('focus', handleFocus);
		return () => {
			window.removeEventListener('focus', handleFocus);
		};
	}, [refetch]);

	React.useEffect(() => {
		if (data) {
			setLoading(true);
		}
	}, [data]);

	// refetch에 의해 data 변경 시 마다 선택 ELEM 상태 업데이트
	React.useEffect(() => {
		const init = async () => {
			const getFetching = async (path: string): Promise<object> => {
				const url = await m.VerifyUtil.getBaseUrlAsync();
				const mapiKey = m.VerifyUtil.getMapiKey();
				const res = await fetch(`${url}${path}`, { headers: { 'Content-Type': 'application/json', 'MAPI-Key': mapiKey } });
				if (res.ok) {
					return await res.json();
				}
				else {
					console.error('fetching error', path, res.statusText);
					return {};
				}
			};

			const postFetching = async (path: string, body: any): Promise<any> => {
				const url = await m.VerifyUtil.getBaseUrlAsync();
				const mapiKey = m.VerifyUtil.getMapiKey();
				const res = await fetch(`${url}${path}`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'MAPI-Key': mapiKey }, body: JSON.stringify(body) });
				if (res.ok) {
					return await res.json();
				}
				else {
					console.error('fetching error', path, res.statusText);
					return {};
				}
			};

			try {
				const selElemArr = data["SELECT"]["ELEM_LIST"] as number[];
				setSelectedElems(selElemArr.join(',').toString());
				setSelElemCounts(selElemArr.length);

				const allElemData = (await getFetching('/db/elem') as any)["ELEM"];
				const allMatlData = (await getFetching('/db/matl') as any)["MATL"];
				const allSectData = (await getFetching('/db/sect') as any)["SECT"];
				const allElemWeightData = (await postFetching('/post/table', {
					"Argument": {
						"TABLE_NAME": "EWT",
						"TABLE_TYPE": "ELEMENTWEIGHT"
					}
				}))["EWT"];
				setUnits(`${allElemWeightData["FORCE"]} ${allElemWeightData["DIST"]}`);

				const headers: string[] = allElemWeightData["HEAD"];
				const indexElemID = 1; //Header에 "No"가 중복이라, Element ID는 1번 Index로 고정ㅠㅠ
				const indexLAV = headers.indexOf("Value");
				const indexWeightU = headers.indexOf("Unit Weight");
				const indexWeightT = headers.indexOf("Total Weight");

				const allBeamEndRelease = (await getFetching('/db/frls') as any)["FRLS"] ?? {};

				const resultRows = selElemArr.map((elementID: number, index: number) => {
					const nodeConnectvity = allElemData[elementID]["NODE"].filter((num: number) => num !== 0).toString() ?? '-';
					const elementType = allElemData[elementID]["TYPE"] ?? '-';
					const matlName = allMatlData[allElemData[elementID]["MATL"]] ? allMatlData[allElemData[elementID]["MATL"]]["NAME"] : '-';
					const sectName = allSectData[allElemData[elementID]["SECT"]] ? allSectData[allElemData[elementID]["SECT"]]["SECT_NAME"] : '-';
					const curWeightTBRow = allElemWeightData["DATA"].filter((row: any) => Number(row[indexElemID]) === elementID)[0];
					let beamEndRelease = '-';
					if (elementType === "BEAM" && Object.keys(allBeamEndRelease).length !== 0) {
						const bers = allBeamEndRelease[elementID]["ITEMS"][0];
						const is_fixed_I = bers["FLAG_I"].split('').every((char: string) => char === '0');
						const str_i = is_fixed_I ? 'F' : 'P';
						const is_fixed_J = bers["FLAG_J"].split('').every((char: string) => char === '0');
						const str_j = is_fixed_J ? 'F' : 'P';
						beamEndRelease = `${str_i}-${str_j}`;
					}
					return {
						id: index + 1,
						Col1: elementID,
						Col2: nodeConnectvity,
						Col3: elementType,
						Col4: matlName,
						Col5: sectName,
						Col6: curWeightTBRow[indexLAV],
						Col7: curWeightTBRow[indexWeightU],
						Col8: curWeightTBRow[indexWeightT],
						Col9: beamEndRelease,
					}
				});
				setRows(resultRows);
				setOpenDetail(false);
				setSingleRow([]);
			} catch ( err ) { 
				console.error('main logic error', err);
			} finally {
				setLoading(false);
			}
		};

		if (data && loading) {
			init();
		}
	}, [data, loading]);

	return (
    <AnimatePresence>
      <m.GuideBox width="auto" spacing={2} padding={2} loading={loading}>
        <m.VerifyDialog />

        <m.GuideBox width="100%" row horSpaceBetween verCenter>
					{/* {loading ? 'Loading...' : 'done'} */}
          <m.GuideBox row spacing={1} verCenter horSpaceBetween>
            <m.Typography variant="h1">
              Selected Elements ({selElemCounts.toString()})
            </m.Typography>
            <div onFocus={() => refetch()}>
              <m.TextField value={selectedElems} disabled />
            </div>
            <div style={{ position: "relative", zIndex: 999 }}>
              <m.Switch
                checked={openDetail}
                label="Detail"
                onChange={(e: any, checked: boolean) => setOpenDetail(checked)}
              />
              {openDetail && (
                <motion.div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 80,
                    background: m.Color.primaryNegative.main,
                    width: "auto",
                    height: "auto",
                    borderRadius: 4,
                  }}
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <m.Panel variant="box">
										{singleRow.length === 0 && (
											<m.Typography color={m.Color.primary.white} width={200}>
												Please select a row ...
											</m.Typography>
										)}
										{singleRow.length !== 0 && (
											<m.GuideBox spacing={1}>
                      {singleRow &&
                        singleRow.map((row: any, index: number) => {
                          return (
                            <m.GuideBox
                              row
                              horSpaceBetween
                              verCenter
                              width={200}
                            >
                              <m.Typography
                                variant="h1"
                                color={m.Color.primary.white}
                              >
                                {row[0]}
                              </m.Typography>
                              {row[1] && (
                                <motion.div
                                  initial={{ opacity: 0, x: -100 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.05 * index }}
                                  key={index.toString() + new Date().getTime()}
                                >
                                  <m.Typography color={m.Color.primary.white}>
                                    {row[1]}
                                  </m.Typography>
                                </motion.div>
                              )}
                            </m.GuideBox>
                          );
                        })
											}
                    	</m.GuideBox>
										)}
                  </m.Panel>
                </motion.div>
								)}
            </div>
          </m.GuideBox>
          <m.GuideBox row spacing={1} verCenter>
            <m.Typography>{units}</m.Typography>
            <HelpButton />
          </m.GuideBox>
        </m.GuideBox>
        <m.GuideBox width="100%" height="auto" spacing={1}>
          <m.Panel width="100%" height={280} padding={0}>
            <m.DataGrid
              hideFooter
              rows={rows}
              columns={columnNames.map((colName: string, index: number) => {
                return column(`Col${index + 1}`, colName);
              })}
              onCellClick={(params: any) => {
                const rowData = columnNames.map(
                  (colName: string, index: number) => {
                    return [colName, params["row"][`Col${index + 1}`]];
                  }
                );
                setSingleRow(rowData);
              }}
            />
          </m.Panel>
        </m.GuideBox>
      </m.GuideBox>
    </AnimatePresence>
  );
}

const column = (field: string, headerName: string, width = 80) => {
	return {
		field: field,
		headerName: headerName,
		width: width,
		sortable: false,
	};
}

const columnNames: string[] = [
	"Elem ID", "Node Con", "Type", "Material", "Section", "L/A/V", "Weight(U)", "Weight(T)", "BER"
];