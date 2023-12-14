import { GuideBox } from "@midasit-dev/moaui";/**${comma}*/

import { 
	ComponentsTypographyH1,
	ComponentsTypographyBody1,
	ComponentsDropListDropdown,
	TextField,
	Button,
	ComponentsTableWithTitle,
	Check,
	Panel,
} from "@midasit-dev/moaui";/**${comma}*/

const ComponentsGuideBoxLayout2Sample = () => {
	const visible = false;

	return (
		<GuideBox tag="Group Pile Creator" show={visible} padding={1} spacing={1} fill='1'>
			<GuideBox tag="Content" show={visible} row padding={1} spacing={1} fill='2'>
				{/* Content Left */}
				<GuideBox tag="Content Left" show={visible} padding={1} spacing={1.5} fill='3'>
					<GuideBox tag="Group Pile Option" show={visible} fill='4' width={300} height={40} center>
						<ComponentsTypographyH1 />
					</GuideBox>
					<GuideBox tag="Structure Group" show={visible} fill='4' width={300} row verCenter horSpaceBetween spacing={0}>
						<ComponentsTypographyBody1 />
						<ComponentsDropListDropdown />
					</GuideBox>
					<GuideBox tag="Boundary Group" show={visible} fill='4' width={300} row verCenter horSpaceBetween spacing={0}>
						<ComponentsTypographyBody1 />
						<ComponentsDropListDropdown />
					</GuideBox>
					<GuideBox tag="Pile Material" show={visible} fill='4' width={300} row verCenter horSpaceBetween spacing={0}>
						<ComponentsTypographyBody1 />
						<ComponentsDropListDropdown />
					</GuideBox>
					<GuideBox tag="Pile Section" show={visible} fill='4' width={300} row verCenter horSpaceBetween spacing={0}>
						<ComponentsTypographyBody1 />
						<ComponentsDropListDropdown />
					</GuideBox>
					<GuideBox tag="Pile Cap Material" show={visible} fill='4' width={300} row verCenter horSpaceBetween>
						<ComponentsTypographyBody1 />
						<ComponentsDropListDropdown />
					</GuideBox>
					<GuideBox tag="Pile Cap Section" show={visible} fill='4' width={300} row verCenter horSpaceBetween>
						<ComponentsTypographyBody1 />
						<ComponentsDropListDropdown />
					</GuideBox>
					<GuideBox tag="Pile Start Node No." show={visible} fill='4' width={300} row verCenter horSpaceBetween>
						<ComponentsTypographyBody1 />
						<TextField title="" width={100} placeholder="typing ..."/>
					</GuideBox>
					<GuideBox tag="Pile Cap Start Node No." show={visible} fill='4' width={300} row verCenter horSpaceBetween>
						<ComponentsTypographyBody1 />
						<TextField title="" width={100} placeholder="typing ..."/>
					</GuideBox>
				</GuideBox>

				{/* Content Right */}
				<GuideBox tag="Content Right" show={visible} fill='3' spacing={1} padding={1}>
					<Panel variant="shadow">
						<GuideBox tag="Group Pile & Cap Option" show={visible} fill='4' width={300} center>
								<ComponentsTableWithTitle />
						</GuideBox>
					</Panel>
					<GuideBox tag="Length Unit" show={visible} fill='4' width={320} row verCenter horSpaceBetween>
						<ComponentsTypographyBody1 />
						<ComponentsDropListDropdown />
					</GuideBox>
					<GuideBox tag="Pile Diameter" show={visible} fill='4' width={320} row verCenter horSpaceBetween>
						<ComponentsTypographyBody1 />
						<TextField title="" width={100} placeholder="typing ..."/>
					</GuideBox>
					<GuideBox tag="Pile Length" show={visible} fill='4' width={320} row verCenter horSpaceBetween>
						<ComponentsTypographyBody1 />
						<TextField title="" width={100} placeholder="typing ..."/>
					</GuideBox>
					<GuideBox tag="Pile Cap Height" show={visible} fill='4' width={320} row verCenter horSpaceBetween>
						<ComponentsTypographyBody1 />
						<TextField title="" width={100} placeholder="typing ..."/>
					</GuideBox>
				</GuideBox>
			</GuideBox>

			{/* Footer */}
			<GuideBox tag="Footer" show={visible} row padding={1} spacing={0} fill='2'>
				<GuideBox tag="Footer Left" show={visible} fill='3' width={304} height={30} padding={1}>
					<GuideBox tag="Refresh" show={visible} fill='4' width={100} height={30} verCenter>
						<Button>Refresh</Button>
					</GuideBox>
				</GuideBox>
				<GuideBox tag="Footer Right" show={visible} fill='4' width={324} height={30} padding={1} row horSpaceBetween verCenter>
					<Check name='Text' namePlacement='start'/>
					<Button color='negative'>Create</Button>
				</GuideBox>
			</GuideBox>
		</GuideBox>
	);
};/**${comma}*/

export default ComponentsGuideBoxLayout2Sample;