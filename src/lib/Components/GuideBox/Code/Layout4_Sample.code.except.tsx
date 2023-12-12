import { GuideBox } from "@midasit-dev/moaui";/**${comma}*/

import {
	TemplatesTendonProfileConverterUpdateButton,
	TemplatesTendonProfileConverterList,
	TemplatesTendonProfileConverterSelectButton,
	TemplatesTendonProfileConverterHelpIconButton,
	Typography, 
	Button,
} from "@midasit-dev/moaui";/**${comma}*/

const ComponentsGuideBoxLayout4Sample = () => {
	const visible = false;
	return (
		<GuideBox tag="Tendon Profile Converter" show={visible} fill='1' padding={1} itemSpacing={1}>
			<GuideBox tag="Update Button" show={visible} fill='2' padding={1} itemCenter>
				<TemplatesTendonProfileConverterUpdateButton />
			</GuideBox>
			<GuideBox tag="List" show={visible} fill='2' padding={1} itemCenter>
				<TemplatesTendonProfileConverterList />
			</GuideBox>
			<GuideBox tag="Select Button"	show={visible} fill='2' padding={1} itemCenter>
				<TemplatesTendonProfileConverterSelectButton />
			</GuideBox>
			<GuideBox tag="Bottom Buttons" show={visible} fill='2' padding={1} itemDirection='row' itemCenter itemSpacing={3}>
				<TemplatesTendonProfileConverterHelpIconButton />
				<Typography flexItem textAlign='center'>Convert to</Typography>
				<Button>New</Button>
				<Button color="negative">Modify</Button>
			</GuideBox>
		</GuideBox>
	);
};/**${comma}*/

export default ComponentsGuideBoxLayout4Sample;