import React from 'react';
import Moaui from '@midasit-dev/moaui';
import { HexColorPicker } from "react-colorful";
import Header from './Shared/Header';
import onClickHandler from './Shared/OnClickHandler';

/**
 * Container Background Color Updator
 * 
 * @description You can change the background color of the container (your plug-in item).
 */

interface ToolProps {
	containerBackgroundColorState: [string, React.Dispatch<React.SetStateAction<string>>];
}

const Tool = (props: ToolProps) => {
	const { containerBackgroundColorState } = props;
	const [color, setColor] = containerBackgroundColorState;
	const [show, setShow] = React.useState(true);

	const onClickUpdate = React.useCallback(async () => onClickHandler({
		path: '/public/manifest-json',
		body: {
			background_color: color,
		},
		method: 'put',
	}), [color]);

	return (
		<Moaui.GuideBox width="100%" spacing={2.5} center>

			<Header
				iconName='Palette'
				title='Container Background Color'
				showState={[show, setShow]}
			/>

			{show &&
				<Moaui.GuideBox width="100%" center spacing={2}>
					<HexColorPicker color={color} onChange={setColor} />

					<Moaui.GuideBox row width="100%" spacing={2} horSpaceBetween>
						<Moaui.GuideBox row spacing={2} verCenter>
							<Moaui.Typography>Hex</Moaui.Typography>
							<Moaui.TextField
								width={70}
								value={color}
								onChange={(e) => setColor(e.target.value)}
							/>
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
				</Moaui.GuideBox>
			}

		</Moaui.GuideBox>
	)
}

export default Tool;