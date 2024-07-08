import React from 'react';
import m from '@midasit-dev/moaui';

const Sample = () => {
	return (
		<GuideBoxSample />
	)	
}

export default Sample;

const clearContentString = 'initialize!';

const GuideBoxSample = () => {
	const [content, setContent] = React.useState(clearContentString);
	const [loadState, setLoadState] = React.useState(false);

	React.useEffect(() => {
		if (loadState) {
			setTimeout(() => {
				try {
					setContent('created contents!');
				} catch (err) {
					console.error('catch', err);
				} finally {
					setLoadState(false);
				}
			}, 1000);
		}
	}, [loadState]);

	return (
		<m.GuideBox spacing={2} center>
			<m.GuideBox show width={200} height={200} fill='1' center loading={loadState}>
				{content}
			</m.GuideBox>

			<m.Button
				onClick={() => setContent(clearContentString)}
			>
				Clear Content
			</m.Button>
			<m.Button
				color='negative'
				onClick={() => setLoadState(true)}
				loading={loadState}
			>
				Loading Start
			</m.Button>
		</m.GuideBox>
	)
}