import Moaui from '@midasit-dev/moaui';
import { rowHeaderHeight } from './HeaderBodyStyles';

interface HeaderProps {
	height?: number | string;
	iconName?: string;
	title?: string;
	noSeparator?: boolean,
	showState?: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

const Header = (props: HeaderProps) => {
	const {
		height,
		iconName,
		title,
		noSeparator,
		showState,
	} = props;

	const [show, setShow] = showState || [true, () => {}];

	return (
		<Moaui.GuideBox 
			width="100%" 
			height={height || rowHeaderHeight}
			spacing={0.5} 
			verCenter 
		>
			<Moaui.GuideBox width="100%" row horSpaceBetween verCenter>
				<Moaui.GuideBox spacing={1} row>
					{iconName && <Moaui.Icon iconName={iconName} />}
					<Moaui.Typography variant='h1'>{title}</Moaui.Typography>
				</Moaui.GuideBox>
				{showState && show &&
					<Moaui.Icon 
						iconName='KeyboardArrowUp' 
						toButton 
						onClick={() => { if (setShow) setShow(prev => !prev)}}
					/>
				}
				{showState && !show &&
					<Moaui.Icon 
						iconName='KeyboardArrowDown' 
						toButton 
						onClick={() => { if (setShow) setShow(prev => !prev)}}
					/>
				}
			</Moaui.GuideBox>
			{!noSeparator && <Moaui.Separator />}
		</Moaui.GuideBox>
	)
}

export default Header;