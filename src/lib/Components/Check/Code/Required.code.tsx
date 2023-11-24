import { Check } from "@midasit-dev/moaui";

const App = () => {
	return (
		<Check 
			name="Required Check"
			disabled={false}
			required={true}
		/>
	);
}

export default App;