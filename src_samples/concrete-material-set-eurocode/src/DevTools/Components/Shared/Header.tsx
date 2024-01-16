import Moaui from '@midasit-dev/moaui';

interface HeaderProps {
	iconName: string;
	title: string;
	showState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

const Header = (props: HeaderProps) => {
	const {
		iconName,
		title,
		showState: [show, setShow]
	} = props;

	return (
		<Moaui.GuideBox width="100%" spacing={0.5} verCenter>
			<Moaui.GuideBox width="100%" row horSpaceBetween verCenter>
				<Moaui.GuideBox spacing={1} row>
					<Moaui.Icon iconName={iconName} />
					<Moaui.Typography variant='h1'>{title}</Moaui.Typography>
				</Moaui.GuideBox>
				{show &&
					<Moaui.Icon 
						iconName='Visibility' 
						toButton 
						onClick={() => { if (setShow) setShow(prev => !prev)}}
					/>
				}
				{!show &&
					<Moaui.Icon 
						iconName='VisibilityOff' 
						toButton 
						onClick={() => { if (setShow) setShow(prev => !prev)}}
					/>
				}
			</Moaui.GuideBox>
			<Moaui.Separator />
		</Moaui.GuideBox>
	)
}

export default Header;