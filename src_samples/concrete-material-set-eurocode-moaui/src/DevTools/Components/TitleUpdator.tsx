import React from 'react';
import Moaui from '@midasit-dev/moaui';
import Header from './Shared/Header';
import onClickHandler from './Shared/OnClickHandler';

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

	const onClickUpdate = React.useCallback(async () => onClickHandler({
		path: '/public/manifest-json',
		body: { 
			short_name: title, 
			name: title,
		},
		method: 'put',
	}), [title]);

	const [show, setShow] = React.useState(true);

	return (
		<Moaui.GuideBox width="100%" spacing={2} center>

			<Header 
				iconName='Title'
				title='Plug-in Title' 
				showState={[show, setShow]}
			/>

			{show &&
				<Moaui.GuideBox row width="100%" horSpaceBetween verCenter spacing={2}>
					<Moaui.Tooltip
						title="Enter the title you want to change."
						placement='top'
					>
						<Moaui.TextField
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
					</Moaui.Tooltip>

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