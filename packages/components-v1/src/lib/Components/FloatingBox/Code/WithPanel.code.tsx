import { 
	Panel,
	FloatingBox,
	type FloatingBoxProps,
} from "@midasit-dev/moaui-components-v1";/**${comma}*/

const floatingBoxProperties: FloatingBoxProps = {
	x: 32,
	y: 32,
	width: 150,
	height: 150,
	show: true,
	fill: '1',
}/**${comma}*/

const ComponentsFloatingBoxWithPanel = () => {
	return (
		<Panel
			variant="shadow2"
			width={300}
			height={300}
			relative
		>
			<FloatingBox {...floatingBoxProperties}/>
		</Panel>
	);		
}/**${comma}*/

export default ComponentsFloatingBoxWithPanel;