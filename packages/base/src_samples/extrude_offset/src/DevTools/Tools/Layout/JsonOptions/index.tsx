import Load from './Load';
import View from './View';
import Save from './Save';
import { 
	GuideBox, 
	Separator,
	Typography,
} from '@midasit-dev/moaui';

const App = () => {
	return (
		<GuideBox show row verCenter spacing={2} fill='#fff' paddingY={1} paddingX={2} borderRadius={1} border='1px solid #d1d1d1'>
			<Typography variant='h1'>JSON</Typography>
			<GuideBox>
				<GuideBox row verCenter spacing={1}>
					<Save />
					<Load />
				</GuideBox>
			</GuideBox>
			<Separator direction='vertical' />
			<GuideBox>
				<View />
			</GuideBox>
		</GuideBox>
	)
}

export default App;