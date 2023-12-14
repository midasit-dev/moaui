import { GuideBox } from "@midasit-dev/moaui";/**${comma}*/

const ComponentsGuideBoxLayout4 = () => {
	const visible = true;
	return (
		<GuideBox tag="Outline" show={visible} fill='1' padding={1} itemSpacing={1} width={430} height={350}>
				<GuideBox show={visible} fill='2' width={"100%"} height={30} />
				<GuideBox show={visible} fill='2' width={"100%"} height={30} />
				<GuideBox show={visible} fill='2' width={"100%"} height={30} />
				<GuideBox show={visible} tag="DropLists" fill='2' width={"100%"} height={30}></GuideBox>
				<GuideBox show={visible} tag="DropLists" fill='2' width={"100%"} height={30}></GuideBox>
				<GuideBox show={visible} tag="DropLists" fill='2' width={"100%"} height={100}></GuideBox>
				<GuideBox show={visible} tag="DropLists" fill='2' width={"100%"} height={100}></GuideBox>
		</GuideBox>
	);
};/**${comma}*/

export default ComponentsGuideBoxLayout4;