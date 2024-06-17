import React from 'react';
import { 
	Icon,
	Button,
	Dialog,
	GuideBox,
	Typography,
} from "@midasit-dev/moaui";
import Constant from '../../../constant.json';

const Tool = () => {
	const [building, setBuilding] = React.useState(false);
	const [buildMessage, setBuildMessage] = React.useState('');
	const [isEnded, setIsEnded] = React.useState(false);

	const onClickHandler = React.useCallback(async () => {
		try {
			const response = await fetch(`${Constant.baseUrl}/build`);
			if (response.ok) {
				const data = await response.json();
				if (!data.message) {
					setBuildMessage('The message is not exist, build failed!');
				} else {
					setBuildMessage(data.message);
				}
			} else {
				setBuildMessage('Response not ok, build failed!');
			}
		} catch (error) {
			console.error('An error occurred:', error);
		} finally {
			setIsEnded(true);
		}
	}, []);

	return (
		<GuideBox width="100%" spacing={2} center>

			<GuideBox width="100%" spacing={1.5} verCenter row horSpaceBetween>
				<GuideBox row spacing={2}>
					<GuideBox spacing={1} row>
						<Icon iconName='CoffeeMaker' />
						<Typography variant='h1'>Build Plug-in Item</Typography>
					</GuideBox>
				</GuideBox>
				<Button
					width='90px'
					color='negative'
					onClick={async () => {
						setBuilding(true);
						await onClickHandler();
					}}
				>
					Build
				</Button>
			</GuideBox>

      <Dialog
				hiddenClose
        open={building}
				headerIcon={<Icon iconName="HourglassFull" />}
        headerTitle="Plug-in Item Building ..."
      >
				<GuideBox width='100%' spacing={2}>
					{!isEnded && <GuideBox width='100%' height={50} loading />}
					{isEnded &&
						<GuideBox width='100%'>
							{buildMessage.split('\n').map((line, index) => {
								if (line === '') return <div key={index} style={{ height: 10 }} />
								return (
									<Typography key={index} variant='body1'>
										{line}
									</Typography>
								)
							})}
						</GuideBox>
					}
					{isEnded && (
						<GuideBox width='100%' center>
							<Button 
								color='negative'
								onClick={() => {
									setBuildMessage('');
									setIsEnded(false);
									setBuilding(false);
								}}
							>
								Close
							</Button>
						</GuideBox>
					)}
				</GuideBox>
			</Dialog>

		</GuideBox>
	)
}

export default Tool;