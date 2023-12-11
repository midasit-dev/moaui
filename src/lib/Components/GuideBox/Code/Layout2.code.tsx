import { GuideBox } from "@midasit-dev/moaui";/**${comma}*/

const ComponentsGuideBoxLayoutSample3 = () => {
	const visible = true;

	return (
		<GuideBox tag="" show={visible} padding={1} itemSpacing={1} fill='1'>
			<GuideBox tag="Content" show={visible} itemDirection='row' padding={1} itemSpacing={1} fill='2'>
				{/* Content Left */}
				<GuideBox tag="Content Left" show={visible} padding={1} itemSpacing={1} fill='3'>
					<GuideBox tag="Group Pile Option" show={visible} fill='4' width={300} height={40}>

					</GuideBox>
					<GuideBox tag="Structure Group" show={visible} fill='4' width={300} height={30}>

					</GuideBox>
					<GuideBox tag="Boundary Group" show={visible} fill='4' width={300} height={30}>
						
					</GuideBox>
					<GuideBox tag="Pile Material" show={visible} fill='4' width={300} height={30}>
						
					</GuideBox>
					<GuideBox tag="Pile Section" show={visible} fill='4' width={300} height={30}>
						
					</GuideBox>
					<GuideBox tag="Pile Cap Material" show={visible} fill='4' width={300} height={30}>
						
					</GuideBox>
					<GuideBox tag="Pile Cap Section" show={visible} fill='4' width={300} height={30}>
						
					</GuideBox>
					<GuideBox tag="Pile Start Node No." show={visible} fill='4' width={300} height={30}>
						
					</GuideBox>
					<GuideBox tag="Pile Cap Start Node No." show={visible} fill='4' width={300} height={30}>
						
					</GuideBox>
				</GuideBox>

				{/* Content Right */}
				<GuideBox tag="Content Right" show={visible} fill='3' itemSpacing={1} padding={1}>
					<GuideBox tag="Group Pile & Cap Option" show={visible} fill='4' width={300} height={192}>

					</GuideBox>
					<GuideBox tag="Length Unit" show={visible} fill='4' width={300} height={30}>
					
					</GuideBox>
					<GuideBox tag="Pile Diameter" show={visible} fill='4' width={300} height={30}>
					
					</GuideBox>
					<GuideBox tag="Pile Length" show={visible} fill='4' width={300} height={30}>
					
					</GuideBox>
					<GuideBox tag="Pile Cap Height" show={visible} fill='4' width={300} height={30}>
					
					</GuideBox>
				</GuideBox>
			</GuideBox>

			{/* Footer */}
			<GuideBox tag="Footer" show={visible} itemDirection='row' padding={1} itemSpacing={0} fill='2'>
				<GuideBox tag="Footer Left" show={visible} fill='3' width={304} height={30} padding={1}>
				</GuideBox>
				<GuideBox tag="Footer Right" show={visible} fill='4' width={304} height={30} padding={1} itemDirection='row' itemSpacing={0}>
				</GuideBox>
			</GuideBox>
		</GuideBox>
	);
};/**${comma}*/

export default ComponentsGuideBoxLayoutSample3;