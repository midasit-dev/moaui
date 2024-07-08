import { GuideBox } from "@midasit-dev/moaui";

const ComponentsGuideBoxLayout4 = () => {
	const visible = true;
	return (
		<GuideBox tag="Outline" show={visible} width={640} fill='1' padding={1} center spacing={1}>
			<GuideBox tag="Column" show={visible} width={"100%"} fill='1' center>
				<GuideBox show={visible} fill='3' width={"98%"} height={30} />
				<GuideBox show={visible} fill='3' width={"98%"} height={30} />
				<GuideBox show={visible} fill='3' width={"98%"} height={30} />
			</GuideBox>
			<GuideBox tag="Row" show={visible} width={"98%"} fill='2' padding={0} row>
				<GuideBox show={visible} fill='3' height={30} />
				<GuideBox show={visible} fill='3' height={30} />
				<GuideBox show={visible} fill='3' height={30} />
				<GuideBox show={visible} fill='3' height={30} />
				<GuideBox show={visible} fill='3' height={30} />
				<GuideBox show={visible} fill='3' height={30} />
			</GuideBox>
			<GuideBox tag="Components Sample" width={"98%"} show={visible} fill='1' spacing={1} row>
				<GuideBox show={visible} tag="DropLists" fill='2' width={"50%"} height={258}></GuideBox>
				<GuideBox show={visible} tag="DropLists" fill='2' width={"50%"} height={258}></GuideBox>
			</GuideBox>
		</GuideBox>
	);
};

export default ComponentsGuideBoxLayout4;