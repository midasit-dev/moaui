import React from "react";
import m from "@midasit-dev/moaui";
import { QueryClient, QueryClientProvider } from 'react-query';
import { useQuery } from 'react-query';
import { set } from "lodash";

const queryClient = new QueryClient();
const WrappingReactQuery = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
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

  const [ toggle, setToggle ] = React.useState(false);
	const [ selectedNodes, setSelectedNodes ] = React.useState('');
	const [ selNodeCount, setNodeCount ] = React.useState(0);
	const [ distanceToMove, setDistanceToMove ] = React.useState(1);
	const [ x, setX ] = React.useState(0);
	const [ y, setY ] = React.useState(0);
	const [ z, setZ ] = React.useState(0);
	const [ enableX, setEnableX ] = React.useState(true);
	const [ enableY, setEnableY ] = React.useState(true);
	const [ enableZ, setEnableZ ] = React.useState(true);
	const [ log, setLog ] = React.useState<Array<string>>([]);

	// 페이지가 focus 되었을 때 refetch 실행
	React.useEffect(() => {
    const handleFocus = () => refetch();
    window.addEventListener('focus', handleFocus);
    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, [refetch]);

	// refetch에 의해 data 변경 시 마다 선택 노드 상태 업데이트
	React.useEffect(() => {
		if (data) {
			if (!toggle) {
				setSelectedNodes(data["SELECT"]["NODE_LIST"].toString());
			}
		}
	}, [toggle, data]);

	// 선택 노드 상태 업데이트에 따른 좌표 입력 필드 활성화/비활성화
	React.useEffect(() => {
		const updateEnables = async () => {
			const allEqual = (arr: Array<any>, key: string) => {
				const values = arr.map(item => item[key]);
				return new Set(values).size === 1;
			};

			const url = await m.VerifyUtil.getBaseUrlAsync();
			const endpoint = url + '/db/node';
			const mapiKey = m.VerifyUtil.getMapiKey();
			const headers = {
				'Content-Type': 'application/json',
				'MAPI-KEY': mapiKey
			}

			const resGet = await fetch(endpoint, { method: 'GET', headers });
			if (resGet.ok) {
				const data = await resGet.json();
				const raw = data["NODE"];
				
				if (selectedNodes !== '') {
					const selNodeIdssArr = selectedNodes.split(',');
					const rawValues = selNodeIdssArr.map(id => raw[id]);
					setEnableX(allEqual(rawValues, 'X'));
					setEnableY(allEqual(rawValues, 'Y'));
					setEnableZ(allEqual(rawValues, 'Z'));
				} else {
					setEnableX(false);
					setEnableY(false);
					setEnableZ(false);
				}
			} else {
				console.error('error', resGet.statusText);
				setEnableX(false);
				setEnableY(false);
				setEnableZ(false);
			}
		};

		if (!toggle) {
			updateEnables();
		}
	}, [toggle, selectedNodes]);

	// 선택 노드 상태 업데이트에 따른 선택 노드 개수 업데이트
	React.useEffect(() => {
		if (selectedNodes !== '') {
			const selNodeIdsArr = selectedNodes.split(',');
			const filteredSelNodeIdsArr = selNodeIdsArr.filter(id => id !== '');
			setNodeCount(filteredSelNodeIdsArr.length);
		}
	}, [selectedNodes]);

	// toggle이 true면 'Create' 이므로, enables를 초기화 한다.
	React.useEffect(() => {
		if (toggle) {
			setEnableX(true);
			setEnableY(true);
			setEnableZ(true);
		}
	}, [toggle]);

  return (
    <m.GuideBox width={350} spacing={2} padding={2}>

			<m.VerifyDialog />

      <ToggleSwitch toggleState={[toggle, setToggle]} />
			<SelectedNodesTextField toggle={toggle} selectedNodesState={[selectedNodes, selNodeCount]} reactQuery={[refetch]} />
			<DistanceToMoveTextField toggle={toggle} distanceToMoveState={[distanceToMove, setDistanceToMove]} />
			<XYZTextFields coordinateState={[x, setX, y, setY, z, setZ]} enableState={[enableX, enableY, enableZ]} distanceToMoveState={[distanceToMove]} />
			<ApplyCreateButton toggle={toggle} coordinateState={[x, setX, y, setY, z, setZ]} enableState={[enableX, enableY, enableZ]} selectedNodesState={[selectedNodes]} logState={[setLog]} />
			<ApplyCreateLogger logState={[log, setLog]} />

    </m.GuideBox>
  );
};

const ToggleSwitch = (props: any) => {
	const { toggleState } = props;
	const [ toggle, setToggle ] = toggleState;

  return (
    <m.GuideBox row spacing={1} verCenter>
      <m.Switch checked={toggle} onChange={() => setToggle(!toggle)} />
			<m.Typography>{toggle ? 'Create' : 'Translate'}</m.Typography>
    </m.GuideBox>
  );
};

const SelectedNodesTextField = (props: any) => {
	const { toggle, selectedNodesState, reactQuery } = props;
	const [ selectedNodes, selNodeCount ] = selectedNodesState;
	const [ refetch ] = reactQuery;

	return (
		<m.GuideBox row spacing={1} verCenter width='100%' horSpaceBetween>
			<m.Typography color={toggle ? '#aaa' : '#000'}>
				Selected Nodes ({selNodeCount.toString()})
			</m.Typography>
			<div onFocus={refetch}>
				<m.TextField
					value={selectedNodes}
					disabled={toggle}
				/>
			</div>
		</m.GuideBox>
	);
}

const DistanceToMoveTextField = (props: any) => {
	const { toggle, distanceToMoveState } = props;
	const [ distanceToMove, setDistanceToMove ] = distanceToMoveState;

	return (
		<m.GuideBox row spacing={1} verCenter width='100%' horSpaceBetween>
			<m.Typography color={toggle ? '#aaa' : '#000'}>
				Distance to Move
			</m.Typography>
			<m.TextFieldV2 
				type="number"
				defaultValue={distanceToMove} 
				onChange={(e: any) => setDistanceToMove(Number(e.target.value))}
				disabled={toggle}
				numberOptions={{
					min: 1,
					step: 1,
				}}
			/>
		</m.GuideBox>
	);
}

const XYZTextFields = (props: any) => {
	const { coordinateState, enableState, distanceToMoveState } = props;
	const [ x, setX, y, setY, z, setZ ] = coordinateState;
	const [ enableX, enableY, enableZ ] = enableState;
	const [ distanceToMove ] = distanceToMoveState;

	return (
    <m.GuideBox row spacing={1} verCenter width="100%" horSpaceBetween>
      <m.GuideBox center spacing={1}>
        <m.Typography color={!enableX ? "#aaa" : "#000"}>X(m)</m.Typography>
				<m.GuideBox row spacing={1}>
					<m.TextFieldV2
						disabled={!enableX}
						type={!enableX ? "text" : "number"}
						defaultValue={!enableX ? 'Var.' : x}
						value={!enableX ? 'Var.' : x}
						onChange={(e: any) => setX(Number(e.target.value))}
						numberOptions={{
							step: distanceToMove
						}}
					/>
				</m.GuideBox>
      </m.GuideBox>

      <m.GuideBox center spacing={1}>
        <m.Typography color={!enableY ? "#aaa" : "#000"}>Y(m)</m.Typography>
        <m.TextFieldV2
          disabled={!enableY}
          type={!enableY ? "text" : "number"}
          defaultValue={!enableY ? 'Var.' : y}
					value={!enableY ? 'Var.' : y}
          onChange={(e: any) => setY(Number(e.target.value))}
					numberOptions={{
						step: distanceToMove
					}}
        />
      </m.GuideBox>

      <m.GuideBox center spacing={1}>
        <m.Typography color={!enableZ ? "#aaa" : "#000"}>Z(m)</m.Typography>
        <m.TextFieldV2
          disabled={!enableZ}
          type={!enableZ ? "text" : "number"}
          defaultValue={!enableZ ? 'Var.' : z}
					value={!enableZ ? 'Var.' : z}
          onChange={(e: any) => setZ(Number(e.target.value))}
					numberOptions={{
						step: distanceToMove
					}}
        />
      </m.GuideBox>
    </m.GuideBox>
  );
}

const ApplyCreateButton = (props: any) => {
	const { toggle, coordinateState, enableState, selectedNodesState, logState } = props;
	const [ x, setX, y, setY, z, setZ ] = coordinateState;
	const [ enableX, enableY, enableZ ] = enableState;
	const [ selectedNodes ] = selectedNodesState;
	const [ setLog ] = logState;

	const applyHandler = React.useCallback(async () => {
		try {
			const url = await m.VerifyUtil.getBaseUrlAsync();
			const endpoint = url + '/db/node';
			const mapiKey = m.VerifyUtil.getMapiKey();
			const headers = {
				'Content-Type': 'application/json',
				'MAPI-KEY': mapiKey
			}

			const resGet = await fetch(endpoint, { method: 'GET', headers });
			if (resGet.ok) {
				const data = await resGet.json();
				const raw = data["NODE"];
				
				const selNodeIdsArr = selectedNodes.split(',');
				const rawBody: Record<string, { X: number, Y: number, Z: number }> = {};
				selNodeIdsArr.forEach((id: string) => {
					rawBody[id] = {
						X: enableX ? x : raw[id].X, 
						Y: enableY ? y : raw[id].Y,
						Z: enableZ ? z : raw[id].Z
					};
				});
				const resPut = await fetch(endpoint, { method: 'PUT', headers, body: JSON.stringify({ 'Assign': rawBody }) });
				if (resPut.ok) {
					const data = await resPut.json();
					setX(0);
					setY(0);
					setZ(0);
					setLog((prev: Array<string>) => [`${selNodeIdsArr.length} nodes have been modified. (${x}, ${y}, ${z})`, ...prev]);
					console.log('successfully apply', data);
				} else {
					console.error('failure apply', resPut.statusText);
				}
			} else {
				console.error('failure apply', resGet.statusText);
			}
		} catch (err) {
			console.error('failure apply', err);
		}
	}, [selectedNodes, enableX, x, enableY, y, enableZ, z, setX, setY, setZ, setLog]);

	const createHandler = React.useCallback(async () => {
		try {
			const url = await m.VerifyUtil.getBaseUrlAsync();
			const endpoint = url + '/db/node';
			const mapiKey = m.VerifyUtil.getMapiKey();
			const headers = {
				'Content-Type': 'application/json',
				'MAPI-KEY': mapiKey
			}

			//먼저 마지막 Node 번호 찾기
			let lastNodeId = -1;
			const resGet = await fetch(endpoint, { method: 'GET', headers });
			if (resGet.ok) {
				const data = await resGet.json();
				const raw = data["NODE"];
				const rawKeys = Object.keys(raw);
				lastNodeId = Number(rawKeys[rawKeys.length - 1]) + 1;
			} else {
				//비어있는 경우 500으로 표기되고 에러메세지를 반환한다. 이때 1로 초기화 한다.
				if (resGet.status === 500) {
					const data = await resGet.json();
					if ('error' in data && 'message' in data['error']) {
						if (data['error']['message'].includes('Empty')) {
							lastNodeId = 1;
						}
					}
				} else {
					console.error('it is failure finding last node for create', resGet.statusText);
				}
			}

			if (lastNodeId !== -1) {
				//마지막 Node ID로 새로운 Node 생성
				const resPost = await fetch(endpoint, { method: 'POST', headers, body: JSON.stringify({
					'Assign': { [lastNodeId]: { X: x, Y: y, Z: z } }
				})});
				if (resPost.ok) {
					const data = await resPost.json();
					console.log('successfully create', data);
					setX(0);
					setY(0);
					setZ(0);
					setLog((prev: Array<string>) => [`${lastNodeId}: (${x}, ${y}, ${z}) created.`, ...prev]);
				} else {
					console.error('failure create', resPost.statusText);
				}
			}
		} catch (err) {
			console.error('failure create', err);
		}
	}, [setLog, setX, setY, setZ, x, y, z]);

	return (
    <m.GuideBox width="100%" horRight>
      {!toggle && (
        <m.Button
          color="negative"
          onClick={applyHandler}
          disabled={!enableX && !enableY && !enableZ}
        >
          Apply
        </m.Button>
      )}
      {toggle && (
        <m.Button color="negative" onClick={createHandler}>
          Create
        </m.Button>
      )}
    </m.GuideBox>
  );
}

const ApplyCreateLogger = (props: any) =>{ 
	const { logState } = props;
	const [ log, setLog ] = logState;

	return (
		<m.Scrollbars width='100%' height={150}>
			<m.GuideBox width='100%' spacing={1.5}>
				<m.Typography variant="h1">Controlled Log</m.Typography>
				<m.GuideBox spacing={0.5}>
					{log.map((log: string, idx: number) => (
						<m.Typography key={idx} variant="body1">{log}</m.Typography>
					))}
				</m.GuideBox>
			</m.GuideBox>
		</m.Scrollbars>
	)
}