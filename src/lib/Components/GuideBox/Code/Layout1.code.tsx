import { GuideBox } from "@midasit-dev/moaui";/**${comma}*/

const ComponentsGuideBoxLayoutSample1 = () => {
	const visiable = true;
	const title_h = { height: 40 };
	const typography_wh = { width: 120, height: 30 };
	const dropList_wh = { width: 130, height: 30 };
	const button_wh = { width: 30, height: 30 };

	return (
		<GuideBox tag="Temperature Gradient Self-Equilibrating Stresses Calculator" show={visiable} padding={1} itemSpacing={1}>
			<GuideBox show={visiable} fill='1' padding={1} itemDirection='row' itemSpacing={1}>
				<GuideBox tag="Tree" show={visiable} fill='2' itemSpacing={1}>
					<GuideBox tag="Girder Properties" show={visiable} {...title_h} fill='3'>
					</GuideBox>
					<GuideBox tag="Girder Type" show={visiable} fill='3' itemDirection="row" itemSpacing={1}>
						<GuideBox tag="Typography" show={visiable} {...typography_wh} fill='4' />
						<GuideBox tag="DropList" show={visiable} {...dropList_wh} fill='4' />
					</GuideBox>
					<GuideBox tag="Zone" show={visiable} fill='3' itemDirection='row' itemSpacing={1}>
						<GuideBox tag="Typography" show={visiable} {...typography_wh} fill='4' />
						<GuideBox tag="DropList" show={visiable} {...dropList_wh} fill='4' />
					</GuideBox>
					<GuideBox tag="Surface" show={visiable} fill='3' itemDirection='row' itemSpacing={1}>
						<GuideBox tag="Typography" show={visiable} {...typography_wh} fill='4' />
						<GuideBox tag="DropList" show={visiable} {...dropList_wh} fill='4' />
					</GuideBox>
					<GuideBox tag="Girder Material" show={visiable} fill='3' itemDirection='row' itemSpacing={1}>
						<GuideBox tag="Typography" show={visiable} {...typography_wh} fill='4' />
						<GuideBox tag="DropList" show={visiable} {...dropList_wh} fill='4' />
						<GuideBox tag="Button" show={visiable} {...button_wh} fill='4' />
					</GuideBox>
					<GuideBox tag="Apply T3" show={visiable} fill='3' itemDirection='row' itemSpacing={1}>
						<GuideBox tag="Typography" show={visiable} {...typography_wh} fill='4' />
						<GuideBox tag="DropList" show={visiable} {...dropList_wh} fill='4' />
						<GuideBox tag="Button" show={visiable} {...button_wh} fill='4' />
					</GuideBox>
					<GuideBox tag="Tables" show={visiable} height={162} fill='3'>
					</GuideBox>
				</GuideBox>
				<GuideBox tag="Chart1" show={visiable} fill='2' itemSpacing={1}>
					<GuideBox tag="Temperature Gradient" show={visiable} width={300} {...title_h} fill='3'>
					</GuideBox>
					<GuideBox tag="ChartLine" show={visiable} height={352} fill='3'>
					</GuideBox>
				</GuideBox>
				<GuideBox tag="Chart2" show={visiable} fill='2' itemSpacing={1}>
					<GuideBox tag="Self-Equilibrating Stresses" show={visiable} width={300} {...title_h} fill='3'>
					</GuideBox>
					<GuideBox tag="ChartLine" show={visiable} height={352} fill='3'>
					</GuideBox>
				</GuideBox>
			</GuideBox>
			<GuideBox tag="Bottom" show={visiable} fill='1' itemSpacing={1} itemDirection='row' padding={1}>
				<GuideBox tag="Left Buttons" show={visiable} width={150} height={30} fill='2' itemDirection='row' itemSpacing={1}>
					<GuideBox tag="Help" show={visiable} {...button_wh} fill='4' />
					<GuideBox tag="Import Section Button" show={visiable} width={112} height={30} fill='4' />
				</GuideBox>
				<GuideBox tag="Space" show={visiable} width={250} fill='2'>
				</GuideBox>
				<GuideBox tag="Right Buttons" show={visiable} width={496} fill='2' itemSpacing={1} itemDirection='row' itemHorizontalAlign='right'>
					<GuideBox tag="Typography" show={visiable} width={350} fill='4' />
					<GuideBox tag="Import Section Button" show={visiable} width={80} height={30} fill='4' />
				</GuideBox>
			</GuideBox>
		</GuideBox>
	);
};/**${comma}*/

export default ComponentsGuideBoxLayoutSample1;