import { TextField } from "@midasit-dev/moaui"; /**${comma}*/

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
