import React from 'react';
import Moaui from '@midasit-dev/moaui';
import Utils from '../Utils';
import Header from './Shared/Header';
import onClickHandler from './Shared/OnClickHandler';

/**
 * Container Size Updator
 * 
 * @description You can see the size of the container (your plug-in item).
 * 							The code below is for testing. 
 * 							You can delete it, but it is code that shows the final size of the Plug-in.
 */
const Tool = () => {
	const [containerSize, setContainerSize] = React.useState({ width: 0, height: 0 });
	const [constainerSizeUpdate, setContainerSizeUpdate] = React.useState(true);
	const [loading, setLoading] = React.useState(false);

	React.useEffect(() => {
		if (!Utils.IsDevEnv()) return;

		if (constainerSizeUpdate) {
			//Get the width and height values of the entire container.
			const myElement = document.getElementById('container');
			if (myElement === null) return;
			const width = myElement.offsetWidth;
			const height = myElement.offsetHeight;

			setContainerSize({ width: width, height: height });
			setContainerSizeUpdate(false);
		}
	}, [constainerSizeUpdate, setContainerSize]);

	const onClickUpdate = React.useCallback(async () => onClickHandler({
		path: '/public/manifest-json',
		body: { width: containerSize.width, height: containerSize.height },
		method: 'put',
	}), [containerSize.height, containerSize.width]);

	const [show, setShow] = React.useState(true);

	if (!Utils.IsDevEnv()) return null;

	return (
		<Moaui.GuideBox width="100%" spacing={2} center>

			<Header
				iconName='PhotoSizeSelectActual'
				title="Container Size"
				showState={[show, setShow]}
			/>

			{show &&
				<Moaui.GuideBox row width="100%" spacing={5} verCenter height={30} horSpaceBetween>
					<Moaui.GuideBox row verCenter spacing={1} loading={loading}>
						<Moaui.Tooltip title="re-calculate the container size" placement='top'>
							<Moaui.IconButton
								transparent
								onClick={() => {
									setLoading(true);
									setTimeout(() => {
										try {
											setContainerSizeUpdate(true);
										} finally {
											setLoading(false);
										}
									}, 500);
								}}
							>
								<>
									<Moaui.Icon iconName='Refresh' />
									<Moaui.Typography>{`${containerSize.width}px x ${containerSize.height}px`}</Moaui.Typography>
								</>
							</Moaui.IconButton>
						</Moaui.Tooltip>
					</Moaui.GuideBox>

					<Moaui.Tooltip 
						title={
							<Moaui.GuideBox center>
								<Moaui.GuideBox center row>
									<Moaui.Chip color='primary' size="small" label='public/manifest.json' />
								</Moaui.GuideBox>
								<Moaui.Typography>It will be refresh this page.</Moaui.Typography>
							</Moaui.GuideBox>
						}
						placement='left'
					>
						<Moaui.Button
							color='negative'
							onClick={onClickUpdate}	
						>
							Update
						</Moaui.Button>
					</Moaui.Tooltip>
				</Moaui.GuideBox>
			}
			
			
		</Moaui.GuideBox>
	)
}

export default Tool;