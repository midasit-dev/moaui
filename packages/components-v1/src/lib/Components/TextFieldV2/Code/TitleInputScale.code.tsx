import { TextFieldV2 } from "@midasit-dev/moaui-components-v1"; /**${comma}*/

const ComponentsTextFieldV2TitleInputScale = () => {
	return (
		<>
			<TextFieldV2 
				titleXs={4}
				inputXs={8}
				width="150px"
				placeholder="placeholder"
				title="title"
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

export default ComponentsTextFieldV2TitleInputScale;
