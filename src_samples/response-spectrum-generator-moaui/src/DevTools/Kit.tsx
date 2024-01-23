import React from 'react';
import {
	GuideBox,
	Panel,
	Icon,
	Scrollbars,
	Tooltip,
	IconButton,
} from '@midasit-dev/moaui';
import MidasController from '@midasit-dev/moaui/Components/MidasController';
import HomeManifestHeadLine from './Home/Manifest/HeadLine';
import HomeManifestTitleUpdator from './Home/Manifest/TitleUpdator';
import HomeManifestContainerSizeUpdator from './Home/Manifest/ContainerSizeUpdator';
import HomeManifestContainerBackgroundUpdator from './Home/Manifest/ContainerBackgroundUpdator';
import HomeBuilder from './Home/Builder';
import HomeUpgrade from './Home/Upgrade';

interface KitProps {
	children: React.ReactNode;
	bgColorState: [string, React.Dispatch<React.SetStateAction<string>>];
}

const selectColor = '#e8e8e8';
const unSelectColor = 'transparent';

const Kit = (props: KitProps) => {
	const { 
		children,
		bgColorState,
	} = props;

	//Title
	const [title, setTitle] = React.useState('');
  React.useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/manifest.json`)
      .then(response => response.json())
      .then(data => data.name ? setTitle(data.name) : null)
      .catch(error => console.error('Error fetching manifest.json:', error));
  }, []);

	//Container Size
	const [containerSize, setContainerSize] = React.useState({ width: 0, height: 0 });

	//Background Color
	const [bgColor, setBgColor] = bgColorState;

	//Menu Select
	const [currentMenu, setCurrentMenu] = React.useState('Home');

	return (
		<GuideBox show row width="100%" height='100vh' fill={"#e9ebef"}>
			<GuideBox width="auto" height='inherit'>
				<GuideBox show row height="inherit" spacing={3} fill='white'>

					<GuideBox height='inherit' paddingY={5} paddingX={3} spacing={2}>
						<GuideBox show width="100%" fill={currentMenu === 'Home' ? selectColor : unSelectColor} borderRadius={1}>
							<Tooltip title="Home" placement='right'>
								<IconButton 
									transparent
									onClick={() => setCurrentMenu('Home')}
									color='negative'
								>
									<Icon iconName='Home'  />
								</IconButton>
							</Tooltip>
						</GuideBox>
						<GuideBox show fill={currentMenu === 'GuideBox' ? selectColor : unSelectColor} borderRadius={1}>
							<Tooltip title="GuideBox" placement='right'>
								<IconButton 
									transparent
									onClick={() => setCurrentMenu('GuideBox')}
									color='negative'
								>
									<Icon iconName='GridOn'  />
								</IconButton>
							</Tooltip>
						</GuideBox>
					</GuideBox>

					<GuideBox width={350} height='inherit'>

						<Scrollbars
							panelProps={{
								variant: 'box',
								padding: 0,
							}}
							width='100%'
							height='100vh'
						>
							<GuideBox width='100%' spacing={5} paddingTop={5} paddingRight={6}>
								<GuideBox width="100%" spacing={1}>
									<HomeManifestHeadLine 
										title={title}
										containerSize={containerSize}
										bgColor={bgColor}
									/>
									<HomeManifestTitleUpdator titleState={[title, setTitle]} />
									<HomeManifestContainerSizeUpdator containerSizeState={[containerSize, setContainerSize]} />
									<HomeManifestContainerBackgroundUpdator containerBackgroundColorState={[bgColor, setBgColor]} />
								</GuideBox>

								<GuideBox width="100%" spacing={3}>
									<HomeBuilder />
									<HomeUpgrade />
								</GuideBox>
							</GuideBox>
						</Scrollbars>

					</GuideBox>

				</GuideBox>
			</GuideBox>
			<GuideBox flexGrow={1} center height="100vh">
				<div id='container'>
					<Panel variant="shadow2" padding={0} borderRadius='4px'>
						<GuideBox width="auto">
							<MidasController 
								icoSrc={`${process.env.PUBLIC_URL}/favicon.ico`}
								title={title} 
							/>
							{children}
						</GuideBox>
					</Panel>
				</div>
			</GuideBox>
		</GuideBox>
	)
}

export default Kit;