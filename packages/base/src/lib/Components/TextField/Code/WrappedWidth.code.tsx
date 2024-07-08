import { TextField } from "@midasit-dev/moaui"; /**${comma}*/

const ComponentsTextFieldWrappedWidth = () => {
  return (
		<TextField 
			wrappedWidth='200px'
			width="100px"
			placeholder="placeholder"
			title="cm"
			titlePosition="right"
			disabled={false}
			defaultValue=""
			error={false}
			spacing={2}
		/>
  );
}; /**${comma}*/

export default ComponentsTextFieldWrappedWidth;
