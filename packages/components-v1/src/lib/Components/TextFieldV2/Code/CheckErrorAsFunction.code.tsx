import { TextFieldV2 } from "@midasit-dev/moaui-components-v1"; /**${comma}*/

const CheckErrorAsFunction = () => {
  return (
		<TextFieldV2 
			width="100px"
			placeholder="placeholder"
			title="title"
			titlePosition="top"
			disabled={false}
			defaultValue=""
			error={(value) => {
				if (value !== "") {
					return true;
				} else {
					return false;
				}
			}}
		/>
  );
}; /**${comma}*/

export default CheckErrorAsFunction;
