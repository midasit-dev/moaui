import React from 'react';
import Moaui from '@midasit-dev/moaui';
import Header from '../Shared/Header';
import Body from '../Shared/Body';
import { rowHeaderHeight } from '../Shared/HeaderBodyStyles';

interface ToolProps {
	titleState: [string, React.Dispatch<React.SetStateAction<string>>];
}

/**
 * Title Updator
 * 
 * @description You can change the title of the plug-in.
 */
const Tool = (props: ToolProps) => {
	const [title, setTitle] = props.titleState;
	return (
		<Moaui.GuideBox width="100%" height={rowHeaderHeight} center row>

			<Header
				title='Plug-in Title'
				noSeparator
			/>

			<Body LayoutGuideBoxProps={{
				row: true,
				horSpaceBetween: true,
				verCenter: true,
			}}>
				<Moaui.TextField
					width={200}
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
			</Body>

		</Moaui.GuideBox>
	)
}

export default Tool;