import React from 'react';
import { 
	Dialog, 
	Icon,
	Typography,
	GuideBox,
	Button,
	Panel,
	Tooltip,
} from '@midasit-dev/moaui';

interface Check {
	title: string;
	value: any,
	error: boolean,
	reason: string,
}

/**
 * props of Valid Check Dialog
 * 
 * @param {boolean} open
 * @param {(open: boolean) => void} setOpen
 * @param {Check[]} checkList
 * @param {string} buttonText
 * @param {() => void} buttonClick
 * @param {number} [maxPanelRows]
 */
interface Props {
	open: boolean,
	setOpen: (open: boolean) => void,
	checkList: Check[],
	buttonText: string,
	buttonClick: () => void,
	maxPanelRows?: number,
}
const TemplatesFunctionalComponentsValidCheckDialog = (props: Props) => {
	const {
		open = true,
		setOpen = () => {},
		checkList = [
			{
				title: "Title",
				value: 'error value',
				error: true,
				reason: "error reason...",
			},
			{
				title: "Title",
				value: 'success value',
				error: false,
				reason: "reason",
			},
		],
		buttonText = 'Confirm',
		buttonClick = () => {},
		maxPanelRows,
	} = props;

	//Button Action
	const [loading, setLoading] = React.useState(false);
	const [disabled, setDisabled] = React.useState(true);

	//Error Check
	React.useEffect(() => {
		const hasError = checkList.some((item: any) => item.error);
		setDisabled(hasError);
	}, [checkList]);

	return (
		<Dialog
			open={open}
			setOpen={setOpen}
			headerIcon={<Icon iconName="Warning" />}
			headerTitle="Validation Check"
		>

			<GuideBox spacing={2}>

				<Typography variant="h1">Input Values</Typography>
				{
					maxPanelRows ?
						<GuideBox row spacing={2}>
							{splitArray(checkList, maxPanelRows).map((item: any, index: number) => {
								return <InputValuePanel key={index} checkList={item} />
							})}
						</GuideBox> :
					 		<InputValuePanel checkList={checkList} />
				}

				<Button
					width='100%'
					color="negative"
					disabled={disabled}
					loading={loading}
					onClick={() => {
						setLoading(true);
						setTimeout(() => {
							try {
								buttonClick();
							} catch (e: any) {
								console.error(e);
							} finally {
								setLoading(false);
								setOpen(false);
							}
						}, 500);
					}}
				>
					{buttonText}
				</Button>

			</GuideBox>
				
		</Dialog>
	)
}

export default TemplatesFunctionalComponentsValidCheckDialog;

const InputValuePanel = (props: any) => {
	const { checkList } = props;

	return (
		<Panel variant='shadow2'>
			<GuideBox opacity={0.9} spacing={1}>
				{
					checkList.map((item: any, index: number) => (
						<GuideBox width="100%" key={index} row spacing={4} horSpaceBetween>
							<Typography variant="body1">{item.title}</Typography>
							<GuideBox row spacing={1}>
								<Typography variant="h1" color={item.error ? "red" : "primary"}>
									{item.value !== null && item.value !== '' ? item.value.toString() : "-"}
								</Typography>
								{
									item.error ?
										<Tooltip
											title={<Typography variant="body1" color="red">{item.reason}</Typography>}
											placement="top"
										>
											<Typography variant="body1" color="red">ER</Typography>
										</Tooltip> :
											<Typography variant="body1" color="primary">OK</Typography>
								}
							</GuideBox>
						</GuideBox>
					))
				}
			</GuideBox>
		</Panel>
	)
}

const splitArray = (array: Check[], size: number) => {
	const result = [];
	for (let i = 0; i < array.length; i += size) {
		result.push(array.slice(i, i + size));
	}
	return result;
}