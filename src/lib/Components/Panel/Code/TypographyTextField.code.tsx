import React from 'react'; /**${comma}*/
import { Panel, Stack, Typography, TextField, } from "@midasit-dev/moaui"; /**${comma}*/

const ComponentsPanelTypographyTextField = ({ 
	typographyValue, 
	textFieldPlaceholder, 
	textFieldValue, 
	textFieldOnChange,
}: any) => {
  return (
    <Panel width={300} padding={8}>
      <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
        <Typography>{typographyValue}</Typography>
        <TextField 
					placeholder={textFieldPlaceholder} 
					value={textFieldValue}
					onChange={textFieldOnChange}
				/>
      </Stack>
    </Panel>
  );
}; /**${comma}*/

const DoComponentsPanelTypographyTextField = () => {
	//TextField value
	const [value, setValue] = React.useState('');

	return (
		<ComponentsPanelTypographyTextField 
			typographyValue="Title Text"
			textFieldPlaceholder="type here ..."
			textFieldValue={value}
			textFieldOnChange={(e: any) => setValue(e.target.value)}
		/>
	)
}; /**${comma}*/

export default DoComponentsPanelTypographyTextField;
