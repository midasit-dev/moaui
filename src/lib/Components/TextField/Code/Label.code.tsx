import { TextField } from "@midasit-dev/moaui"; /**${comma}*/

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
