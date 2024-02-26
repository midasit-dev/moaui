import React from 'react';

import { 
	GuideBox, 
	ComponentsTypographyH1,
	Panel,
	Button,

	TemplatesDualComponentsTypographyDropListSpaceBetween,
	ComponentsIconButtonWithName,
	ComponentsTabGroupWithTable,
	ComponentsChartLineAxisPointSize,
	ComponentsChartLineAxisTopRight,
	ComponentsDialogHelpIconButton,
	ComponentsTypographyBody1,
} from "@midasit-dev/moaui";

const ComponentsGuideBoxLayout1 = () => {
	const visible = false;

	return (
		<GuideBox show={visible} padding={1}>
			{/** Top Panels */}
			<GuideBox show={visible} width={910} padding={1} row spacing={2} center>

				<Panel variant='shadow2' height={520}>
					<GuideBox show={visible} fill='2'>
						<GuideBox show={visible} width='100%' height={60} fill='3' center>
							<ComponentsTypographyH1 />
						</GuideBox>
						<GuideBox show={visible} width='100%' fill='3' spacing={1}>
							<GuideBox show={visible} width='100%' spacing={1} row>
								<TemplatesDualComponentsTypographyDropListSpaceBetween width='100%' />
								<GuideBox show={visible} width={43} height={30} />
							</GuideBox>
							<GuideBox show={visible} width='100%' spacing={1} row>
								<TemplatesDualComponentsTypographyDropListSpaceBetween width='100%' />
								<GuideBox show={visible} width={43} height={30} />
							</GuideBox>
							<GuideBox show={visible} width='100%' spacing={1} row>
								<TemplatesDualComponentsTypographyDropListSpaceBetween width='100%' />
								<GuideBox show={visible} width={43} height={30} />
							</GuideBox>
							<GuideBox show={visible} width='100%' spacing={1} row>
								<TemplatesDualComponentsTypographyDropListSpaceBetween width='100%' />
								<ComponentsIconButtonWithName iconName='Refresh' />
							</GuideBox>
							<GuideBox show={visible} width='100%' spacing={1} row>
								<TemplatesDualComponentsTypographyDropListSpaceBetween width='100%' />
								<ComponentsIconButtonWithName iconName='Help' />
							</GuideBox>
						</GuideBox>
						<GuideBox show={visible} width='100%' fill='3'>
							<ComponentsTabGroupWithTable />
						</GuideBox>
					</GuideBox>
				</Panel>
				<Panel variant='shadow2' height={520}>
					<GuideBox show={visible} fill='2' spacing={2}>
							<GuideBox show={visible} width='100%' height={60} fill='3' center>
								<ComponentsTypographyH1 />
							</GuideBox>
							<GuideBox show={visible} width='100%' fill='3' center>
								<ComponentsChartLineAxisTopRight />
							</GuideBox>
					</GuideBox>
				</Panel>
				<Panel variant='shadow2' height={520}>
					<GuideBox show={visible} fill='2' spacing={2}>
						<GuideBox show={visible} width='100%' height={60} fill='3' center>
							<ComponentsTypographyH1 />
						</GuideBox>
						<GuideBox show={visible} width='100%' fill='3' center>
							<ComponentsChartLineAxisPointSize />
						</GuideBox>
					</GuideBox>
				</Panel>

			</GuideBox>

			{/** Bottom Buttons */}
			<GuideBox show={visible} width={910} row padding={1} fill='2' center>
				<GuideBox show={visible} width="30%" height={30} fill='3' row spacing={2} verCenter>
					<ComponentsDialogHelpIconButton />
					<Button>Import Section</Button>
				</GuideBox>
				<GuideBox show={visible} width="69%" height={30} fill='4' row spacing={0} horSpaceBetween verCenter>
					<ComponentsTypographyBody1 />
					<Button color="negative">Add</Button>
				</GuideBox>
			</GuideBox>
		</GuideBox>
	);
};

export default ComponentsGuideBoxLayout1;