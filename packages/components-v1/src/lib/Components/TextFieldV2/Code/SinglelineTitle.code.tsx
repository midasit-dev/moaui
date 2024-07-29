import { TextFieldV2 } from "@midasit-dev/moaui-components-v1";/**${comma}*/

const ComponentsTextFieldSingleTitle = () => {
  return (
		<>
			<TextFieldV2
				width="200px"
				placeholder="placeholder"
				title="verylongtitle"
				titlePosition="left"
				disabled={false}
				defaultValue=""
				error={false}
				gap={2}
				singleLineTitle={true}
			/>
			<TextFieldV2
				width="200px"
				placeholder="placeholder"
				title="verylongtitle"
				titlePosition="left"
				disabled={false}
				defaultValue=""
				error={false}
				gap={2}
				singleLineTitle={false}
			/>
		</>
  );
};/**${comma}*/

export default ComponentsTextFieldSingleTitle;
