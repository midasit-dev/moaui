import React from 'react';
import Moaui from '@midasit-dev/moaui';
import Header from '../Shared/Header';
import Body from '../Shared/Body';
import { rowHeaderHeight } from '../Shared/HeaderBodyStyles';

interface ToolProps {
	containerSizeState: [{ width: number, height: number }, React.Dispatch<React.SetStateAction<{ width: number; height: number; }>>];
}
/**
 * Container Size Updator
 * 
 * @description You can see the size of the container (your plug-in item).
 * 							The code below is for testing. 
 * 							You can delete it, but it is code that shows the final size of the Plug-in.
 */
const Tool = (props: ToolProps) => {
	const {
		containerSizeState
	} = props;

	const [containerSize, setContainerSize] = containerSizeState;
	const [constainerSizeUpdate, setContainerSizeUpdate] = React.useState(true);
	const [loading, setLoading] = React.useState(false);

	React.useEffect(() => {
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

	return (
		<Moaui.GuideBox width="100%" height={rowHeaderHeight} center row>

			<Header
				title="Container Size"
				noSeparator
			/>

			<Body>
				<Moaui.GuideBox width={160} row horRight verCenter spacing={2} loading={loading}>
					<Moaui.Typography>{`${containerSize.width}px x ${containerSize.height}px`}</Moaui.Typography>
					<Moaui.Tooltip title="re-calculate the container size" placement='top'>
						<Moaui.Icon 
							iconName='Refresh' 
							toButton
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
						/>
					</Moaui.Tooltip>
				</Moaui.GuideBox>
			</Body>

		</Moaui.GuideBox>
	)
}

export default Tool;