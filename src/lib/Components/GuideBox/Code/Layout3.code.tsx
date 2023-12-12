import { 
	GuideBox,
	// ↓↓↓ Import Templates ↓↓↓

 } from "@midasit-dev/moaui";/**${comma}*/

const ComponentsGuideBoxLayout3 = () => {
	const visible = true;
	return (
		<GuideBox tag="Tendon Profile Converter" show={visible} fill='1' padding={1} itemSpacing={1}>
			<GuideBox tag="Update Button" show={visible} fill='2' padding={0} width={300} height={30}>
				{/** ↓↓↓ Update Button ↓↓↓ */}

			</GuideBox>
			<GuideBox tag="List" show={visible} fill='2' padding={0} width={300} height={422}>
				{/** ↓↓↓ List ↓↓↓ */}

			</GuideBox>
			<GuideBox tag="Bottom Buttons" 	show={visible} fill='2' padding={0} width={300} height={30}>
				{/** ↓↓↓ Bottom Buttons ↓↓↓ */}

			</GuideBox>
		</GuideBox>
	);
};/**${comma}*/

export default ComponentsGuideBoxLayout3;