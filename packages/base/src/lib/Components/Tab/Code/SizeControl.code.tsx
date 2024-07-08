import { GuideBox, Tab } from "@midasit-dev/moaui";/**${comma}*/

const ComponentsTabSizeControl = () => {
	return (
		<GuideBox spacing={1}>
			<GuideBox show fill='1'>
				<Tab value={1} label="Small" fontSize="small" width={100} height={100}/>
			</GuideBox>
			<GuideBox show fill='2'>
				<Tab value={2} label="Medium" fontSize="medium" width={150} height={150} />
			</GuideBox>
			<GuideBox show fill='3'>
				<Tab value={3} label="Large" fontSize="large" width={200} height={200} />
			</GuideBox>
		</GuideBox>
	);
}/**${comma}*/

export default ComponentsTabSizeControl;
