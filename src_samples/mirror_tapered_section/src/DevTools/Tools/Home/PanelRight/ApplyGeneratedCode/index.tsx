import { useCallback, useEffect, useState } from 'react';
import {
	GuideBox,
	Icon,
	Dialog,
	Typography,
	Button,
	DropList,
} from "@midasit-dev/moaui";
import onClickHandler from '../../../Shared/OnClickHandler';
import { enqueueSnackbar } from 'notistack';

const DialogApplyGeneratedCode = (props: {
	open: boolean,
	setOpen: (value: boolean) => void,
}) => {
	const { open, setOpen } = props;

	const [items, setItems] = useState<[string, number][]>([]);
	const [reverseItems, setReverseItems] = useState<Map<number, string>>(new Map());
	const [value, setValue] = useState(1);

	const onChangeHandler = useCallback((e: any) => {
		setValue(e.target.value);
	}, []);

	const init = useCallback(async () => {
		const data: string[] | any = await onClickHandler({
			path: '/exports/codes',
			method: 'get',
		});

		if (data.error) {
			enqueueSnackbar(data.error, { variant: 'error' });
			setValue(1);
			return;
		}

		const newItems: [string, number][] = data.map((fileName: string, index: number) => {
			return [fileName, index + 1];
		});

		const reverseItemsMap: Map<number, string> = new Map(newItems.map(([fileName, index]) => [index, fileName]));

		setItems(newItems);
		setReverseItems(reverseItemsMap);
	}, []);

	useEffect(() => {
		init();
	}, [init]);

	const onClickApplyHandler = useCallback(async () => {
		const selectFileName = reverseItems.get(value);
		const data = await onClickHandler({
			path: '/apply-code',
			body: { fileName: selectFileName },
			method: 'post',
		});

		if (data.message) {
			enqueueSnackbar(data.message, { variant: 'success' });
		}

		setOpen(false);
	}, [reverseItems, value, setOpen]);

	return (
		<Dialog
			open={open}
			setOpen={setOpen}
			onClose={() => setOpen(false)}
			headerTitle="Apply Generated Code"
		>
			<GuideBox width="100%" spacing={2}>
				<DropList
					width={300}
					itemList={items}
					defaultValue="NONE"
					value={value}
					onChange={onChangeHandler}
				/>
				<Button
					width='100%'
					onClick={onClickApplyHandler}
					color="negative"
				>
					Select
				</Button>
			</GuideBox>
		</Dialog>
	)
}

const ApplyGeneratedCode = () => {
	const [open, setOpen] = useState(false);

	return (
		<GuideBox width="100%" row verCenter horSpaceBetween>
			<GuideBox row spacing={1}>
				<Icon iconName='AutoFixHigh' />
				<Typography variant='h1'>Apply The Generated Code</Typography>
			</GuideBox>
			<Button color="negative" width="90px" onClick={() => setOpen(true)}>
				Apply
			</Button>
			{open && <DialogApplyGeneratedCode {...{open, setOpen}} />}
		</GuideBox>
	)
}

export default ApplyGeneratedCode;