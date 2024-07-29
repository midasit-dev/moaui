import { 
	Icon,
	Panel,
	FloatingBox,
	type FloatingBoxProps,
	type GuideBoxProps,
} from "@midasit-dev/moaui-components-v1";/**${comma}*/

const guideBoxProperties: GuideBoxProps = {
	show: true,
	width: 'auto',
	height: 100,
	fill: '1',
	row: true,
}/**${comma}*/

const floatingBoxProperties: FloatingBoxProps = {
	show: true,
	width: 200,
	height: 200,
	x: 32,
	y: 32,
	fill: '1',

	guideBoxProps: guideBoxProperties,
}/**${comma}*/

const ComponentsFloatingBoxWithPanel = () => {
	return (
		<Panel
			variant="shadow2"
			width={300}
			height={300}
			relative
		>
			<FloatingBox {...floatingBoxProperties}>
				<Icon iconName='LooksOne' />
				<Icon iconName='LooksTwo' />
				<Icon iconName='Looks3' />
			</FloatingBox>
		</Panel>
	);		
}/**${comma}*/

export default ComponentsFloatingBoxWithPanel;