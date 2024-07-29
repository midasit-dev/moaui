import { GuideBox } from "@midasit-dev/moaui-components-v1";/**${comma}*/

const ComponentsGuideBoxFlexGrow = () => {
	return (
		<GuideBox show width={400} height={200} row verCenter>
			<GuideBox show fill='2' width={150} height={150} />
			<GuideBox show fill='3' height={150} flexGrow={1} />
		</GuideBox>
	);		
}/**${comma}*/

export default ComponentsGuideBoxFlexGrow;