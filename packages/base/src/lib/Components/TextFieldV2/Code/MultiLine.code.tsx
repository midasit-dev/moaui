import { TextFieldV2 } from "@midasit-dev/moaui"; /**${comma}*/

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
