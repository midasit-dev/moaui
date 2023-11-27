import { Check } from "@midasit-dev/moaui";/**${comma}*/

const CompCheckRequired = () => {
	return (
		<Check 
			name="Required Check"
			disabled={false}
			required={true}
		/>
	);
}/**${comma}*/

export default CompCheckRequired;