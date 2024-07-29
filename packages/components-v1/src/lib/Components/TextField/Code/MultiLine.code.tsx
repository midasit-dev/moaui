import { TextField } from "@midasit-dev/moaui-components-v1"; /**${comma}*/

const ComponentsTextFieldBasic = () => {
  return (
		<TextField 
			width="200px"
			placeholder="multiline textfield"
			title="body"
			titlePosition="label"
			multiline
			rows={8}
		/>
  );
}; /**${comma}*/

export default ComponentsTextFieldBasic;
