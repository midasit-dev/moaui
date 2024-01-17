import { TextFieldV2 } from "@midasit-dev/moaui"; /**${comma}*/

const ComponentsTextFieldBasic = () => {
	console.log('tset')

  return (
		<TextFieldV2 
			width="100px"
			placeholder="placeholder"
			title=""
			titlePosition="left"
			disabled={false}
			defaultValue=""
			error={false}
		/>
  );
}; /**${comma}*/

export default ComponentsTextFieldBasic;
