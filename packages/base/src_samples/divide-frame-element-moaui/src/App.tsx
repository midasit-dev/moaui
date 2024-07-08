import React from 'react';
import m from '@midasit-dev/moaui';
import { useQuery, QueryClientProvider, QueryClient } from 'react-query';
import { checkPyScriptReady } from './utils_pyscript';
import { enqueueSnackbar } from 'notistack';

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

	const [ selInitNode, setSelInitNode ] = React.useState('');
	const [ fromFloor, setFromFloor ] = React.useState<number>(0);
	const [ toFloor, setToFloor ] = React.useState<number>(0);
	const [ loadingApply, setLoadingApply ] = React.useState<boolean>(false);

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
			const nodeArr = data["SELECT"]["NODE_LIST"] as Array<string>;
			if (nodeArr.length === 1) {
				setSelInitNode(nodeArr[0]);
			} else {
				setSelInitNode('');
			}
		}
	}, [data]);

	React.useEffect(() => {
		if (!loadingApply) return;

		setTimeout(() => {
			try {
				if (fromFloor === 0 || toFloor === 0) {
					enqueueSnackbar('Please enter the floor number.', { variant: 'error' });
					throw new Error('Please enter the floor number.');
				}

				checkPyScriptReady(() => {
					const py_main_function = pyscript.interpreter.globals.get('belt_wall_model');
					py_main_function(fromFloor, toFloor);
				})
			} catch ( err ) {
				console.error(err);
			} finally {
				setLoadingApply(false);
			}
		}, 1000);
	}, [loadingApply, fromFloor, toFloor]);

	return (
    <m.GuideBox width={350} spacing={2} padding={2}>
      <m.GuideBox row width="100%" horSpaceBetween verCenter>
        <m.Typography variant='h1'>Selected Criteria Node</m.Typography>
        <m.Typography color={selInitNode === "" ? "red" : "#000"}>
          {selInitNode === "" ? "not selected" : selInitNode}
        </m.Typography>
      </m.GuideBox>

      <m.GuideBox row verCenter horSpaceBetween width="100%">
        <m.Typography variant='h1'>From Floor</m.Typography>
        <m.TextFieldV2 
					disabled={selInitNode === ''} 
					type='number' 
					numberOptions={{ onlyInteger: true }} 
					onChange={(e: any) => {
						setFromFloor(Number(e.target.value));
					}}
					defaultValue='0'
				/>
      </m.GuideBox>

      <m.GuideBox row verCenter horSpaceBetween width="100%">
        <m.Typography variant='h1'>To Floor</m.Typography>
        <m.TextFieldV2 
					disabled={selInitNode === ''} 
					type='number' 
					numberOptions={{ onlyInteger: true }} 
					onChange={(e: any) => {
						setToFloor(Number(e.target.value));
					}}
					defaultValue='0'
				/>
      </m.GuideBox>

      <m.GuideBox row verCenter horRight width="100%">
        <m.Button 
					disabled={selInitNode === ''} 
					color="negative"
					onClick={() => setLoadingApply(true)}
					loading={loadingApply}
				>
					Apply
				</m.Button>
      </m.GuideBox>
    </m.GuideBox>
  );
}

const queryClient = new QueryClient();
const Wrapper = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<App />
		</QueryClientProvider>
	);
}

export default Wrapper;