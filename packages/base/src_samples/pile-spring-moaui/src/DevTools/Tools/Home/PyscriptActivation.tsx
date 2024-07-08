import React from 'react';
import { 
	GuideBox, 
	Icon, 
	Switch, 
	Typography 
} from "@midasit-dev/moaui";
import onClickHandler from '../Shared/OnClickHandler';

const PyscriptActivation = () => {
	const [isActivated, setIsActivated] = React.useState(false);

	React.useEffect(() => {
		const fetchData = async () => {
			if (isActivated) {
				onClickHandler({
					path: '/activation/pyscript',
					body: {
						value: isActivated ? 'activate' : 'inactivate',
					},
					method: 'put',
				});
			}
		}

		fetchData();
	}, [isActivated]);

	return (
		<GuideBox width="100%" spacing={1.5} verCenter row horSpaceBetween>
			<GuideBox row spacing={2}>
				<GuideBox spacing={1} row>
					<Icon iconName='Terminal' />
					<Typography variant='h1'>{`Activate Python (${isActivated ? 'active' : 'inactive'})`}</Typography>
				</GuideBox>
			</GuideBox>
			<Switch
				checked={isActivated}
				onChange={(e: any) => setIsActivated(e.target.checked)}
			/>
		</GuideBox>
	);
}

export default PyscriptActivation;