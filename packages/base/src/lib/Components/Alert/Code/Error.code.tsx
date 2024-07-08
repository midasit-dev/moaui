import { GuideBox, Alert } from "@midasit-dev/moaui";/**${comma}*/

const ComponentsAlertError = () => {

	return (
		<GuideBox width={400}>
			<Alert 
				variant="outlined"
				severity="error"
				title="Error Title"
			>
				This Error Content
			</Alert>
		</GuideBox>
	);
}/**${comma}*/

export default ComponentsAlertError;
