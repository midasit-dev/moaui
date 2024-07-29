import { Button, Stack } from "@midasit-dev/moaui-components-v1";/**${comma}*/

const ComponentsButtonComposite = () => {
	const ButtonNormal = () => <Button>Normal</Button>;
	const ButtonNegative = () => {
		return (
			<Button color="negative">
				Negative (When it's click, Increase Count!)
			</Button>
		);
	}
	const ButtonContained = () => <Button variant="contained">Contained</Button>;
	const ButtonOutlined = () => <Button variant="outlined">Outlined</Button>;
	const ButtonText = () => <Button variant="text">Text</Button>;

	return (
		<Stack direction="column" spacing={5}>
			<ButtonNormal />
			<ButtonNegative />
			<ButtonContained />
			<ButtonOutlined />
			<ButtonText />
		</Stack>
	);
}/**${comma}*/

export default ComponentsButtonComposite;
