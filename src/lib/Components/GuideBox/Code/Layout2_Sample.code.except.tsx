import { GuideBox } from "@midasit-dev/moaui";/**${comma}*/

import { 
	Button,
	Check,
	Panel,
	Typography,

	ComponentsTableWithTitle,
	TemplatesDualComponentsTypographyDropListSpaceBetween,
	TemplatesDualComponentsTypographyTextFieldSpaceBetween,
} from "@midasit-dev/moaui";/**${comma}*/

const ComponentsGuideBoxLayout2Sample = () => {
	const visible = false;

	return (
		<GuideBox tag="Group Pile Creator" show={visible} padding={1} spacing={1} fill='1'>
			<GuideBox tag="Content" show={visible} row padding={1} spacing={1} fill='2'>
				{/* Content Left */}
				<GuideBox tag="Content Left" show={visible} padding={1} spacing={1.5} fill='3'>
					<GuideBox tag="Title" show={visible} width={300} height={30} center>
						<Typography variant="h1">Title</Typography>
					</GuideBox>
					<GuideBox tag="DropList & TextField" show={visible} spacing={2}>
						<TemplatesDualComponentsTypographyDropListSpaceBetween />
						<TemplatesDualComponentsTypographyDropListSpaceBetween />
						<TemplatesDualComponentsTypographyDropListSpaceBetween />
						<TemplatesDualComponentsTypographyDropListSpaceBetween />
						<TemplatesDualComponentsTypographyDropListSpaceBetween />
						<TemplatesDualComponentsTypographyDropListSpaceBetween />
						<TemplatesDualComponentsTypographyTextFieldSpaceBetween />
						<TemplatesDualComponentsTypographyTextFieldSpaceBetween />
					</GuideBox>
				</GuideBox>

				{/* Content Right */}
				<GuideBox tag="Content Right" show={visible} fill='3' spacing={1} padding={1}>
					<Panel variant="shadow">
						<GuideBox tag="Title" show={visible} fill='4' width={300} center>
							<ComponentsTableWithTitle title="Title" />
						</GuideBox>
					</Panel>
					<GuideBox tag="DropList & TextField" show={visible} fill='4' width={320} horSpaceBetween spacing={1}>
						<TemplatesDualComponentsTypographyDropListSpaceBetween 	width={320} />
						<TemplatesDualComponentsTypographyTextFieldSpaceBetween width={320} />
						<TemplatesDualComponentsTypographyTextFieldSpaceBetween width={320} />
						<TemplatesDualComponentsTypographyTextFieldSpaceBetween width={320} />
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