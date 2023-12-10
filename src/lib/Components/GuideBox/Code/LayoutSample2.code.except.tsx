import { GuideBox, Button, Panel } from "@midasit-dev/moaui";
import { 
	ComponentsTabGroupWithTable, 
	ComponentsDialogHelpIconButton, 
	ComponentsChartLineAxisPointSize, 
	ComponentsChartLineAxisTopRight,
	ComponentsTypographyH1,
	ComponentsTypographyBody1,
	ComponentsDropListDropdown,
	ComponentsIconButtonWithName,
} from "@midasit-dev/moaui";

const ComponentsGuideBoxRowDirection = () => {
	const visiable = true;
	const title_h = { height: 40 };
	const typography_wh = { width: 120, height: 30 };
	const dropList_wh = { width: 130, height: 30 };
	const button_wh = { width: 30, height: 30 };

	return (
		<GuideBox tag="Temperature Gradient Self-Equilibrating Stresses Calculator" show={visiable} padding={1} itemSpacing={1}>
			<GuideBox show={visiable} fill='1' padding={1} itemDirection='row' itemSpacing={1}>
				<Panel variant="shadow">
					<GuideBox tag="Tree" show={visiable} fill='2' itemSpacing={1}>
						<GuideBox tag="Girder Properties" show={visiable} {...title_h} fill='3' itemCenter>
							<ComponentsTypographyH1 />
						</GuideBox>
						<GuideBox tag="Girder Type" show={visiable} fill='3' itemDirection="row" itemSpacing={1}>
							<GuideBox tag="Typography" show={visiable} {...typography_wh} fill='4' itemCenter>
								<ComponentsTypographyBody1 />
							</GuideBox>
							<GuideBox tag="DropList" show={visiable} {...dropList_wh} fill='4' itemCenter>
								<ComponentsDropListDropdown />
							</GuideBox>
						</GuideBox>
						<GuideBox tag="Zone" show={visiable} fill='3' itemDirection='row' itemSpacing={1}>
							<GuideBox tag="Typography" show={visiable} {...typography_wh} fill='4' itemCenter>
								<ComponentsTypographyBody1 />
							</GuideBox>
							<GuideBox tag="DropList" show={visiable} {...dropList_wh} fill='4' itemCenter>
								<ComponentsDropListDropdown />
							</GuideBox>
						</GuideBox>
						<GuideBox tag="Surface" show={visiable} fill='3' itemDirection='row' itemSpacing={1}>
							<GuideBox tag="Typography" show={visiable} {...typography_wh} fill='4' itemCenter>
								<ComponentsTypographyBody1 />
							</GuideBox>
							<GuideBox tag="DropList" show={visiable} {...dropList_wh} fill='4' itemCenter>
								<ComponentsDropListDropdown />
							</GuideBox>
						</GuideBox>
						<GuideBox tag="Girder Material" show={visiable} fill='3' itemDirection='row' itemSpacing={1}>
							<GuideBox tag="Typography" show={visiable} {...typography_wh} fill='4' itemCenter>
								<ComponentsTypographyBody1 />
							</GuideBox>
							<GuideBox tag="DropList" show={visiable} {...dropList_wh} fill='4' itemCenter>
								<ComponentsDropListDropdown />
							</GuideBox>
							<GuideBox tag="Button" show={visiable} {...button_wh} fill='4' itemCenter>
								<ComponentsIconButtonWithName iconName="Refresh" />
							</GuideBox>
						</GuideBox>
						<GuideBox tag="Apply T3" show={visiable} fill='3' itemDirection='row' itemSpacing={1}>
							<GuideBox tag="Typography" show={visiable} {...typography_wh} fill='4' itemCenter>
								<ComponentsTypographyBody1 />
							</GuideBox>
							<GuideBox tag="DropList" show={visiable} {...dropList_wh} fill='4' itemCenter>
								<ComponentsDropListDropdown />
							</GuideBox>
							<GuideBox tag="Button" show={visiable} {...button_wh} fill='4' itemCenter>
								<ComponentsDialogHelpIconButton />
							</GuideBox>
						</GuideBox>
						<GuideBox tag="Tables" show={visiable} fill='3' itemCenter>
							<ComponentsTabGroupWithTable />
						</GuideBox>
					</GuideBox>
				</Panel>
				<Panel variant="shadow">
					<GuideBox tag="Chart1" show={visiable} fill='2' itemSpacing={1}>
						<GuideBox tag="Temperature Gradient" show={visiable} width={300} {...title_h} fill='3' itemCenter>
							<ComponentsTypographyH1 />
						</GuideBox>
						<GuideBox tag="ChartLine" show={visiable} width={302} height={434} fill='3' itemCenter>
							<ComponentsChartLineAxisTopRight />
						</GuideBox>
					</GuideBox>
				</Panel>
				<Panel variant="shadow">
				<GuideBox tag="Chart2" show={visiable} fill='2' itemSpacing={1}>
					<GuideBox tag="Self-Equilibrating Stresses" show={visiable} width={280} {...title_h} fill='3' itemCenter>
						<ComponentsTypographyH1 />
					</GuideBox>
					<GuideBox tag="ChartLine" show={visiable} height={434} fill='3' itemCenter>
						<ComponentsChartLineAxisPointSize />
					</GuideBox>
				</GuideBox>
				</Panel>
			</GuideBox>
			<GuideBox tag="Bottom" show={visiable} fill='1' itemSpacing={1} itemDirection='row' padding={1}>
				<GuideBox tag="Left Buttons" show={visiable} width={180} height={30} fill='2' itemDirection='row' itemSpacing={1}>
					<GuideBox tag="Help" show={visiable} {...button_wh} fill='4' itemCenter>
						<ComponentsDialogHelpIconButton />
					</GuideBox>
					<GuideBox tag="Import Section Button" show={visiable} width={143} height={30} fill='4' itemCenter>
						<Button>Import Section</Button>
					</GuideBox>
				</GuideBox>
				<GuideBox tag="Space" show={visiable} width={200} fill='2'>
				</GuideBox>
				<GuideBox tag="Right Buttons" show={visiable} width={557} fill='2' itemSpacing={1} itemDirection='row' itemHorizontalAlign='right'>
					<GuideBox tag="Typography" show={visiable} width={350} fill='4' itemHorizontalAlign='left' itemVerticalAlign='center'>
							<ComponentsTypographyBody1 />
					</GuideBox>
					<GuideBox tag="Import Section Button" show={visiable} width={80} height={30} fill='4' itemHorizontalAlign="right" itemVerticalAlign="center">
						<Button color="negative">Add</Button>
					</GuideBox>
				</GuideBox>
			</GuideBox>
		</GuideBox>
	);
};

export default ComponentsGuideBoxRowDirection;