import { GuideBox } from "@midasit-dev/moaui-components-v1";/**${comma}*/

import {
	TemplatesTendonProfileConverterUpdateButton,
	TemplatesTendonProfileConverterList,
	TemplatesTendonProfileConverterBottomButtons,
} from "@midasit-dev/moaui-components-v1";/**${comma}*/

const ComponentsGuideBoxLayout3Sample = () => {
	const visible = false;
	return (
		<GuideBox tag="Tendon Profile Converter" show={visible} fill='1' padding={1} spacing={1}>
			<GuideBox tag="Update Button" show={visible} fill='2' width='100%' center>
				<TemplatesTendonProfileConverterUpdateButton />
			</GuideBox>
			<GuideBox tag="List" show={visible} fill='2'>
				<TemplatesTendonProfileConverterList />
			</GuideBox>
			<GuideBox tag="Bottom Buttons" show={visible} fill='2' spacing={2.5} row width="100%">
				<TemplatesTendonProfileConverterBottomButtons />
			</GuideBox>
		</GuideBox>
	);
};/**${comma}*/

export default ComponentsGuideBoxLayout3Sample;