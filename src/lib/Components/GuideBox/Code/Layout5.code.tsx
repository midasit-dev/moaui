import { GuideBox } from "@midasit-dev/moaui";/**${comma}*/

const ComponentsGuideBoxLayout5 = () => {
	const visible = true;
	return (
		<GuideBox tag="Outline" show={visible} fill='1' padding={1} itemSpacing={1}>
			<GuideBox tag="Column" show={visible} fill='2' padding={1}>
				<GuideBox show={visible} fill='3' width={640} height={30} />
				<GuideBox show={visible} fill='3' width={640} height={30} />
				<GuideBox show={visible} fill='3' width={640} height={30} />
			</GuideBox>
			<GuideBox tag="Row" show={visible} fill='2' padding={1} row>
				<GuideBox show={visible} fill='3' width={100} height={30} />
				<GuideBox show={visible} fill='3' width={100} height={30} />
				<GuideBox show={visible} fill='3' width={100} height={30} />
				<GuideBox show={visible} fill='3' width={100} height={30} />
				<GuideBox show={visible} fill='3' width={100} height={30} />
				<GuideBox show={visible} fill='3' width={100} height={30} />
			</GuideBox>
			<GuideBox tag="Components Sample" show={visible} fill='1' padding={1} itemSpacing={1} row>
				<GuideBox show={visible} tag="DropLists" fill='2' width={316} height={258}></GuideBox>
				<GuideBox show={visible} tag="DropLists" fill='2' width={316} height={258}></GuideBox>
			</GuideBox>
		</GuideBox>
	);
};/**${comma}*/

export default ComponentsGuideBoxLayout5;