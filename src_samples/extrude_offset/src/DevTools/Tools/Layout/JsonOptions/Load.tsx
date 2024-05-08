import { useState, useEffect, useCallback } from 'react';
import { Button, Dialog, DropList, GuideBox, Icon, IconButton, Panel, Tooltip } from "@midasit-dev/moaui";
import onClickHandler from '../../Shared/OnClickHandler';
import { useSetRecoilState } from 'recoil';
import { CanvasState, LayersState } from '../recoilState';
import { Canvas, ExportLayers, Layers } from '../../../types';

const App = () => {
	const [open, setOpen] = useState(false);

	return (
		<GuideBox	width="100%" row horSpaceBetween verCenter>
			<Tooltip title='Import Layer JSON'>
				<IconButton 
					onClick={() => setOpen(true)} 
					color='negative'
				>
					<Icon iconName='FolderOpen' />
				</IconButton>
			</Tooltip>
			{open && <ImportDialog open={open} setOpen={setOpen} />}
		</GuideBox>
	);
}

export default App;

const getKeyByValue = (map: Map<string, number>, value: number) => {
	const arr = Array.from(map);
	for (const kv of arr) {
		const k = kv[0];
		const v = kv[1];
		if (v === value) {
			return k;
		}
	}

	console.error("It's not found key ...");
	return "";
}

const ImportDialog = ({
	open,
	setOpen,
}: any) => {
	const [value, setValue] = useState(1);
	const [items, setItems] = useState<Map<string, number>>(new Map([ ['NONE', 1], ]));

	const refreshFileNames = useCallback(async () => {
		const data = await onClickHandler({
			path: '/exports/layers',
			method: 'get',
		});

		if (!data || data.length === 0 || data.error) {
			setItems(new Map([ ['NONE', 1] ]));
			setValue(1);
			return;
		}

		const map = new Map<string, number>();
		for (let i = 0; i < data.length; ++i) {
			const item = data[i];
			const value = Number(data.indexOf(item) + 1);
			map.set(item, value);
		}

		setItems(map);
	}, [setValue]);

	useEffect(() => {
		refreshFileNames();
	}, [refreshFileNames]);

	//value가 바뀌면 업데이트한다.
	const [tempCanvas, setTempCanvas] = useState<Canvas>({
		width: 0,
		height: 0,
	});
	const [tempLayers, setTempLayers] = useState<Layers>([]);
	useEffect(() => {
		const init = async () => {
			if (!items.has("NONE")) {
				const fileName = getKeyByValue(items, value);
				const data: ExportLayers = await onClickHandler({
					path: `/exports/layers/${fileName}`,
					method: 'get'
				});

				setTempCanvas(data.canvas);
				setTempLayers(data.layers);
			}
		}

		init();
	}, [items, setOpen, value]);

	//update layers value
	const setCanvas = useSetRecoilState(CanvasState);
	const setLayers = useSetRecoilState(LayersState);
	const onClickHandlerSelect = useCallback(() => {
		setCanvas(tempCanvas);
		setLayers(tempLayers);
		setOpen(false);
	}, [setCanvas, setLayers, setOpen, tempCanvas, tempLayers]);

	function onChangeHandler(event: any){
		setValue(event.target.value);
	}

	const [scaleValue, ] = useState(0.5);

	return (
		<Dialog
			open={open}
			setOpen={setOpen}
			onClose={() => setOpen(false)}
			headerTitle='Select Layer Import JSON'
		>
			<GuideBox spacing={2}>
				<GuideBox width="100%" row verCenter spacing={2}>
					<GuideBox width="100%" row verCenter>
						<IconButton
							onClick={refreshFileNames}
							transparent
						>
							<Icon iconName='Refresh' />
						</IconButton>
						<DropList 
							itemList={items} 
							width="260px" 
							defaultValue="NONE"
							value={value}
							onChange={onChangeHandler}
						/>
					</GuideBox>
				</GuideBox>
				<GuideBox width="100%" spacing={2}>
					<GuideBox width="100%" height="auto">
						<Panel
							padding={0}
							variant='box'
							border="1px solid #d1d1d1"
							width={tempCanvas.width * scaleValue}
							height={tempCanvas.height * scaleValue}
						>
							<JsonToSvg 
								scale={scaleValue}
								data={tempLayers}
							/>
						</Panel>
					</GuideBox>
				</GuideBox>
				<GuideBox width="100%" row horRight>
					<Button
						onClick={onClickHandlerSelect}
						color='negative'
					>
						Select
					</Button>
				</GuideBox>
			</GuideBox>
		</Dialog>
	)
}

const JsonToSvg = ({ scale, data }: any) => {
  return (
    <svg width="100%" height='100%'>
      {data.map((item: any, index: any) => (
				<rect
					key={item.id}
					x={item.props.x * scale}
					y={item.props.y * scale}
					width={item.props.width * scale}
					height={item.props.height * scale}
					fill="#d1d1d1" // 채우기 색상 없음
					opacity={0.5}
				/>
      ))}
    </svg>
  );
};