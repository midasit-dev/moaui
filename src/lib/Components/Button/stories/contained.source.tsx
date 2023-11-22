import { Button } from "@midasit-dev/moaui";

const App = (args: any) => {
	return (
		<>
			<Button {...args}>
				test123
			</Button>
			<Button {...args}>
				test456
			</Button>
		</>
	)
}

export default App;