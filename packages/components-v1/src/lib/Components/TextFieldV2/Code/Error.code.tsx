import { TextFieldV2 } from "@midasit-dev/moaui-components-v1"; /**${comma}*/

const ComponentsTextFieldError = () => {
  return (
		<TextFieldV2 
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
