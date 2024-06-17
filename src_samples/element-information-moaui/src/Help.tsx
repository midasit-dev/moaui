import React from 'react'; 
import { Dialog, IconButton, Icon, Typography, GuideBox } from "@midasit-dev/moaui";

const HelpButton = () => {
	const [open, setOpen] = React.useState(false);

	const HelpDialog = (props: any) => {
		return (
      <Dialog open={props.open} setOpen={props.setOpen} headerTitle="Help">
        <GuideBox width="auto" spacing={1}>
					{descriptionBox("Elem ID", "Element ID")}
					{descriptionBox("Node Conn", "Node Connectivity")}
					{descriptionBox("Type", "Type")}
					{descriptionBox("Material", "Material Name")}
					{descriptionBox("Section", "Section Name")}
					{descriptionBox("L/A/V", "Length / Area (for Plate) / Volume (for Solid)")}
					{descriptionBox("Weight(U)", "Unit Weight")}
					{descriptionBox("Weight(T)", "Total Weight")}
					{descriptionBox("BER", "Beam End Release")}
					{descriptionBox("F-F", "Fixed-Fixed")}
					{descriptionBox("F-P", "Fixed-Pinned")}
					{descriptionBox("P-F", "Pinned-Fixed")}
					{descriptionBox("P-P", "Pinned-Pinned")}
        </GuideBox>
      </Dialog>
    );
	}

	return (
		<>
			<IconButton transparent onClick={() => setOpen(true)}>
				<Icon iconName="Help" />
			</IconButton>
			<HelpDialog open={open} setOpen={setOpen} />
		</>
	)
}

export default HelpButton;

const descriptionBox = (title: string, desc: string) => {
	return (
    <GuideBox row horSpaceBetween verCenter>
      <Typography variant="h1">{title + ' - '}</Typography>
      <Typography>{desc}</Typography>
    </GuideBox>
  );
}