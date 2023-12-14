import { GuideBox, Panel } from "@midasit-dev/moaui";/**${comma}*/

const ComponentsGuideBoxLayout1 = () => {
	const visiable = true;
	const title_wh = { width: "100%", height: 40 };
	const typography_wh = { width: "40%", height: 30 };
	const dropList_wh = { width: "45%", height: 30 };
	const button_wh = { width: "15%", height: 30 };

	return (
		<GuideBox tag="Temperature Gradient Self-Equilibrating Stresses Calculator" show={visiable} width={980} padding={1} itemSpacing={1}>
			<GuideBox show={visiable} fill='1' padding={1} itemDirection='row' itemSpacing={1} width={"97%"}>
				<Panel variant="shadow" width={"33%"}>
					<GuideBox tag="Tree" show={visiable} fill='2' itemSpacing={1} width={"100%"} center>
						<GuideBox tag="Girder Properties" show={visiable} {...title_wh} fill='3' itemHorizontalAlign='center'>

						</GuideBox>
						<GuideBox tag="Girder Type" show={visiable} fill='3' itemDirection="row" itemSpacing={1} width={"96%"}>
							<GuideBox tag="Typography" show={visiable} {...typography_wh} fill='4' itemCenter>

							</GuideBox>
							<GuideBox tag="DropList" show={visiable} {...dropList_wh} fill='4' itemCenter>

							</GuideBox>
							<GuideBox tag="Button" show={visiable} {...button_wh} fill='4' />
						</GuideBox>
						<GuideBox tag="Zone" show={visiable} fill='3' itemDirection='row' itemSpacing={1} width={"96%"}>
							<GuideBox tag="Typography" show={visiable} {...typography_wh} fill='4' itemCenter>

							</GuideBox>
							<GuideBox tag="DropList" show={visiable} {...dropList_wh} fill='4' itemCenter>

							</GuideBox>
							<GuideBox tag="Button" show={visiable} {...button_wh} fill='4' />
						</GuideBox>
						<GuideBox tag="Surface" show={visiable} fill='3' itemDirection='row' itemSpacing={1} width={"96%"}>
							<GuideBox tag="Typography" show={visiable} {...typography_wh} fill='4' itemCenter>

							</GuideBox>
							<GuideBox tag="DropList" show={visiable} {...dropList_wh} fill='4' itemCenter>

							</GuideBox>
							<GuideBox tag="Button" show={visiable} {...button_wh} fill='4' />
						</GuideBox>
						<GuideBox tag="Girder Material" show={visiable} fill='3' itemDirection='row' itemSpacing={1} width={"96%"}>
							<GuideBox tag="Typography" show={visiable} {...typography_wh} fill='4' itemCenter>

							</GuideBox>
							<GuideBox tag="DropList" show={visiable} {...dropList_wh} fill='4' itemCenter>

							</GuideBox>
							<GuideBox tag="Button" show={visiable} {...button_wh} fill='4' itemCenter>

							</GuideBox>
						</GuideBox>
						<GuideBox tag="Apply T3" show={visiable} fill='3' itemDirection='row' itemSpacing={1} width={"96%"}>
							<GuideBox tag="Typography" show={visiable} {...typography_wh} fill='4' itemCenter>

							</GuideBox>
							<GuideBox tag="DropList" show={visiable} {...dropList_wh} fill='4' itemCenter>

							</GuideBox>
							<GuideBox tag="Button" show={visiable} {...button_wh} fill='4' itemCenter>

							</GuideBox>
						</GuideBox>
						<GuideBox tag="Tables" show={visiable} width={"96%"} height={162} fill='3'>

						</GuideBox>
					</GuideBox>
				</Panel>
				<Panel variant="shadow" width={"33%"}>
					<GuideBox tag="Chart1" show={visiable} fill='2' itemSpacing={1} width={"100%"} center>
						<GuideBox tag="Temperature Gradient" show={visiable} {...title_wh} fill='3' itemHorizontalAlign='center' itemVerticalAlign="center">

						</GuideBox>
						<GuideBox tag="ChartLine" show={visiable} width={"96%"} height={352} fill='3'>

						</GuideBox>
					</GuideBox>
				</Panel>
				<Panel variant="shadow" width={"33%"}>
					<GuideBox tag="Chart2" show={visiable} fill='2' itemSpacing={1} width={"100%"} center>
						<GuideBox tag="Self-Equilibrating Stresses" show={visiable} {...title_wh} fill='3' itemHorizontalAlign='center' itemVerticalAlign="center">

						</GuideBox>
						<GuideBox tag="ChartLine" show={visiable} width={"96%"} height={352} fill='3'>

						</GuideBox>
					</GuideBox>
				</Panel>
			</GuideBox>
			<GuideBox tag="Bottom" show={visiable} fill='1' itemSpacing={1} itemDirection='row' padding={1} width={"97%"} horSpaceBetween>
				<GuideBox tag="Left Buttons" show={visiable} width={"30%"} height={30} fill='2' itemDirection='row' itemSpacing={1}>
					<GuideBox tag="Help" show={visiable} {...button_wh} fill='4' >

					</GuideBox>
					<GuideBox tag="Import Section Button" show={visiable} width={"85%"} height={30} fill='4'>

					</GuideBox>
				</GuideBox>
				<GuideBox tag="Right Buttons" show={visiable} width={"70%"} fill='2' itemSpacing={1} itemDirection='row' itemHorizontalAlign='right'>
					<GuideBox tag="Typography" show={visiable} width={"85%"} height={30} fill='4' itemHorizontalAlign='left' itemVerticalAlign='center'>

					</GuideBox>
					<GuideBox tag="Import Section Button" show={visiable} width={"15%"} height={30} fill='4' itemHorizontalAlign="right" itemVerticalAlign="center">

					</GuideBox>
				</GuideBox>
			</GuideBox>
		</GuideBox>
	);
};/**${comma}*/

export default ComponentsGuideBoxLayout1;