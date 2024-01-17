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
					min: 0,
					max: 15,
					step: 1,
					onlyInteger: true,
					condition: {
						min: "greater",
						max: "less"
					}
				}}
			/>
		</>
  );
}; /**${comma}*/

export default ComponentsTextFieldV2NumberOption;
