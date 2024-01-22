import { TextFieldV2 } from "@midasit-dev/moaui"; /**${comma}*/

const ComponentsTextFieldV2NumberOption = () => {
	return (
		<>
			<TextFieldV2 
				width="150px"
				placeholder="placeholder"
				title=""
				titlePosition="left"
				disabled={false}
				defaultValue="0"
				error={false}
				type="number"
				numberOptions={{
					max: -1,
					onlyInteger: true,
				}}
			/>
		</>
  );
}; /**${comma}*/

export default ComponentsTextFieldV2NumberOption;
