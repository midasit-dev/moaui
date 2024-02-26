import { GuideBox } from "@midasit-dev/moaui";/**${comma}*/

const ComponentsGuideBoxOnKeyDown = () => {
	return (
		<GuideBox 
			show
			width={100} 
			height={100} 
			onKeyDown={(e) => {
				if (e.ctrlKey && e.key === '[') {
					console.log('ctrl + [');
				}
			}}
		/>
	);		
}/**${comma}*/

export default ComponentsGuideBoxOnKeyDown;