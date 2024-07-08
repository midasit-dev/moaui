import { GuideBox, IconButton, Icon, Tooltip } from "@midasit-dev/moaui";/**${comma}*/

const ComponentsTooltipRight = () => {

	return (
    <GuideBox spacing={2}>
			<Tooltip 
				title={<img src="https://raw.githubusercontent.com/midasit-dev/moaui-fixed-repo/main/svg/logo_circle.svg" alt="Logo" />}
				placement="right"
			>
				<IconButton transparent>
					<Icon iconName="PlayArrow" />
				</IconButton>
			</Tooltip>
    </GuideBox>
  );
}/**${comma}*/

export default ComponentsTooltipRight;
