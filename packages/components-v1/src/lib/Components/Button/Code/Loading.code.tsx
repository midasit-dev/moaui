import { Button, GuideBox } from "@midasit-dev/moaui-components-v1";/**${comma}*/

const ComponentsButtonLoading = () => {
	return (
		<GuideBox spacing={2}>
			<Button
				variant="contained"
				color="normal"
				width="130px"
				loading
			>
				Normal
			</Button>
			<Button
			variant="contained"
			color="negative"
			width="130px"
			loading
		>
			Negative
		</Button>
	</GuideBox>
	)
}/**${comma}*/

export default ComponentsButtonLoading;