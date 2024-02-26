import { GuideBox } from "@midasit-dev/moaui";/**${comma}*/

const ComponentsGuideBoxLayout2 = () => {
	const visible = true;

	return (
		<GuideBox tag="ContentOutline" show={visible} spacing={1} width={600} fill='1' center padding={1}>
			<GuideBox tag="Content" show={visible} row fill='2' width={"100%"} center>
				{/* Content Left */}
				<GuideBox tag="Content Left" show={visible} padding={1} spacing={1} fill='3' width={"50%"}>
				
					<GuideBox tag="Group Pile Option" show={visible} fill='4' width={"100%"} height={40}>

					</GuideBox>
					<GuideBox tag="Structure Group" show={visible} fill='4' width={"100%"} height={30}>

					</GuideBox>
					<GuideBox tag="Boundary Group" show={visible} fill='4'width={"100%"} height={30}>
						
					</GuideBox>
					<GuideBox tag="Pile Material" show={visible} fill='4' width={"100%"} height={30}>
						
					</GuideBox>
					<GuideBox tag="Pile Section" show={visible} fill='4' width={"100%"} height={30}>
						
					</GuideBox>
					<GuideBox tag="Pile Cap Material" show={visible} fill='4' width={"100%"} height={30}>
						
					</GuideBox>
					<GuideBox tag="Pile Cap Section" show={visible} fill='4' width={"100%"} height={30}>
						
					</GuideBox>
					<GuideBox tag="Pile Start Node No." show={visible} fill='4' width={"100%"} height={30}>
						
					</GuideBox>
					<GuideBox tag="Pile Cap Start Node No." show={visible} fill='4' width={"100%"} height={30}>
						
					</GuideBox>
				</GuideBox>

				{/* Content Right */}
				<GuideBox tag="Content Right" show={visible} fill='3' spacing={1} padding={1} width={"50%"}>
					<GuideBox tag="Group Pile & Cap Option" show={visible} fill='4' width={"100%"} height={192}>

					</GuideBox>
					<GuideBox tag="Length Unit" show={visible} fill='4' width={"100%"} height={30}>
					
					</GuideBox>
					<GuideBox tag="Pile Diameter" show={visible} fill='4' width={"100%"} height={30}>
					
					</GuideBox>
					<GuideBox tag="Pile Length" show={visible} fill='4' width={"100%"} height={30}>
					
					</GuideBox>
					<GuideBox tag="Pile Cap Height" show={visible} fill='4' width={"100%"} height={30}>
					
					</GuideBox>
				</GuideBox>
			</GuideBox>

			{/* Footer */}
			<GuideBox tag="Footer" show={visible} row fill='2' width={"100%"} horSpaceBetween center spacing={2}>
				<GuideBox tag="Footer Left" show={visible} fill='3' width={"50%"} height={30} >
				</GuideBox>
				<GuideBox tag="Footer Right" show={visible} fill='3' width={"50%"} height={30} row spacing={0}>
				</GuideBox>
			</GuideBox>
		</GuideBox>
	);
};/**${comma}*/

export default ComponentsGuideBoxLayout2;