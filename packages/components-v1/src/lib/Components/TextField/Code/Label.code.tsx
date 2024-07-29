import { TextField } from "@midasit-dev/moaui-components-v1"; /**${comma}*/

const ComponentsTextFieldLabel = () => {
  return (
		<TextField 
			width="100px"
			placeholder="placeholder"
			title="title"
			titlePosition="label"
			disabled={false}
			defaultValue=""
			error={false}
		/>
  );
}; /**${comma}*/

export default ComponentsTextFieldLabel;
