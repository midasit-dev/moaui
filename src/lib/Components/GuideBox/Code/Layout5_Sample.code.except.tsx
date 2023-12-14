import {
  GuideBox,
  Panel,
	ComponentsTypographyH1,
	ComponentsTypographyBody1,
	Button,
	DropList,
	TextField,
	Table, TableHead, TableRow, TableCell, TableBody,
	Typography,
} from "@midasit-dev/moaui";

const ComponentsGuideBoxLayout5 = () => {
  const visible = true;
	const headers = ["Component", "column", "Cap 1", "Cap 2"];
	const rows = [
		["Section", <DropList width={"100%"} />, <DropList width={"100%"} />, <DropList width={"100%"} />],
		["Material", <DropList width={"100%"} />, <DropList width={"100%"} />, <DropList width={"100%"} />],
		["Length(+Z)", <TextField width={"100%"} placeholder="12" textAlign="center"/>, <TextField width={"100%"} placeholder="1.2" textAlign="center"/>, <TextField width={"100%"} placeholder="0.15" textAlign="center"/>],
	]
  return (
    <GuideBox
      tag="Outline"
      show={visible}
      fill="1"
      padding={1}
      itemSpacing={1}
      width={430}
      height={430}
      center
    >
      <GuideBox show={visible} fill="2" width={"100%"} height={30} verCenter>
				<ComponentsTypographyH1 />
			</GuideBox>
      <GuideBox show={visible} fill="2" width={"100%"} height={30} row horSpaceBetween verCenter>
				<ComponentsTypographyBody1 />
				<DropList width={"30%"} />
			</GuideBox>
      <GuideBox show={visible} fill="2" width={"100%"} height={30} row horSpaceBetween verCenter>
				<ComponentsTypographyBody1 />
				<DropList width={"30%"} />
			</GuideBox>
      <GuideBox
        show={visible}
        tag="DropLists"
        fill="2"
        width={"100%"}
        height={30}
				row horSpaceBetween verCenter
      >
				<ComponentsTypographyBody1 />
				<TextField width={"130px"} placeholder="TextField"/>
			</GuideBox>
      <GuideBox
        show={visible}
        tag="DropLists"
        fill="2"
        width={"100%"}
        height={30}
				row horSpaceBetween verCenter
      >
				<ComponentsTypographyBody1 />
				<TextField width={"130px"} placeholder="TextField"/>
			</GuideBox>
      <Panel variant="shadow" width={"96%"}>
        <GuideBox
          show={visible}
          tag="DropLists"
          fill="2"
          width={"100%"}
          height={200}
        >
					<Table>
						<TableHead>
							<TableRow>
								{headers.map((header, index) => <TableCell key={index}><Typography textAlign='center'>{header}</Typography></TableCell>)}
							</TableRow>
						</TableHead>
						<TableBody>
								{rows.map((row, index) => {
									return (
										<TableRow key={index}>
											{row.map((cell, index) => <TableCell key={index}>{cell}</TableCell>)}
										</TableRow>
									);
								})}
						</TableBody>
					</Table>
				</GuideBox>
      </Panel>
      <GuideBox
        show={visible}
        tag="DropLists"
        fill="2"
        width={"100%"}
        height={30}
				row horSpaceBetween verCenter
      >
				<Button>Button</Button>
				<Button>Button</Button>
			</GuideBox>
    </GuideBox>
  );
};

export default ComponentsGuideBoxLayout5;
