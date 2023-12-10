import { GuideBox, Button } from "@midasit-dev/moaui";/**${comma}*/

const ComponentsGuideBoxRowDirection = () => {
	return (
		<GuideBox show fill='2' padding={2}>
			<GuideBox show itemDirection='row' padding={2} fill='3' >
				{/** Type your components ... */}
				<Button>Button 1</Button>
				<Button color="negative">Button 2</Button>
				<Button>Button 3</Button>
				<Button color="negative">Button 4</Button>
			</GuideBox>
		</GuideBox>
	);
};/**${comma}*/

export default ComponentsGuideBoxRowDirection;