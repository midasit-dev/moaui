import { TextFieldV2 } from "@midasit-dev/moaui-components-v1"; /**${comma}*/

const ComponentsTextFieldBasic = () => {
  return (
		<TextFieldV2 
			width="200px"
			placeholder="multiline textfield"
			title="body"
			titlePosition="left"
			multiline
			rows={8}
		/>
  );
}; /**${comma}*/

export default ComponentsTextFieldBasic;
