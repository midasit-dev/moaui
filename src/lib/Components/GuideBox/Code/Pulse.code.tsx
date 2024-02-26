import { GuideBox, Button } from "@midasit-dev/moaui";/**${comma}*/

const ComponentsGuideBoxOpacity = () => {
	return (
		<GuideBox show fill='2' padding={1} pulse>
			<GuideBox show padding={1} fill='3' row>
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