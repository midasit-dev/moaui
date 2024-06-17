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
	const [loading, setLoading] = React.useState(false);
	const [message, setMessage] = React.useState('');
	const [isEnded, setIsEnded] = React.useState(false);

	const onClickHandler = React.useCallback(async () => {
		try {
			const response = await fetch(`${Constant.baseUrl}/upgrade/moaui`);
			if (response.ok) {
				const data = await response.json();
				if (!data.message) {
					console.error('Update failed');
					setMessage('Installing failed!');
					return;
				}
				setIsEnded(true);
				setMessage(data.message);
			} else {
				console.error('Update failed');
			}
		} catch (error) {
			console.error('An error occurred:', error);
		}
	}, []);

	return (
		<GuideBox width="100%" spacing={2} center>

			<GuideBox width="100%" spacing={1.5} verCenter row horSpaceBetween>
				<GuideBox row spacing={2}>
					<GuideBox spacing={1} row>
						<Icon iconName='ArrowCircleDown' />
						<Typography variant='h1'>Moaui Upgrade</Typography>
					</GuideBox>
				</GuideBox>
				<Button
					width='90px'
					color='negative'
					onClick={async () => {
						setLoading(true);
						await onClickHandler();
					}}
				>
					Upgrade
				</Button>
			</GuideBox>

      <Dialog
				hiddenClose
        open={loading}
				headerIcon={<Icon iconName="HourglassFull" />}
        headerTitle="Installing ..."
      >
				{!isEnded && <GuideBox width='100%' height={50} loading />}
				{isEnded &&
					<GuideBox width='100%'>
						{message.split('\n').map((line, index) => {
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
								setMessage('');
								setIsEnded(false);
								setLoading(false);
							}}
						>
							Close
						</Button>
					</GuideBox>
				)}
			</Dialog>

		</GuideBox>
	)
}

export default Tool;