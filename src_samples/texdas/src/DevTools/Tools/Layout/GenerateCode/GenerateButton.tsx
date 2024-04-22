import {
	Icon, 
	IconButton,
} from "@midasit-dev/moaui";
import { useRecoilState } from 'recoil';
import { CanvasState, LayersState } from '../recoilState';
import { toStringFunctionalComponent } from './GenerateFunctions';
import onClickHandler from '../../Shared/OnClickHandler';
import { getCurrentTime } from '../../Shared/GetCurrentTime';
import { useSnackbar } from 'notistack';

const createFileName = (fileName: string) => {
	if (fileName === '') return getCurrentTime().fullWithExtension('tsx');
	if (fileName.includes('.tsx')) return fileName;
	return fileName + '.tsx';
}

const GenerateButton = (props: {
	fileName: string;
}) => {
	const {fileName} = props;

	const [canvas, ] = useRecoilState(CanvasState);
	const [layers,] = useRecoilState(LayersState);

	const { enqueueSnackbar } = useSnackbar();

	return (
		<IconButton
			color='negative'
			onClick={async () => {
				try {
					const codeString = toStringFunctionalComponent(canvas, layers);
					const data = await onClickHandler({
						path: '/exports/codes',
						body: {
							fileName: createFileName(fileName),
							content: codeString,
						},
						method: 'post',
					});

					if (data.message) {
						enqueueSnackbar(data.message, { variant: 'success' });
					}
				} catch (err) {
					console.error(err);
				} finally {}
			}}
		>
			<Icon iconName="FileDownload" />
		</IconButton>
	)
}

export default GenerateButton;
