import React from 'react'; /**${comma}*/
import { Panel, Stack, Typography, TextField, } from "@midasit-dev/moaui"; /**${comma}*/

const ComponentsPanelTypographyTextField = ({ 
	title = "Title Text", 
	placeholder = "type here ...",
}: any) => {
	const [value, setValue] = React.useState('');
  return (
    <Panel width={300} padding={8}>
      <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
        <Typography>{title}</Typography>
        <TextField 
					placeholder={placeholder} 
					value={value}
					onChange={(e: any) => setValue(e.target.value)}
				/>
      </Stack>
    </Panel>
  );
}; /**${comma}*/

export default ComponentsPanelTypographyTextField;
