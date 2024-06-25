import React from 'react';
import m from '@midasit-dev/moaui';
import { motion } from 'framer-motion';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { checkPyScriptReady } from './utils_pyscript';
import { enqueueSnackbar } from 'notistack';

const queryClient = new QueryClient();

const Wrapperd = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<App />
		</QueryClientProvider>
	);
}

export default Wrapperd;

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
	const [ selElems, setSelElems ] = React.useState([]);
	const [ refNode, setRefNode ] = React.useState('0, 0, 0');
	const [ selElemCount, setSelElemCount ] = React.useState(0);
	const [ selElemError, setSelElemError ] = React.useState(false);
	const [ refNodeError, setRefNodeError ] = React.useState(false);

	// 페이지가 focus 되었을 때 refetch 실행
	React.useEffect(() => {
		const handleFocus = () => refetch();
		window.addEventListener('focus', handleFocus);
		return () => {
			window.removeEventListener('focus', handleFocus);
		};
	}, [refetch]);

	// refetch에 의해 data 변경 시 마다 선택 엘리먼트 상태 업데이트
	React.useEffect(() => {
		if (data) {
			setSelElems(data["SELECT"]["ELEM_LIST"].toString());
		}
	}, [data]);

	// 선택된 엘리먼트 개수 업데이트
	React.useEffect(() => {
		if (selElems) setSelElemCount(selElems.toString().split(',').length);
	}, [selElems]);

	return (
		<m.GuideBox width={400} spacing={2} padding={2}>
			<SelectedElemsTextField errorState={[selElemError, setSelElemError]} elemState={[selElems, selElemCount]} reactQuery={[refetch]} />
			<RefNode errorState={[refNodeError, setRefNodeError]} state={[refNode, setRefNode]} />
			<ExecutionButton errors={[selElemError, refNodeError]} args={[ selElems, refNode ]} />
		</m.GuideBox>
	);
}

const SelectedElemsTextField = (props: any) => {
	const { errorState, elemState, reactQuery } = props;
	const [ error, setError ] = errorState;
	const [ selElems, selElemCount ] = elemState;
	const [ refetch ] = reactQuery;

	// 선택된 엘리먼트가 있는지 확인
	React.useEffect(() => {
		if (selElems === '') {
			setError(true);
		} else {
			setError(false);
		}
	}, [selElems, setError]);

	return (
		<m.GuideBox row spacing={1} verCenter horSpaceBetween width='100%'>
			{error && (
				<motion.div
					initial={{ opacity: 0, x: 0 }}
					animate={{
						opacity: 1,
						x: [0, -10, 10, -10, 10, 5, 0],
						transition: {
							duration: 0.3,
							ease: 'easeInOut'
						}
					}}
					exit={{ opacity: 0 }}
				>
					<m.Typography color='#f50057'>No Selected Elems</m.Typography>
				</motion.div>
			)}
			{!error && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{
						opacity: 1,
						transition: {
							duration: 0.3,
							ease: 'easeInOut'
						}
					}}
					exit={{ opacity: 0 }}
				>
					<m.Typography variant='h1'>Selected Elems ({selElemCount.toString()})</m.Typography>
				</motion.div>
			)}
			<div onFocus={refetch}>
				<m.TextField value={selElems.toString()} error={error} />
			</div>
		</m.GuideBox>
	);
}

const patternRefNode = /^(\d+),\s*(\d+),\s*(\d+)$/;
const RefNode = (props: any) => {
	const { errorState, state } = props;
	const [ error, setError ] = errorState;
	const [ refNode, setRefNode ] = state;

	// refNodeValue가 patternRefNode에 맞는지 확인
	React.useEffect(() => {
		if (patternRefNode.test(refNode)) {
			setError(false);
		} else {
			setError(true);
		}
	}, [refNode, setError]);

	return (
    <m.GuideBox spacing={2} row verCenter horSpaceBetween width="100%">
      {error && (
        <motion.div
          initial={{ opacity: 0, x: 0 }}
          animate={{
            opacity: 1,
            x: [0, -10, 10, -10, 10, 5, 0],
            transition: {
              duration: 0.3,
              ease: "easeInOut",
            },
          }}
          exit={{ opacity: 0 }}
        >
          <m.Typography color="#f50057">Invalid (X, Y, Z)</m.Typography>
        </motion.div>
      )}
      {!error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: {
              duration: 0.3,
              ease: "easeInOut",
            },
          }}
          exit={{ opacity: 0 }}
        >
          <m.Typography variant="h1">Refrence Node (X, Y, Z)</m.Typography>
        </motion.div>
      )}
      <m.TextField
        defaultValue={refNode}
        onChange={(e: any) => setRefNode(e.target.value)}
        error={error}
      />
    </m.GuideBox>
  );
}

const doPyMain = (refNode: string = "0, 0, 0", selElems: string[]) => {
	return checkPyScriptReady(() => {
		const pyFunc = pyscript.interpreter.globals.get('element_align_local_axis');
		pyFunc(refNode, selElems);
	});
}

const ExecutionButton = (props: any) => {
	const { errors, args } = props;
	const [ selElemError, refNodeError ] = errors;
	const [ selElems, refNode ] = args;

	const [ loading, setLoading ] = React.useState(false);

	React.useEffect(() => {
		if (!loading) return;
		const timer = setTimeout(() => {
			try {
				doPyMain(refNode, selElems);
			} catch ( err ) {
				console.error(err);
				enqueueSnackbar('Execution Failed', { variant: 'error' });
			} finally {
				enqueueSnackbar('Execution Completed', { variant: 'success' });
				setLoading(false);
			}
		}, 1000);
		return () => clearTimeout(timer);
	}, [loading, selElems, refNode]);

	return (
    <m.GuideBox width="100%" horRight>
      <m.Button
        onClick={() => {
          if (!selElemError && !refNodeError) {
            setLoading(true);
          }
        }}
        disabled={selElemError || refNodeError}
        color="negative"
				loading={loading}
      >
        Execute
      </m.Button>
    </m.GuideBox>
  );
}