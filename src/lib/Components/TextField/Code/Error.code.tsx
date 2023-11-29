import { TextField } from "@midasit-dev/moaui"; /**${comma}*/

const ComponentsTextFieldError = () => {
  return (
		<TextField 
			width="100px"
			placeholder="placeholder"
			title="title"
			titlePosition="left"
			disabled={false}
			defaultValue=""
			error={true}
		/>
  );
}; /**${comma}*/

export default ComponentsTextFieldError;
