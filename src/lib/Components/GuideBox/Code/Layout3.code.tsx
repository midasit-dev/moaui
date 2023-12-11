import { GuideBox } from "@midasit-dev/moaui";/**${comma}*/

const ComponentsGuideBoxLayoutSample5 = () => {
	const depth1 = { show: true, fill: '1', padding: 1 }
	const depth2 = { show: true, fill: '2', padding: 1, width: 300 }
	return (
		<GuideBox tag="Tendon Profile Converter" {...depth1} itemSpacing={1}>
			<GuideBox tag="Update Button" 	{...depth2} height={ 20}></GuideBox>
			<GuideBox tag="List" 						{...depth2} height={300}></GuideBox>
			<GuideBox tag="Select Button" 	{...depth2} height={ 20}></GuideBox>
			<GuideBox tag="Bottom Buttons" 	{...depth2} height={ 20}></GuideBox>
		</GuideBox>
	);
};/**${comma}*/

export default ComponentsGuideBoxLayoutSample5;