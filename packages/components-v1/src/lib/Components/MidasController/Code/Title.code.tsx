import { GuideBox, MidasController } from "@midasit-dev/moaui-components-v1";/**${comma}*/

const ComponentsMidasControllerTitle = () => {
	return (
		<GuideBox spacing={2}>
			<MidasController
				title="default ico"
			/>
			<MidasController 
				icoSrc="./error.ico"
				title="Invalid icon path"
			/>
			<MidasController 
				icoSrc="https://raw.githubusercontent.com/midasit-dev/moaui-fixed-repo/main/svg/logo_circle_15p.svg"
				title="Url icon path"
			/>
		</GuideBox>
	);
}/**${comma}*/

export default ComponentsMidasControllerTitle;
