import { GuideBox, Button } from "@midasit-dev/moaui-components-v1";/**${comma}*/

const ComponentsGuideBoxOpacity = () => {
	return (
		<GuideBox show fill='2' padding={3}>
			<GuideBox show padding={3} fill='3' spacing={2} loading>
				{/** Type your components ... */}
				<Button>Button 1</Button>
				<Button color="negative">Button 2</Button>
				<Button>Button 3</Button>
				<Button color="negative">Button 4</Button>
			</GuideBox>
		</GuideBox>
	);
};/**${comma}*/

export default ComponentsGuideBoxOpacity;