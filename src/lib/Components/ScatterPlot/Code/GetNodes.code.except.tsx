import { useState, useEffect } from 'react';
import { Check, DropList, TextField, GuideBox, Typography, ScatterPlot, type ScatterPlotProps } from '@midasit-dev/moaui';

const baseUrl = 'https://moa-engineers.midasit.com:443/civil';

const fetchingData = async (baseUrl: string, path: string, mapiKey: string) => {
	const res = await fetch(baseUrl + path, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'MAPI-Key': mapiKey,
		},
	});

	if (!res.ok) {
		console.error('Failed to fetch data');
	}

	const data = await res.json();
	if (Object.keys(data).length === 0) {
		console.error('The data is empty');
	}

	return data;
}

interface Node {
	NODE?: {
		[key: string | number]: {
			X: number,
			Y: number,
			Z: number,
		}
	}
}

const ComponentsScatterPlotGetNodes = () => {
	const [mapiKey, setMapiKey] = useState('');
	const [viewPointNumber, setViewPointNumber] = useState(1);
	const [colorful, setColorful] = useState(false);

	const [nodeData, setNodeData] = useState<Node>({});
	useEffect(() => {
		(async (baseUrl: string, mapiKey: string) => {
			if (baseUrl !== '' && mapiKey !== '') {
				const data: Node = await fetchingData(baseUrl, '/db/node', mapiKey);
				if (Object.keys(data).includes('NODE')) {
					setNodeData(data);
				}
			} else {
				setNodeData({});
			}
		})(baseUrl, mapiKey);
	}, [mapiKey]);

	const [data, setData] = useState<ScatterPlotProps['data']>([]);
	const [minMax, setMinMax] = useState<{minL: number, maxL: number, minR: number, maxR: number}>({minL: 0, maxL: 0, minR: 0, maxR: 0});
	useEffect(() => {
		if (nodeData === undefined || nodeData.NODE === undefined) {
			setData([]); return;
		}

		let dirs = ["X", "Z"];
		if (viewPointNumber === 1) dirs = ["X", "Z"];
		if (viewPointNumber === 2) dirs = ["Y", "Z"];

		let minL = 0;
		let maxL = 0;
		let minR = 0;
		let maxR = 0;
		const arr: any = Object.keys(nodeData.NODE).map((key) => {
			const lValue = nodeData!.NODE![key][dirs[0] as "X" | "Y" | "Z"];
			if (minL > lValue) minL = lValue;
			if (maxL < lValue) maxL = lValue;
			const rValue = nodeData!.NODE![key][dirs[1] as "X" | "Y" | "Z"];
			if (minR > rValue) minR = rValue;
			if (maxR < rValue) maxR = rValue;

			if (colorful) {
				return {
					id: key,
					data: [{x: lValue, y: rValue}],
				}
			} else {
				return {x: lValue, y: rValue};
			}
		});

		if (colorful) {
			setData(arr);
		} else {
			setData([{
				id: 'nodes',
				data: arr,
			}])
		}
		setMinMax({minL, maxL, minR, maxR});
	}, [nodeData, viewPointNumber, colorful]);

	return (
		<GuideBox center spacing={1}>
			<TextField
				width={350}
				onChange={(e: any) => setMapiKey(e.target.value)}
				value={mapiKey}
				placeholder='type a MAPI-Key'
			/>
			<GuideBox row verCenter spacing={2}>
				<Typography variant='h1'>Select View Point</Typography>
				<DropList
					itemList={[ ['front', 1], ['right', 2] ]}
					value={viewPointNumber}
					onChange={(e: any) => setViewPointNumber(e.target.value)}
				/>
				<Check
					checked={colorful}
					name={colorful ? 'colorful' : 'mono'}
					onChange={() => setColorful(!colorful)}
				/>
			</GuideBox>
			<ScatterPlot
				data={data}
				width={700}
				height={700}
				margin={{
					top: 		50,
					right: 	50,
					bottom: 50,
					left: 	50,
				}}
				xScale={{
					type: 'linear',
					min: minMax.minL - 10,
					max: minMax.maxL + 10,
				}}
				yScale={{
					type: 'linear',
					min: minMax.minR - 10,
					max: minMax.maxR + 10,
				}}
			/>
		</GuideBox>
	)
}

export default ComponentsScatterPlotGetNodes;