import {
	Icon,
	IconButton,
	Tooltip,
	GuideBox,
} from '@midasit-dev/moaui';

const SideBarButton = (
	props: { 
		currentMenuState: [string, React.Dispatch<React.SetStateAction<string | any>>],
		iconName: string,
		menuName: string,
		placement?: 'bottom' | 'top' | 'left' | 'right',
	}
) => {
	const { currentMenuState, iconName, menuName, placement } = props;
	const [currentMenu, setCurrentMenu] = currentMenuState;

	const optionalProps = {
		fill: '#fff',
		borderRadius: 1,
		show: currentMenu === menuName,
		border: currentMenu === menuName ? '1px solid #d1d1d1' : '1px solid transparent',
		opacity: currentMenu === menuName ? 1 : 0.5,
	}
	
	return (
		<GuideBox {...optionalProps}>
			<Tooltip title={menuName} placement={placement || 'bottom'}>
				<IconButton
					transparent
					onClick={() => setCurrentMenu(menuName)}
					color='negative'
				>
					<Icon iconName={iconName} />
				</IconButton>
			</Tooltip>
		</GuideBox>
	)
}

export default SideBarButton;