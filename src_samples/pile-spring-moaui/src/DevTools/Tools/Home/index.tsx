import {
	GuideBox,
} from '@midasit-dev/moaui';

import ManifestHeadLine from './Manifest/HeadLine';
import HomeManifestTitleUpdator from './Manifest/TitleUpdator';
import HomeManifestContainerSizeUpdator from './Manifest/ContainerSizeUpdator';
import HomeManifestContainerBackgroundUpdator from './Manifest/ContainerBackgroundUpdator';

import HomeBuilder from './Builder';
import HomeUpgrade from './Upgrade';
import HomePyscriptActivation from './PyscriptActivation';

interface HomeProps {
	titleState: [string, React.Dispatch<React.SetStateAction<string>>];
	containerSizeState: [{ width: number, height: number }, React.Dispatch<React.SetStateAction<{ width: number; height: number; }>>];
	bgColorState: [string, React.Dispatch<React.SetStateAction<string>>];
}

const Home = (props: HomeProps) => {
	const [title, setTitle] = props.titleState;
	const [containerSize, setContainerSize] = props.containerSizeState;
	const [bgColor, setBgColor] = props.bgColorState;

	return (
		<GuideBox width='100%' spacing={5}>
			<GuideBox width="100%" spacing={1}>
				<ManifestHeadLine
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
				<HomePyscriptActivation />
			</GuideBox>
		</GuideBox>
	)
}

export default Home;