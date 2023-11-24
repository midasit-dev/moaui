import { useState } from 'react';
import { Button, Typography, Stack } from "@midasit-dev/moaui";

const App = () => {
	const [value, setValue] = useState(0);

	return (
		<Stack direction="column" spacing={5}>
			<Typography variant="h1">
				{value.toString()}
			</Typography>
			<ButtonNormal />
			<ButtonNegative 
				onClickEvent={() => setValue(value + 1)}
			/>
			<ButtonContained />
			<ButtonOutlined />
			<ButtonText />
		</Stack>
	);
}

export default App;

const ButtonNormal = () => <Button>Normal</Button>;
const ButtonNegative = (props: any) => {
	return (
		<Button 
			color="negative"
			onClick={props.onClickEvent}
		>
			Negative (When it's click, Increase Count!)
		</Button>
	);
}
const ButtonContained = () => <Button variant="contained">Contained</Button>;
const ButtonOutlined = () => <Button variant="outlined">Outlined</Button>;
const ButtonText = () => <Button variant="text">Text</Button>;
