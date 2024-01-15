import Moaui from '@midasit-dev/moaui';

const backgroundStyle = {
	show: true,
	width: 400,
	height: 400,
	center: true,
	fill: '#f8f8f8',
}

const panelStyle = {
	variant: 'shadow2' as const,
	width: 300,
	height: 200,
}

const TestingApp = () => {
	return (
		<Moaui.GuideBox {...backgroundStyle}>
			<Moaui.Panel {...panelStyle}>

			</Moaui.Panel>
		</Moaui.GuideBox>
	);
}

export default TestingApp;
