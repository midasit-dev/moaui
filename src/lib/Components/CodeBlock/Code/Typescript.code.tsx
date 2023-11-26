import { CheckGroup, Check } from "@midasit-dev/moaui";

const App = () => {
	return (
		<CheckGroup text={"Group Check"}>
			<Check name='Check 1' />
			<Check name='Check 2' />
			<Check name='Check 3' />
			<Check name='Check 4' />
			<Check name='Check 5' />
		</CheckGroup>
	);
}

export default App;