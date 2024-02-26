import { Button, Stack } from '@midasit-dev/moaui';
import { useSnackbar } from 'notistack';

const Component = () => {
	return (
		<Stack direction="row" spacing={2} justifyContent='center'>
			<SnackComponentSuccess />
			<SnackComponentError />
		</Stack>
	)
}

export default Component;

const SnackComponentSuccess = () => {
	// useSnackbar is a hook of notistack
	const { enqueueSnackbar } = useSnackbar();

	return (
		<Button
			onClick={() => {
				// enqueueSnackbar is a function of notistack
				// enqueueSnackbar(message, options)
				// message: string
				// variant: 'default' | 'error' | 'success' | 'warning' | 'info'
				enqueueSnackbar('Success Message!', { variant: 'success' });
			}}
		>
			Snackbar Success
		</Button>
	)
}

const SnackComponentError = () => {
	const { enqueueSnackbar } = useSnackbar();
	return (
		<Button
			color="negative"
			onClick={() => {
				enqueueSnackbar('Error Message!', { variant: 'error' });
			}}
		>
			Snackbar Error
		</Button>
	)
}