import { GuideBox } from "@midasit-dev/moaui";/**${comma}*/

const ComponentsGuideBoxLayout4 = () => {
	const visible = false;
	return (
		<GuideBox tag="Tendon Profile Converter" show={visible} fill='1' padding={1} itemSpacing={1}>
			<GuideBox tag="Update Button" show={visible} fill='2' padding={1} itemCenter></GuideBox>
			<GuideBox tag="List" show={visible} fill='2' padding={1} itemCenter></GuideBox>
			<GuideBox tag="Select Button"	show={visible} fill='2' padding={1} itemCenter></GuideBox>
			<GuideBox tag="Bottom Buttons" show={visible} fill='2' padding={1} itemDirection='row' itemCenter itemSpacing={3}></GuideBox>
		</GuideBox>
	);
};/**${comma}*/

export default ComponentsGuideBoxLayout4;