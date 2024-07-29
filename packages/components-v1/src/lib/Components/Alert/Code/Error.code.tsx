import { GuideBox, Alert } from "@midasit-dev/moaui-components-v1";/**${comma}*/

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
