import { GuideBox, Panel } from "@midasit-dev/moaui";

const ComponentsGuideBoxLayout5 = () => {
	const visible = true;
	return (
		<GuideBox tag="Outline" show={visible} fill='1' padding={1} itemSpacing={1} width={430} height={350} center>
				<GuideBox show={visible} fill='2' width={"100%"} height={30} />
				<GuideBox show={visible} fill='2' width={"100%"} height={30} />
				<GuideBox show={visible} fill='2' width={"100%"} height={30} />
				<GuideBox show={visible} tag="DropLists" fill='2' width={"100%"} height={30}></GuideBox>
				<GuideBox show={visible} tag="DropLists" fill='2' width={"100%"} height={30}></GuideBox>
				<Panel variant="shadow" width={"96%"}>
					<GuideBox show={visible} tag="DropLists" fill='2' width={"100%"} height={130}></GuideBox>
				</Panel>
				<GuideBox show={visible} tag="DropLists" fill='2' width={"100%"} height={30}></GuideBox>
		</GuideBox>
	);
};

export default ComponentsGuideBoxLayout5;