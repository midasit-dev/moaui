import { useState } from 'react';/**${comma}*/
import { 
	Icon,
	Panel,
	FloatingBox,
	type FloatingBoxProps,
	type GuideBoxProps,
} from "@midasit-dev/moaui";/**${comma}*/

const guideBoxProperties: GuideBoxProps = {
	show: false,
	width: 100,
	height: 100,
	fill: '1',
	row: true,
	center: true,
}/**${comma}*/

const floatingBoxProperties: FloatingBoxProps = {
	show: true,
	width: 100,
	height: 100,
	x: 32,
	y: 32,
	fill: '1',

	guideBoxProps: guideBoxProperties,
}/**${comma}*/

const FloatingBoxSample = () => {
	const [fill, setFill] = useState('1');
	const [opacity, setOpacity] = useState(1);

	const props = {
		...floatingBoxProperties,
		fill: fill,
		opacity: opacity,
		cursor: 'pointer',
		transition: 'opacity 0.4s ease',
		onMouseOver: () => setOpacity(0.7),
		onMouseLeave: () => setOpacity(1),
		onMouseDown: () => setFill('2'),
		onMouseUp: () => setFill('1'),
		onClick: () => console.log('clicked!'),
	};

	return (
		<FloatingBox {...props}>
			<Icon iconName='LooksOne' />
			<Icon iconName='LooksTwo' />
			<Icon iconName='Looks3' />
		</FloatingBox>
	);
}/**${comma}*/

const ComponentsFloatingBoxMouseEvents = () => {
	return (
		<Panel
			variant="shadow2"
			width={300}
			height={300}
			relative
		>
			<FloatingBoxSample />	
		</Panel>
	);		
}/**${comma}*/

export default ComponentsFloatingBoxMouseEvents;