import React from 'react';
import Moaui from '@midasit-dev/moaui';
import { HexColorPicker } from "react-colorful";
import Header from '../Shared/Header';
import Body from '../Shared/Body';
import { useBackgroundColor } from '../../../Wrapper';

/**
 * Container Background Color Updator
 * 
 * @description You can change the background color of the container (your plug-in item).
 */

interface ToolProps {
	containerBackgroundColorState: [string, React.Dispatch<React.SetStateAction<string>>];
}

const Tool = (props: ToolProps) => {
	// const { containerBackgroundColorState } = props;
	// const [color, setColor] = containerBackgroundColorState;
	const { bgColor: color, setBgColor: setColor } = useBackgroundColor();
	const [show, setShow] = React.useState(false);

	return (
		<Moaui.GuideBox width="100%" center>

			<Header
				title='Container Background Color'
				showState={[show, setShow]}
				noSeparator
			/>

			{show &&
				<Body guideBoxProps={{ center: true, paddingTop: 2 }}>
					<HexColorPicker color={color} onChange={setColor} />

					<Moaui.GuideBox row width="100%" spacing={2} center>
						<Moaui.Typography>Hex</Moaui.Typography>
						<Moaui.TextField
							width={70}
							value={color}
							onChange={(e) => setColor(e.target.value)}
						/>
					</Moaui.GuideBox>
				</Body>
			}

		</Moaui.GuideBox>
	)
}

export default Tool;