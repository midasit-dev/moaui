import { TextFieldV2 } from "@midasit-dev/moaui";/**${comma}*/

const ComponentsTextFieldSingleTitle = () => {
  return (
		<>
			<TextFieldV2
				width="100px"
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
				width="100px"
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
