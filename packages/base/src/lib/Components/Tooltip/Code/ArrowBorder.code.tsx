import { GuideBox, IconButton, Icon, Tooltip } from "@midasit-dev/moaui";/**${comma}*/

const ComponentsTooltipArrowBorder = () => {

	return (
    <GuideBox spacing={2}>
			<Tooltip 
				title={<img src="https://raw.githubusercontent.com/midasit-dev/moaui-fixed-repo/main/svg/logo_circle.svg" alt="Logo" />}
				placement="right"
				arrowBorder={true}
			>
				<IconButton transparent>
					<Icon iconName="PlayArrow" />
				</IconButton>
			</Tooltip>
    </GuideBox>
  );
}/**${comma}*/

export default ComponentsTooltipArrowBorder;
