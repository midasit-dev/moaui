import React from 'react';
import Moaui from '@midasit-dev/moaui';
import onClickHandler from '../../../Shared/OnClickHandler';

interface HeadLineProps {
	title: string;
	containerSize: { width: number, height: number };
	bgColor: string;
}

const HeadLine = (props: HeadLineProps) => {
	const { 
		title,
		containerSize,
		bgColor,
	} = props;

	const onClickUpdate = React.useCallback(async () => onClickHandler({
		path: '/public/manifest-json',
		body: {
			short_name: title,
			name: title,
			width: containerSize.width,
			height: containerSize.height,
			background_color: bgColor,
		},
		method: 'put',
	}), [bgColor, containerSize.height, containerSize.width, title]);

	return (
		<Moaui.GuideBox
			width="100%"
			spacing={2}
			verCenter
			paddingBottom={2}
		>
			<Moaui.GuideBox width="100%" row verCenter horSpaceBetween>
				<Moaui.GuideBox width="100%" row verCenter spacing={1}>
					<Moaui.Icon iconName='Article' />
					<Moaui.Typography variant='h1'>Modify 'manifest.json'</Moaui.Typography>
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
					placement='right'
				>
					<Moaui.Button
						width='90px'
						color='negative'
						onClick={onClickUpdate}
					>
						Update
					</Moaui.Button>
				</Moaui.Tooltip>
			</Moaui.GuideBox>
		</Moaui.GuideBox>
	)
}

export default HeadLine;