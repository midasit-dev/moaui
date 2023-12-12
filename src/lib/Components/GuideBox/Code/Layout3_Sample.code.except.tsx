import { GuideBox } from "@midasit-dev/moaui";/**${comma}*/

import {
	TemplatesTendonProfileConverterUpdateButton,
	TemplatesTendonProfileConverterList,
	TemplatesTendonProfileConverterBottomButtons,
} from "@midasit-dev/moaui";/**${comma}*/

const ComponentsGuideBoxLayout3Sample = () => {
	const visible = false;
	return (
		<GuideBox tag="Tendon Profile Converter" show={visible} fill='1' padding={1} itemSpacing={1}>
			<GuideBox tag="Update Button" show={visible} fill='2'>
				<TemplatesTendonProfileConverterUpdateButton />
			</GuideBox>
			<GuideBox tag="List" show={visible} fill='2'>
				<TemplatesTendonProfileConverterList />
			</GuideBox>
			<GuideBox tag="Bottom Buttons" show={visible} fill='2' itemSpacing={2.5} row>
				<TemplatesTendonProfileConverterBottomButtons />
			</GuideBox>
		</GuideBox>
	);
};/**${comma}*/

export default ComponentsGuideBoxLayout3Sample;